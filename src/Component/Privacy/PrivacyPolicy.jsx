import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>

      <p className="mb-6">
        At <span className="font-semibold">eklavya</span>, we value your privacy
        and are committed to protecting the personal information of our users.
        This Privacy Policy describes how we collect, use, and protect your data
        when you use our mobile application.
      </p>

      {/* Section 1 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Personal Information:</strong> When users register/login, we
            collect name, email ID, class/standard, and optionally profile
            image.
          </li>
          <li>
            <strong>Usage Data:</strong> We collect data related to videos
            watched, exams attempted, and results.
          </li>
          <li>
            <strong>Chat Communication:</strong> Messages and interactions with
            teachers are stored securely for academic purposes.
          </li>
        </ul>
      </div>

      {/* Section 2 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Authenticate users and manage user sessions</li>
          <li>Track video progress and provide access to related exams</li>
          <li>Show user exam results and performance</li>
          <li>Enable secure chat between students and teachers</li>
          <li>Improve app features and user experience</li>
        </ul>
      </div>

      {/* Section 3 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          3. Data Sharing and Security
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            We do not sell or share your personal data with third parties.
          </li>
          <li>Data is stored securely on encrypted servers.</li>
          <li>Only authorized personnel have access to user data.</li>
        </ul>
      </div>

      {/* Section 4 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">4. Children’s Privacy</h2>
        <p>
          eklavya is designed for students from 1st to 10th grade. We encourage
          parental guidance. We do not knowingly collect personal information
          from children without parental consent.
        </p>
      </div>

      {/* Section 5 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">5. User Rights</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Access your profile and academic data</li>
          <li>Request correction or deletion of your personal data</li>
          <li>Contact us for any privacy-related concerns</li>
        </ul>
      </div>

      {/* Section 6 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">6. Contact Us</h2>
        <p className="mb-2">
          For support, queries, or data-related issues, contact:
        </p>
        <b>Eonixa Dynamics Pvt Ltd</b>
        <p>
          <b> Email: </b>
          <a
            href="mailto:eonixadynamics@gmail.com"
            className="text-blue-600 hover:underline"
          >
            eonixadynamics@gmail.com
          </a>
        </p>
        <p>
          <b> Phone: </b>
          <a href="tel:+919112906555" className="text-blue-600 hover:underline">
            +91-9112906555
          </a>
        </p>
        <p>Pune, Maharashtra</p>
      </div>

      {/* Section 10 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">
          10. Updates to This Policy
        </h2>
        <p>
          This policy may be updated periodically. You will be informed of any
          changes via in-app notification or official communication.
        </p>
      </div>

      {/* Section 11 */}
      <div>
        <h2 className="text-xl font-semibold mb-3">11. Design & Develop</h2>
        <p>Eonixa Dynamics Pvt Ltd</p>
        <p>Pune, Maharashtra</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
