
import axios from 'axios'

export const api = axios.create({
  baseURL: 'your-api-base-url', 
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  }
})
