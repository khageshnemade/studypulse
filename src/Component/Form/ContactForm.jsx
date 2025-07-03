import React, { useState } from "react";

const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General Inquiry");
  const [details, setDetails] = useState("");

  const topics = [
    "Request For Delete the Account",
    "Account Related Problems",
    "Result Not Showing",
    "Not Able to Give the Exam",
    
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !details || !topic) {
      alert("Please fill in all fields.");
      return;
    }

    const subject = `Query from ${email} - ${topic}`;
    const body = encodeURIComponent(details);
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=eonixadynamics@gmail.com&su=${encodeURIComponent(
      subject
    )}&body=${body}`;

    window.open(mailtoLink, "_blank");

    // Reset form
    setEmail("");
    setDetails("");
    setTopic("General Inquiry");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Your Email</label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Topic</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          >
            {topics.map((t, idx) => (
              <option key={idx} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Details</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            rows="4"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
            placeholder="Write your query..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Query
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
