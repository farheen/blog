import React, { useEffect, useState } from "react";
const apiBaseUrl = process.env.REACT_APP_API_URL;

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${REACT_APP_API_URL}/api/certificates/`)
      .then((response) => response.json())
      .then((data) => {
        setCertificates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching certificates:", error);
        setError("Failed to load certificates. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading certificates...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-6">
        My Certificates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <div
            key={certificate.id}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition"
          >
            {certificate.thumbnail && (
              <img
                src={certificate.thumbnail}
                alt={certificate.title}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h2 className="text-xl font-semibold text-gray-800 mt-4">
              {certificate.title}
            </h2>
            <p className="text-gray-600 text-sm">{certificate.issuer}</p>
            <p className="text-gray-700 mt-2">{certificate.description}</p>
            <p className="text-gray-500 text-sm mt-1">
              Issued on: {new Date(certificate.date_issued).toLocaleDateString()}
            </p>
            <a
              href={certificate.certificate_link}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 text-indigo-500 hover:underline"
            >
              View Certificate
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
