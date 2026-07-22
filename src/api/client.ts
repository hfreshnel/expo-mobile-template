import axios from 'axios';
import { env } from '@/constants/env';

export const apiClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 15000,
});

// If your app has auth, add a request interceptor here that attaches the
// token from your auth store, plus a response interceptor that refreshes it
// on 401 — queue concurrent requests while a refresh is in flight (a simple
// array of resolve/reject callbacks flushed once the refresh settles) so a
// burst of 401s doesn't trigger a refresh storm.
