import requests
import pymongo
import time

# Thông tin Adafruit IO
ADAFRUIT_IO_USERNAME = "KhaTran"
ADAFRUIT_IO_KEY = "aio_edTe77l0wS0VVzgo6Pdqk1QFwRd9"
ADAFRUIT_FEEDS_URL = f"https://io.adafruit.com/api/v2/KhaTran/feeds"

# Kết nối MongoDB
MONGO_URI = "mongodb+srv://hunghs25202:hunghs25202@smarthome.deu0y.mongodb.net/?retryWrites=true&w=majority&appName=SmartHome"
client = pymongo.MongoClient(MONGO_URI)
db = client["sensor_data"]

# Mapping giữa feed key và collection
FEED_TO_COLLECTION = {
    "am-dat": "am_dat",
    "anh-sang": "anh_sang",
    "do-am": "do_am",
    "led": "led",
    "modeled": "mode_led",
    "may-bom": "pump",
    "modepump": "mode_pump",
    "nhiet-do": "nhiet_do"
}

# Headers API Adafruit IO
headers = {
    "X-AIO-Key": ADAFRUIT_IO_KEY,
    "Content-Type": "application/json"
}

def fetch_all_feeds():
    """Lấy danh sách tất cả các feed từ Adafruit IO"""
    response = requests.get(ADAFRUIT_FEEDS_URL, headers=headers)
    if response.status_code == 200:
        return response.json()  # Trả về danh sách feed
    else:
        print("Lỗi khi lấy danh sách feed:", response.text)
        return []

def fetch_feed_data(feed_key):
    """Lấy dữ liệu mới nhất từ một feed cụ thể"""
    url = f"https://io.adafruit.com/api/v2/{ADAFRUIT_IO_USERNAME}/feeds/{feed_key}/data"
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()  # Trả về dữ liệu của feed
    else:
        print(f"Lỗi khi lấy dữ liệu từ feed {feed_key}:", response.text)
        return []

def save_to_mongodb(feed_key, data):
    """Lưu dữ liệu vào MongoDB collection tương ứng"""
    collection_name = FEED_TO_COLLECTION.get(feed_key)
    if not collection_name:
        print(f"Không tìm thấy collection tương ứng cho feed {feed_key}")
        return
        
    collection = db[collection_name]
    for entry in data:
        entry["_id"] = entry["id"]
        entry["feed_key"] = feed_key
        try:
            collection.insert_one(entry)
            print(f"Lưu dữ liệu từ {feed_key} vào collection {collection_name}: {entry['value']} - {entry['created_at']}")
        except pymongo.errors.DuplicateKeyError:
            pass

def print_all_feeds():
    feeds = fetch_all_feeds()
    print("\nDanh sách các feed trên Adafruit IO:")
    for feed in feeds:
        print(f"Tên: {feed['name']}, Key: {feed['key']}")
    print()

def main():
    print_all_feeds()
    while True:
        for feed_key in FEED_TO_COLLECTION.keys():
            data = fetch_feed_data(feed_key)
            if data:
                save_to_mongodb(feed_key, data)
        time.sleep(10)

if __name__ == "__main__":
    main()
