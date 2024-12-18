import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios;
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url);
      return data;
    } catch (error) {
      throw new Error('this is an error-check logs');
    }
  }

  async post<T>(
    url: string,
    payload: any,
    header = { 'Content-Type': 'application/json' },
  ): Promise<T | { status: boolean }> {
    try {
      const { data } = await this.axios.post<T>(url, payload, {
        headers: header,
      });
      console.log(data, 'data');
      return data;
    } catch (error: any) {
      console.log(url, payload, 'url');
      console.log('ocurrio-error');
      console.log(error.message, 'error-message');
      if (error.response) {
        console.log(error.response.data, 'error-data');
      }
      return {
        status: false,
      };
    }
  }
}
