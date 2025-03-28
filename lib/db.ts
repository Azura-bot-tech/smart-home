import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose:
    | { conn: null | typeof mongoose; promise: null | Promise<typeof mongoose> }
    | undefined;
}

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb+srv://hunghs25202:hunghs25202@smarthome.deu0y.mongodb.net/smart_home?retryWrites=true&w=majority';

let cached = global.mongoose as MongooseCache;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log('Connected to MongoDB');
    return cached.conn;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
}

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error disconnecting from MongoDB:', error);
    throw error;
  }
};

export const db = mongoose.connection;
