import React, { useState } from "react";
import Modal from "react-modal";

const DocumentViewer = ({ studentData }) => {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal state

  // Function to open the modal with selected document
  const openModal = (doc) => {
    setSelectedDocument(doc);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  // Function to render the document based on type
  const renderDocument = (doc) => {
    const fileExtension = doc.split(".").pop().toLowerCase();
    console.log("renderDocument", doc);
    if (fileExtension === "pdf") {
      return (
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Viewing PDF</h3>
          <iframe
            src={doc}
            width="100%"
            height="600px"
            title="Document Viewer"
            className="border-2 border-gray-300 rounded"
          />
          <a href={`/${doc}`} download className="mt-2 text-blue-500 underline">
            Download PDF
          </a>
        </div>
      );
    } else if (["jpg", "jpeg", "png"].includes(fileExtension)) {
      return (
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Viewing Image</h3>
          <img
            src={`/${doc}`}
            alt={`Document ${doc}`}
            className="max-w-full max-h-96"
          />
          <a href={doc} download className="mt-2 text-blue-500 underline">
            Download Image
          </a>
        </div>
      );
    } else {
      return <div>Unsupported document type</div>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Display Documents List */}
      {studentData?.documents && studentData.documents.length > 0 ? (
        <div className="flex flex-wrap space-x-4 mb-4">
          {studentData.documents.map((doc, index) => (
            <div key={index} className="mb-4">
              <button
                onClick={() => openModal(doc)} // Open modal with selected document
                className="text-blue-600 hover:underline"
              >
                View Document {index + 1}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No documents available.</p>
      )}

      {/* Modal for displaying the document */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal} // Close the modal when clicked outside
        contentLabel="Document Viewer"
        className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-auto relative">
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-xl text-red-500 hover:text-red-700"
            style={{ zIndex: 1000 }} // Ensuring the button is on top
          >
            X
          </button>
          {selectedDocument && renderDocument(selectedDocument)}
        </div>
      </Modal>
    </div>
  );
};

export default DocumentViewer;
