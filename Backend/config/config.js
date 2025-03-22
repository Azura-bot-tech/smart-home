const config = {
  mongoURI:
    "mongodb+srv://hunghs25202:hunghs25202@smarthome.deu0y.mongodb.net/?retryWrites=true&w=majority&appName=SmartHome",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
};

module.exports = config;
