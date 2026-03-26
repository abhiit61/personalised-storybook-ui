import { environment } from '../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  storybook: {
    generatePdf: '/api/storybook/generate'
  }
} as const;
