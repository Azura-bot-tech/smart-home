import mongoose from 'mongoose';

// Schema cho Users
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

// Schema cho Admins
const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' }
});

// Schema cho Sensor Data
const sensorDataSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  feed_id: { type: String, required: true },
  feed_key: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  created_epoch: { type: Number, required: true },
  expiration: { type: Date, required: true }
});

// Schema cho Log Messages
const logMessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

// Models
export const User = mongoose.models.User || mongoose.model('User', userSchema);
export const Admin =
  mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const LogMessage =
  mongoose.models.LogMessage || mongoose.model('LogMessage', logMessageSchema);

// Sensor Models
export const AmDat =
  mongoose.models.AmDat || mongoose.model('AmDat', sensorDataSchema);
export const AnhSang =
  mongoose.models.AnhSang || mongoose.model('AnhSang', sensorDataSchema);
export const DoAm =
  mongoose.models.DoAm || mongoose.model('DoAm', sensorDataSchema);
export const NhietDo =
  mongoose.models.NhietDo || mongoose.model('NhietDo', sensorDataSchema);
export const Led =
  mongoose.models.Led || mongoose.model('Led', sensorDataSchema);
export const ModeLed =
  mongoose.models.ModeLed || mongoose.model('ModeLed', sensorDataSchema);
export const Pump =
  mongoose.models.Pump || mongoose.model('Pump', sensorDataSchema);
export const ModePump =
  mongoose.models.ModePump || mongoose.model('ModePump', sensorDataSchema);
