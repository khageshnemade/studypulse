import React, { useEffect, useState } from "react";

export default function Showemail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false); // Track if suggestion should be shown

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle key down event to show gmail.com suggestion when @ is pressed
  const handleEmailKeyDown = (e) => {
    // Check if there is more than one '@' in the email input
    console.log("Email input has more than one", email);
    const atCount = email.split("@").length - 1;

    // Hide suggestion if there are multiple '@' symbols
    if (atCount > 0) {
      setShowSuggestion(false);
    } else if (e.key === "@") {
      // If '@' is pressed but no domain (like '.com') is present, show suggestion
      if (!email.includes(".com")) {
        setShowSuggestion(true);
      }
    } else if (e.key !== "Tab") {
      // Hide suggestion when any other key is pressed except Tab
      setShowSuggestion(false);
    }

    // If Tab is pressed and suggestion should show, auto-complete with gmail.com
    if (e.key === "Tab" && shouldShowGmail) {
      // Only append if '@' is already present and user hasn't typed a domain
      if (email.includes("@") && !email.includes(".com")) {
        setEmail(email + "gmail.com");
        e.preventDefault(); // Prevent default tab behavior
      }
    }
  };

  // Determine if we should show gmail.com based on the email value
  const shouldShowGmail =
    email.includes("@") && !email.includes(".com") && showSuggestion;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form>
        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyDown={handleEmailKeyDown} // Detect key press
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {shouldShowGmail && (
              <div
                className="absolute top-[53%] transform -translate-y-1/2 text-gray-500 text-[16px] font-sans"
                style={{
                  right: `${295 - email.length * 9}px`,
                  fontFamily: "Arial",
                }}
              >
                gmail.com
              </div>
            )}
          </div>
        </div>
        hhhhhhhhhhhhhhhhhhhhhhhhhhhh
        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
