'use client';

import { useState, useEffect, useCallback } from 'react';
import ScrollReveal from './ScrollReveal';

const CERTIFICATES = [
  {
    id: 1,
    image: '/certificates/cert1.jpeg',
    title: 'Robotics Classes Certificate',
    description: 'Completed specialized Robotics training in Grade 9, focusing on mechanical assembly and basic programming concepts.',
    offset: '10%' // Horizontal offset for "constellation" look
  },
  {
    id: 2,
    image: '/certificates/cert2.jpeg',
    title: 'AgriConnect – Gardening Community App',
    description: 'AgriConnect connects urban gardeners to exchange items for free. 🏆 Achievement: Secured 100K+ funding from the Haryana Government.',
    offset: '-15%'
  },
  {
    id: 3,
    image: '/certificates/cert3.jpeg',
    title: 'Smart Garbage Segregation Bin',
    description: 'Built a smart garbage bin that automatically segregates plastic, metal, and biodegradable waste. 🏆 1st Place at Block Level.',
    offset: '12%'
  },
  {
    id: 4,
    image: '/certificates/cert4.jpeg',
    title: "Children's Safety Smart Shoe",
    description: 'Designed a GPS-enabled smart safety shoe with emergency buttons and live location sharing.',
    offset: '-8%'
  },
  {
    id: 5,
    image: '/certificates/cert5.jpeg',
    title: 'Smart Home Automation',
    description: 'Developed an IoT-based home automation system enabling remote control for improved energy efficiency.',
    offset: '15%'
  },
  {
    id: 6,
    image: '/certificates/cert6.jpeg',
    title: 'Smart Home Security & Automation System',
    description: 'Presented at State Level. Features include theft detection, gas leak alerts, and remote appliance control.',
    offset: '-5%'
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
      <div className="constellation-container">
        {/* Background stars */}
        <div className="star-field"></div>
        
        <div className="projects-wrapper">
          {CERTIFICATES.map((cert, index) => (
            <ScrollReveal key={cert.id}>
              <div 
                className="constellation-item" 
                style={{ '--offset': cert.offset, '--delay': `${index * 0.2}s` }}
              >
                {/* Connecting Line (Hidden on mobile) */}
                {index < CERTIFICATES.length - 1 && (
                  <div className="connector-line"></div>
                )}

                <div className="star-node">
                   <div className="pulse-ring"></div>
                </div>

                <div
                  className="project-card"
                  onClick={() => setActiveId(cert.id)}
                >
                  <div className="project-image">
                    <img src={cert.image} alt={cert.title} />
                  </div>
                  <div className="project-content">
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Modal logic remains same */}
      {activeCert && (
        <div className="project-modal-overlay" onClick={() => setActiveId(null)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setActiveId(null)}>✕</button>
            <h3>{activeCert.title}</h3>
            <div className="gallery-grid">
              <img src={activeCert.image} alt={activeCert.title} className="modal-image" />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .constellation-container {
          position: relative;
          padding: 80px 20px;
          background: #020617; /* Deep space color */
          overflow: hidden;
        }

        /* Twinkling star background */
        .star-field {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)),
            radial-gradient(1.5px 1.5px at 90px 40px, #fff, rgba(0,0,0,0));
          background-size: 200px 200px;
          opacity: 0.3;
        }

        .projects-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 120px;
          position: relative;
        }

        .constellation-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          transform: translateX(var(--offset));
          transition: transform 0.5s ease;
        }

        /* The Star Node */
        .star-node {
          width: 12px;
          height: 12px;
          background: #6c7cff;
          border-radius: 50%;
          box-shadow: 0 0 15px #6c7cff, 0 0 30px #6c7cff;
          margin-bottom: 2rem;
          position: relative;
          z-index: 10;
        }

        .pulse-ring {
          position: absolute;
          inset: -10px;
          border: 2px solid #6c7cff;
          border-radius: 50%;
          animation: pulse 2s infinite;
          opacity: 0;
        }

        @keyframes pulse {
          0% { transform: scale(0.5); opacity: 0.8; }
          100% { transform: scale(2); opacity: 0; }
        }

        /* Jagged Connecting Line */
        .connector-line {
          position: absolute;
          top: 12px;
          left: 50%;
          width: 2px;
          height: 180px;
          background: linear-gradient(to bottom, #6c7cff, transparent);
          transform: rotate(15deg); /* Angles the connection */
          transform-origin: top;
          z-index: 1;
          opacity: 0.4;
        }

        /* Hovering Card Effect */
        .project-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(108, 124, 255, 0.2);
          border-radius: 24px;
          width: 100%;
          max-width: 400px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          animation: float 6s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .project-card:hover {
          transform: scale(1.05) translateY(-10px) !important;
          border-color: #6c7cff;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(108, 124, 255, 0.2);
        }

        .project-image {
          height: 180px;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
        }

        .project-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .project-card:hover .project-image img {
          transform: scale(1.1);
        }

        .project-content {
          padding: 24px;
        }

        .project-content h3 {
          color: #fff;
          margin-bottom: 8px;
          font-size: 1.2rem;
        }

        .project-content p {
          color: #94a3b8;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        /* Modal Styles */
        .project-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(8px);
        }

        .project-modal {
          background: #0f172a;
          padding: 30px;
          border-radius: 24px;
          width: 90%;
          max-width: 800px;
          position: relative;
          border: 1px solid #6c7cff;
        }

        .modal-image {
          width: 100%;
          border-radius: 12px;
          margin-top: 15px;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          color: #fff;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .constellation-item {
            transform: translateX(0); /* Remove offset on mobile for better fit */
          }
          .connector-line {
            display: none;
          }
          .projects-wrapper {
            gap: 60px;
          }
        }
      `}</style>
    </>
  );
}
