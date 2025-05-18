"use client";

import axios, { AxiosError, AxiosResponse } from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

instance.interceptors.request.use(async (config) => {
  if (!hasCookie("XSRF-TOKEN")) {
    // If CSRF token is not found, get it from the server
    await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/sanctum/csrf-cookie`, {
      withCredentials: true,
      withXSRFToken: true,
    });
  }

  return config;
});

function hasCookie(name: string): boolean {
  // look for “name=” at the start or right after a “; ”
  return new RegExp(`(?:^|; )${name}=`).test(document.cookie);
}

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const url = error.config.url;

    if (url.includes("/api/") && error.response?.status === 401) {
      // Handle 401 Unauthorized error
      const currentPath = window.location.pathname;

      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
    }
  }
);

export default instance;
