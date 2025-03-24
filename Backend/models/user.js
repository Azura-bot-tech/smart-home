const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const uri =
  "mongodb+srv://hunghs25202:hunghs25202@smarthome.deu0y.mongodb.net/?retryWrites=true&w=majority&appName=SmartHome";
const client = new MongoClient(uri);
const dbName = "user_data";

// Hàm đăng ký người dùng mới
async function registerUser(username, password, email) {
  try {
    await client.connect();
    const database = client.db(dbName);
    const users = database.collection("users");

    // Kiểm tra xem username đã tồn tại chưa
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return { success: false, message: "Username đã tồn tại" };
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = {
      username,
      password: hashedPassword,
      email,
      createdAt: new Date(),
    };

    // Lưu vào database
    await users.insertOne(newUser);

    return { success: true, message: "Đăng ký thành công" };
  } catch (error) {
    console.error("Error registering user:", error);
    return { success: false, message: "Lỗi đăng ký" };
  } finally {
    await client.close();
  }
}

// Hàm đăng nhập
async function loginUser(username, password) {
  try {
    await client.connect();
    const database = client.db(dbName);
    const users = database.collection("users");

    // Tìm user theo username
    const user = await users.findOne({ username });
    if (!user) {
      return { success: false, message: "Username không tồn tại" };
    }

    // Kiểm tra mật khẩu
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return { success: false, message: "Mật khẩu không đúng" };
    }

    return {
      success: true,
      message: "Đăng nhập thành công",
      user: {
        username: user.username,
        email: user.email,
      },
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Lỗi đăng nhập" };
  } finally {
    await client.close();
  }
}

module.exports = {
  registerUser,
  loginUser,
};
