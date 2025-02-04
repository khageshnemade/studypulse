{
  showForm && (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto">
      <div className="relative max-h-[90%] overflow-y-auto bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Update Information</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={studentData.firstName}
                onChange={handleUserDataChange}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={studentData.lastName}
                onChange={handleUserDataChange}
              />
            </div>
          </div>

          {/* Phone Number and Address */}
          <div className="mb-4 flex flex-col sm:flex-row sm:space-x-4">
            <div className="flex-1">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={studentData.phoneNumber}
                onChange={handleUserDataChange}
              />
            </div>

            <div className="flex-1">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={studentData.address}
                onChange={handleStudentDataChange}
              />
            </div>
          </div>

          {/* Dropdown to display all documents */}
          {/* <div className="flex-1">
                <label
                  htmlFor="doc"
                  className="block text-sm font-medium text-gray-700"
                >
                  Documents
                </label>
                <select
                  id="doc"
                  name="doc"
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleSelectChange}
                >
                  <option value="">Select a document</option>
                  {studentData.documents.map((doc, index) => (
                    <option key={index} value={doc}>
                      {doc}
                    </option>
                  ))}
                </select>
              </div> */}
          {docs.map((doc, index) => (
            <p key={index} value={doc}>
              {doc}
            </p>
          ))}

          {/* Add a new document */}
          <div className="flex items-center mt-2 gap-2">
            <input
              type="file"
              id="new-doc"
              onChange={handleFileChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-gray-700 ml-2">
              {fileName || "No file selected"}
            </span>{" "}
            {/* Display the file name */}
            <button
              type="button"
              onClick={handleAddDocument}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Add
            </button>
          </div>

          {/* List of documents with remove button */}
          {/* <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-700">
                  Current Documents:
                </h3>
                <ul className="mt-2 space-y-2">
                  {studentData.documents.map((doc, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between px-4 py-2 bg-gray-100 rounded-lg"
                    >
                      <span>{doc}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDocument(doc)}
                        className="px-2 py-1 text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div> */}

          <div className="flex-1">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700"
            >
              Status
            </label>
            <select
              type="text"
              id="status"
              name="status"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={studentData.status}
              onChange={handleStudentDataChange}
            >
              <option value="">Select a status</option>
              <option value="active">Active</option>
              <option value="inActive">Inactive</option>
            </select>
          </div>
          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

{
  /* User Information */
}
<div className="p-6 rounded-lg shadow-md">
  <ul className="space-y-4 text-gray-600">
    {[
      { label: "First Name:", value: studentData.firstName },
      { label: "Last Name:", value: studentData.lastName },
      { label: "Phone Number:", value: studentData.phoneNumber },
      { label: "Address:", value: studentData.address },
      { label: "Role:", value: studentData.role },

      { label: "Email Address:", value: studentData.email },
      { label: "City:", value: studentData?.cityData?.name },
      { label: "Taluka:", value: studentData?.talukaData?.name },
      {
        label: "District:",
        value: studentData?.districtData?.name,
      },
    ].map((item, index) => (
      <li key={index} className="grid grid-cols-[150px_1fr]">
        <strong>{item.label}</strong>
        <span>{item.value}</span>
      </li>
    ))}
  </ul>
</div>;