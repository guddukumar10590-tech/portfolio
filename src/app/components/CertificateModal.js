'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
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
      <div className="certificates-timeline">
        {CERTIFICATES.map(cert => (
          <ScrollReveal key={cert.id}>
            <div className={`timeline-item ${cert.position}`}>
              
              {cert.position === 'right' && (
                <Content {...cert} />
              )}

              <button
                className="timeline-card"
                onClick={() => setActiveId(cert.id)}
                aria-label={`View certificate for ${cert.title}`}
              >
                <div className="certificate-image">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    sizes="260px"
                    priority={cert.id === 1}
                  />
                </div>
              </button>

              <div className="timeline-dot" />

              {cert.position === 'left' && (
                <Content {...cert} />
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {activeCert && (
        <div className="certificate-modal-overlay" onClick={closeModal}>
          <div
            className="certificate-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="certificate-close-btn" onClick={closeModal}>
              ✕
            </button>

            <Image
              src={activeCert.image}
              alt={activeCert.title}
              width={1100}
              height={750}
              className="modal-image"
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .timeline-item {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 30px;
          margin-bottom: 90px;
          align-items: center;
        }

        .timeline-content {
          max-width: 440px;
          color: #fff;
        }

        .timeline-content h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .timeline-content p {
          font-size: 0.95rem;
          line-height: 1.65;
          opacity: 0.9;
        }

        .timeline-card {
          background: none;
          border: none;
          cursor: pointer;
        }

        .certificate-image {
          position: relative;
          width: 260px;
          height: 180px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .timeline-dot {
          width: 14px;
          height: 14px;
          background: #6c7cff;
          border-radius: 50%;
        }

        @media (max-width: 768px) {
          .timeline-item {
            grid-template-columns: 1fr;
            gap: 20px;
            margin-bottom: 60px;
            text-align: center;
          }

          .timeline-content {
            order: 1;
            max-width: 100%;
          }

          .timeline-card {
            order: 2;
          }

          .certificate-image {
            width: 100%;
            max-width: 300px;
            height: 200px;
          }
        }

        .certificate-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }

        .certificate-modal-content {
          background: #0f172a;
          padding: 24px;
          border-radius: 18px;
          max-width: 1200px;
          width: 90%;
          position: relative;
        }

        .modal-image {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .certificate-close-btn {
          position: absolute;
          top: 14px;
          right: 16px;
          font-size: 22px;
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

function Content({ title, description }) {
  return (
    <div className="timeline-content">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
