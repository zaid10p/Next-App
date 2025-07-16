import { cookies } from "next/headers";

/**
 * Auth Token Service for Server Components
 * Handles token storage in cookies and automatic attachment to API requests
 */

const TOKEN_KEY = "auth_token";

export const authTokenService = {
  /**
   * Get the authentication token from cookies
   */
  async getToken() {
    const cookieStore = await cookies();
    const tokenCookie = cookieStore.get(TOKEN_KEY);
    return tokenCookie?.value || null;
  },

  /**
   * Set the authentication token in cookies
   */
  async setToken(token, maxAge = 7 * 24 * 60 * 60) {
    // 7 days default
    const cookieStore = cookies();
    cookieStore.set(TOKEN_KEY, token, {
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      httpOnly: true,
      path: "/",
    });
  },

  /**
   * Remove the authentication token
   */
  async removeToken() {
    const cookieStore = cookies();
    cookieStore.delete(TOKEN_KEY);
  },

  /**
   * Check if user is authenticated
   */
  async isAuthenticated() {
    const token = await this.getToken();
    return !!token;
  },

  /**
   * Create headers with authentication token
   */
  async createAuthHeaders(additionalHeaders = {}) {
    const token = await this.getToken();
    const headers = {
      "Content-Type": "application/json",
      ...additionalHeaders,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  },

  /**
   * Make authenticated API request
   */
  async fetch(url, options = {}) {
    const headers = await this.createAuthHeaders(options.headers);

    return fetch(url, {
      ...options,
      headers,
    });
  },

  /**
   * Convenience methods for different HTTP methods
   */
  async get(url, options = {}) {
    return this.fetch(url, { ...options, method: "GET" });
  },

  async post(url, data = null, options = {}) {
    return this.fetch(url, {
      ...options,
      method: "POST",
      body: data ? JSON.stringify(data) : null,
    });
  },

  async put(url, data = null, options = {}) {
    return this.fetch(url, {
      ...options,
      method: "PUT",
      body: data ? JSON.stringify(data) : null,
    });
  },

  async delete(url, options = {}) {
    return this.fetch(url, { ...options, method: "DELETE" });
  },
};
