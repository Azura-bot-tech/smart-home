const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Auth APIs
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    profile: `${API_BASE_URL}/auth/profile`
  },

  // Sensor Data APIs
  sensors: {
    amDat: `${API_BASE_URL}/sensors/am-dat`,
    anhSang: `${API_BASE_URL}/sensors/anh-sang`,
    doAm: `${API_BASE_URL}/sensors/do-am`,
    nhietDo: `${API_BASE_URL}/sensors/nhiet-do`,
    led: `${API_BASE_URL}/sensors/led`,
    modeLed: `${API_BASE_URL}/sensors/mode-led`,
    pump: `${API_BASE_URL}/sensors/pump`,
    modePump: `${API_BASE_URL}/sensors/mode-pump`
  },

  // Log Message APIs
  logs: {
    list: `${API_BASE_URL}/logs`,
    create: `${API_BASE_URL}/logs`
  }
};
