import React from "react";

const Certificates = () => {
  const certificates = [
    {
      title: "Knowledge and Human Development Authority of Dubai Attested Certificate.",
      img: "/home/farheen/workspace/BlogWebsite/frontend/public/images/Farheen Zahara_certificate-1_page-0001.jpg",
      link: "/home/farheen/workspace/BlogWebsite/frontend/public/images/Farheen Zahara_certificate-1_page-0001.jpg",
    },
    {
      title: "London Chamber of Commerce",
      img: "/home/farheen/workspace/BlogWebsite/frontend/public/images/DSML BCC (4)_page-0001.jpg",
      link: "/home/farheen/workspace/BlogWebsite/frontend/public/images/DSML BCC (4)_page-0001.jpg",
    },
    {
      title: "CPD",
      img: "/home/farheen/workspace/BlogWebsite/frontend/public/images/certificate_cpd-1_page-0001.jpg",
      link: "/home/farheen/workspace/BlogWebsite/frontend/public/images/certificate_cpd-1_page-0001.jpg",
    },
    // Add more here
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Certificates</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <a
            key={index}
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className="border rounded-lg shadow hover:shadow-lg transition"
          >
            <img
              src={cert.img}
              alt={cert.title}
              className="w-full h-60 object-contain p-4"
            />
            <p className="text-center p-2 font-semibold">{cert.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Certificates;
