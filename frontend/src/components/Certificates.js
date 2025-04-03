import React from "react";

const Certificates = () => {
  const certificates = [
    {
      title: "Knowledge and Human Development Authority of Dubai Attested Certificate.",
      link: "/images/Farheen Zahara_certificate-1_page-0001.jpg",
    },
    {
      title: "London Chamber of Commerce",
      link: "/images/DSML BCC (4)_page-0001.jpg",
    },
    {
      title: "CPD",
      link: "/images/certificate_cpd-1_page-0001.jpg",
    },
    // Add more here
  ];

   return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">My Certificates</h1>
      <div className="space-y-10">
        {certificates.map((cert, index) => (
          <div key={index} className="border rounded-lg shadow-md overflow-hidden">
            <img
              src={cert.img}
              className="w-full h-auto object-contain"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{cert.title}</h2>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Full Certificate
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
