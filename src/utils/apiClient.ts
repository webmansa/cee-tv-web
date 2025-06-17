import tmdb from "src/config/tmdb/exports";
import { HttpError } from "src/helpers/HttpErrors";

const BASE_URL = tmdb.baseUrl

interface RequestConfig extends RequestInit {}

async function apiClient<T = any, B = any>(
  endpoint: string,
  method = "GET",
  body?: B | null,
  customHeaders: HeadersInit = {},
  customConfig: Partial<RequestConfig> = {}
): Promise<T> {
    const url = `${BASE_URL}${endpoint}`;
    
    // const url = new URL(`${BASE_URL}${endpoint}`);
    // Object.keys(queryParams).forEach((key) =>
    //   url.searchParams.append(key, queryParams[key])
    // );
    // url.toString()

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${tmdb.userToken}`,
    ...customHeaders,
  };

  const config: RequestConfig = {
    method,
    headers,
    ...customConfig
  };

  if (body && (method === "POST" || method === "PUT" || method === "PATCH")) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      let errorData: any = { message: response.statusText };

      throw new HttpError(
        `HTTP error! Status: ${response.status}`,
        response.status,
        errorData
      );
    }

    if (
      response.status === 204 ||
      response.headers.get("content-length") === "0"
    ) {
      return null as T;
    }

    if (response.status === 401) {

      return null as T;
    }

    if (!response.ok || response.status === 412) {
      return null as T;
    }

    const data: T = await response.json();
    return data;
  } catch (error) {
    console.error("API Client Error:", error);
    if (error instanceof HttpError) {
      // It's an HTTP error we threw, re-throw it
      throw error;
    } else {
      // Likely a network error or CORS issue
      if (error instanceof Error) {
        throw new Error(`Network error: ${error.message}`);
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  }
}

export const get = <T = any>(
  endpoint: string,
  headers?: HeadersInit,
  config?: Partial<RequestConfig>
) => apiClient<T>(endpoint, "GET", null, headers, config);

export const post = <T = any, B = any>(
  endpoint: string,
  body: B,
  headers?: HeadersInit,
  config?: Partial<RequestConfig>
) => apiClient<T, B>(endpoint, "POST", body, headers, config);

export default apiClient;
