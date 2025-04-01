import React, { useEffect, useState } from "react";
import makeRequesta from "../axios";
export default function RefreshToken() {
  const refreshTokenRequest = async () => {
    try {
      const response = await fetch(
        "https://api.studypulse.live/web/api/refresh-token",
        // "http://localhost:5000/web/api/refresh-token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // to send cookies along with the request
        }
      );

      if (!response.ok) {
        throw new Error("Failed to refresh token");
      }

      const data = await response.json();
      console.log("Token refreshed:", data);
    } catch (error) {
      console.error("Failed to refresh token:", error.message);
    }
  };

  const login = async () => {
    try {
      const response = await fetch(
        "https://api.studypulse.live/web/api/login",
        // "http://localhost:5000/web/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "admin@gmail.com",
            password: "password123",
          }),
          credentials: "include", // this sends the cookies (for refresh token)
        }
      );

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // The refresh token should be set in cookies automatically by the backend
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={refreshTokenRequest}>Refresh Token</button>
      <button onClick={login}>Login</button>
    </div>
  );
}
