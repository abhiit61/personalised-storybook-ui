import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL, API_ENDPOINTS } from '../api-endpoints.config';

interface StorybookPayload {
  name: string;
  gender: string;
  age: number;
  bodyTone?: string;
  location: string;
  theme: string;
  event: string;
  mood: string;
  character: string;
  moral: string;
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorybookService {
  private readonly generatePdfApiUrl = this.buildApiUrl(API_ENDPOINTS.storybook.generatePdf);

  constructor(private readonly http: HttpClient) {}

  private buildApiUrl(endpoint: string): string {
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    const endpointPath = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${baseUrl}${endpointPath}`;
  }

  generateStorybookPdf(payload: StorybookPayload): Observable<Blob> {
    return this.http.post(this.generatePdfApiUrl, payload, { responseType: 'blob' });
  }
}