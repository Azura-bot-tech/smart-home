const axios = require("axios");
const { MongoClient } = require("mongodb");
require("dotenv").config();

// Cấu hình Adafruit IO
const ADAFRUIT_IO_USERNAME = process.env.ADAFRUIT_IO_USERNAME;
const ADAFRUIT_IO_KEY = process.env.ADAFRUIT_IO_KEY;
const ADAFRUIT_FEEDS_URL = process.env.ADAFRUIT_FEEDS_URL;

// Cấu hình MongoDB
const MONGO_URI = process.env.MONGODB_URI;
const MONGODB_SENSOR_DB_NAME = process.env.MONGODB_SENSOR_DB_NAME;

// Mapping giữa feed và collection
const FEED_TO_COLLECTION = {
  "am-dat": "am_dat",
  "anh-sang": "anh_sang",
  "do-am": "do_am",
  led: "led",
  modeled: "mode_led",
  "may-bom": "pump",
  modepump: "mode_pump",
  "nhiet-do": "nhiet_do",
};

// Headers API
const headers = {
  "X-AIO-Key": ADAFRUIT_IO_KEY,
  "Content-Type": "application/json",
};

class AdafruitService {
  constructor() {
    this.client = new MongoClient(MONGO_URI);
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(MONGODB_SENSOR_DB_NAME);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }

  async fetchAllFeeds() {
    try {
      const response = await axios.get(ADAFRUIT_FEEDS_URL, { headers });
      return response.data;
    } catch (error) {
      console.error("Error fetching feeds:", error.message);
      return [];
    }
  }

  async fetchFeedData(feedKey) {
    try {
      const url = `https://io.adafruit.com/api/v2/${ADAFRUIT_IO_USERNAME}/feeds/${feedKey}/data`;
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from feed ${feedKey}:`, error.message);
      return [];
    }
  }

  async saveToMongoDB(feedKey, data) {
    const collectionName = FEED_TO_COLLECTION[feedKey];
    if (!collectionName) {
      console.error(`No collection found for feed ${feedKey}`);
      return;
    }

    const collection = this.db.collection(collectionName);

    for (const entry of data) {
      const document = {
        _id: entry.id,
        feed_key: feedKey,
        ...entry,
      };

      try {
        await collection.insertOne(document);
        console.log(
          `Saved data from ${feedKey} to collection ${collectionName}: ${entry.value} - ${entry.created_at}`
        );
      } catch (error) {
        if (error.code !== 11000) {
          // Bỏ qua lỗi trùng khóa
          console.error(`Error saving data to MongoDB:`, error);
        }
      }
    }
  }

  async printAllFeeds() {
    const feeds = await this.fetchAllFeeds();
    console.log("\nDanh sách các feed trên Adafruit IO:");
    feeds.forEach((feed) => {
      console.log(`Tên: ${feed.name}, Key: ${feed.key}`);
    });
    console.log();
  }

  async startDataCollection(interval = process.env.DATA_COLLECTION_INTERVAL) {
    await this.connect();

    try {
      await this.printAllFeeds();

      setInterval(async () => {
        for (const feedKey of Object.keys(FEED_TO_COLLECTION)) {
          const data = await this.fetchFeedData(feedKey);
          if (data.length > 0) {
            await this.saveToMongoDB(feedKey, data);
          }
        }
      }, interval);
    } catch (error) {
      console.error("Error in data collection:", error);
      await this.disconnect();
    }
  }
}

module.exports = new AdafruitService();
