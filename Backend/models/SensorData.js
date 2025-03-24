const { MongoClient } = require("mongodb");

// Kết nối MongoDB Atlas
const uri =
  "mongodb+srv://hunghs25202:hunghs25202@smarthome.deu0y.mongodb.net/?retryWrites=true&w=majority&appName=SmartHome";
const client = new MongoClient(uri);
const dbName = "sensor_data";

// Thêm biến để theo dõi trạng thái kết nối
let clientConnection = null;

// Hàm để đảm bảo kết nối
async function ensureConnection() {
  if (!clientConnection) {
    await client.connect();
    clientConnection = client;
  }
  return clientConnection;
}

// Hàm lấy bản ghi mới nhất từ một collection
async function getLatestData(collectionName) {
  try {
    await ensureConnection();
    const database = client.db(dbName);
    const collection = database.collection(collectionName);
    const latestRecord = await collection.findOne(
      {},
      { sort: { timestamp: -1 } }
    );
    return latestRecord;
  } catch (error) {
    console.error(`Error getting latest data from ${collectionName}:`, error);
    return null;
  }
}

// Hàm lấy dữ liệu mới nhất từ tất cả các sensors
async function getAllLatestData() {
  try {
    await ensureConnection();

    const latestData = {
      do_am: await getLatestData("do_am"),
      nhiet_do: await getLatestData("nhiet_do"),
      anh_sang: await getLatestData("anh_sang"),
      am_dat: await getLatestData("am_dat"),
    };

    return latestData;
  } catch (error) {
    console.error("Error getting all latest data:", error);
    return null;
  }
}

// Hàm lấy dữ liệu từ tất cả các sensors
async function getAllData() {
  try {
    await ensureConnection();
    const database = client.db(dbName);

    // Lấy dữ liệu từ các collection riêng biệt
    const doAm = await database.collection("do_am").find({}).toArray();
    const nhietDo = await database.collection("nhiet_do").find({}).toArray();
    const anhSang = await database.collection("anh_sang").find({}).toArray();
    const amDat = await database.collection("am_dat").find({}).toArray();

    return {
      do_am: doAm,
      nhiet_do: nhietDo,
      anh_sang: anhSang,
      am_dat: amDat,
    };
  } catch (error) {
    console.error("Error getting all data:", error);
    return null;
  }
}

module.exports = {
  getLatestData,
  getAllLatestData,
  getAllData,
};
