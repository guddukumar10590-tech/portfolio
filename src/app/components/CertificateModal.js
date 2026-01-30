'use client';

import { useState, useEffect, useCallback } from 'react';
import ScrollReveal from './ScrollReveal';

const CERTIFICATES = [
  {
    id: 1,
    image: '/certificates/cert1.jpeg',
    position: 'left',
    title: 'Robotics Classes Certificate',
    description:
      'Completed specialized Robotics training in Grade 9, focusing on mechanical assembly and basic programming concepts.'
  },
  {
    id: 2,
    image: '/certificates/cert2.jpeg',
    position: 'right',
    title: 'AgriConnect – Gardening Community App',
    description:
      'AgriConnect connects urban gardeners to exchange items for free and access paid services like gardening advice, garden management, kitchen, terrace, and vertical gardening setups. 🏆 Achievement: Secured 100K+ funding from the Haryana Government.'
  },
  {
    id: 3,
    image: '/certificates/cert3.jpeg',
    position: 'left',
    title: 'Smart Garbage Segregation Bin',
    description:
      'Built a smart garbage bin that automatically segregates plastic, metal, and biodegradable waste using sensors. 🏆 Achievement: 1st Place at Block Level for innovation and real-world impact.'
  },
  {
    id: 4,
    image: '/certificates/cert4.jpeg',
    position: 'right',
    title: "Children's Safety Smart Shoe",
    description:
      'Designed a GPS-enabled smart safety shoe with two emergency buttons: one for instant emergency calls and another for live location sharing. Parents can track the child anytime for enhanced safety.'
  },
  {
    id: 5,
    image: '/certificates/cert5.jpeg',
    position: 'left',
    title: 'Smart Home Automation',
    description:
      'Developed an IoT-based home automation system enabling remote control of lighting, appliances, and security for improved energy efficiency.'
  },
  {
    id: 6,
    image: '/certificates/cert6.jpeg',
    position: 'right',
    title: 'Smart Home Security & Automation System',
    description:
      'Presented at State Level (Haryana). Features include automatic door locking, remote appliance control from anywhere in India, theft detection, and gas leak alerts.'
  }
];

export default function CertificateModal() {
  const [activeId, setActiveId] = useState(null);

  const closeModal = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && closeModal();
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeModal]);

  const activeCert = CERTIFICATES.find(cert => cert.id === activeId);

  return (
    <>
      <div className="projects-timeline">
        {CERTIFICATES.map(cert => (
          <ScrollReveal key={cert.id}>
            <div className={`timeline-item ${cert.position}`}>
              
              <div
                className="timeline-card project-card"
                onClick={() => setActiveId(cert.id)}
                style={{ cursor: "pointer" }}
              >
                <div className="project-image">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="constellation-node"
                  />
                </div>

                <div className="project-content">
                  <h3>{cert.title}</h3>
                  <p>{cert.description}</p>
                </div>
              </div>

              <div className="timeline-dot"></div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {activeCert && (
        <div
          className="project-modal-overlay"
          onClick={() => setActiveId(null)}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setActiveId(null)}
            >
              ✕
            </button>

            <h3>{activeCert.title}</h3>

            <div className="gallery-grid">
              <img
                src={activeCert.image}
                alt={activeCert.title}
                className="modal-image"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .project-card {
          background: rgba(30, 41, 59, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-5px);
          border-color: var(--primary-color);
        }

        .project-image {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .project-content {
          padding: 20px;
          color: #fff;
        }

        .project-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
          color: #6c7cff;
        }

        .project-content p {
          font-size: 0.95rem;
          line-height: 1.65;
          opacity: 0.9;
        }

        /* Mobile Responsive */
        @media screen and (max-width: 768px) {
          .timeline-item {
            flex-direction: column;
            align-items: center;
            margin-bottom: 60px;
          }
          
          .project-card {
            width: 90% !important;
          }
          
          .timeline-dot {
            position: static !important;
            margin: 20px 0;
            transform: none;
          }
        }

        .project-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          padding: 1rem;
        }

        .project-modal {
          background: #0f172a;
          padding: 24px;
          border-radius: 18px;
          max-width: 1200px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }

        .close-btn {
          position: absolute;
          top: 14px;
          right: 16px;
          font-size: 22px;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }

        .project-modal h3 {
          color: #6c7cff;
          margin-bottom: 20px;
          font-size: 1.5rem;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 10px;
        }

        .modal-image {
          width: 100%;
          height: auto;
          object-fit: contain;
          border-radius: 8px;
        }

        @media (max-width: 768px) {
          .project-modal {
            padding: 16px;
            width: 95%;
            max-height: 95vh;
          }

          .modal-image {
            max-height: 50vh;
          }

          .close-btn {
            font-size: 20px;
            top: 10px;
            right: 12px;
          }
        }
      `}</style>
    </>
  );
}
