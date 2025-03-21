'use client';

import { api } from '../api';

class ApiService {
  private static instance: ApiService;
  private token: string | null = null;

  private constructor() {
    // Lấy token từ localStorage khi khởi tạo
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  public setToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Auth APIs
  async login(username: string, password: string) {
    const response = await fetch(api.auth.login, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ username, password })
    });
    return response.json();
  }

  async register(userData: {
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
  }) {
    const response = await fetch(api.auth.register, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(userData)
    });
    return response.json();
  }

  async logout() {
    const response = await fetch(api.auth.logout, {
      method: 'POST',
      headers: this.getHeaders()
    });
    this.removeToken();
    return response.json();
  }

  // Sensor Data APIs
  async getAmDat() {
    const response = await fetch(api.sensors.amDat, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getAnhSang() {
    const response = await fetch(api.sensors.anhSang, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getDoAm() {
    const response = await fetch(api.sensors.doAm, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getNhietDo() {
    const response = await fetch(api.sensors.nhietDo, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getLed() {
    const response = await fetch(api.sensors.led, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getModeLed() {
    const response = await fetch(api.sensors.modeLed, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getPump() {
    const response = await fetch(api.sensors.pump, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async getModePump() {
    const response = await fetch(api.sensors.modePump, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  // Log Message APIs
  async getLogs() {
    const response = await fetch(api.logs.list, {
      headers: this.getHeaders()
    });
    return response.json();
  }

  async createLog(message: string) {
    const response = await fetch(api.logs.create, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({ message })
    });
    return response.json();
  }
}

export const apiService = ApiService.getInstance();
