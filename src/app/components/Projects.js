'use client';

import { useState, useEffect, useRef } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [connections, setConnections] = useState([]);
  const containerRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "AgriConnect App",
      description: "AgriConnect is a mobile application developed for the Kushal Business Challenge (KBC). Our team received ₹1,00,000+ government funding for this app.",
      image: "/projects/agri/a8.png",
      gallery: ["/projects/agri/a1.jpeg", "/projects/agri/a2.jpeg", "/projects/agri/a3.jpeg", "/projects/agri/a4.jpeg", "/projects/agri/a5.jpeg", "/projects/agri/a6.jpeg", "/projects/agri/a7.jpeg", "/projects/agri/a8.png"],
      position: "left",
    },
    {
      id: 2,
      title: "Children’s Safety Smart Shoe",
      description: "Designed a GPS-enabled smart safety shoe with emergency buttons for instant calls and live location sharing for parents.",
      image: "/projects/ChildrensSafety/s4.jpeg",
      gallery: ["/projects/ChildrensSafety/s0.jpeg", "/projects/ChildrensSafety/s1.jpeg", "/projects/ChildrensSafety/s3.jpeg", "/projects/ChildrensSafety/s4.jpeg", "/projects/ChildrensSafety/s5.jpeg"],
      position: "right",
    },
    {
      id: 3,
      title: "Smart Garbage Segregation Bin",
      description: "Developed a prototype that automatically separates dry and wet waste using sensors, promoting efficient waste management.",
      image: "/projects/bin/s1.png",
      gallery: ["/projects/bin/s1.png", "/projects/bin/s2.jpeg", "/projects/bin/s3.jpeg"],
      position: "left",
    },
    {
      id: 4,
      title: "Smart Compost Bin",
      description: "Integrated with AgriConnect App, featuring real-time temperature monitoring and automated fan control for optimal composting.",
      image: "/projects/compost-bin/c1.jpeg",
      gallery: ["/projects/compost-bin/c1.jpeg", "/projects/compost-bin/c2.jpeg", "/projects/compost-bin/c3.jpeg", "/projects/compost-bin/c4.jpeg"],
      position: "right",
    },
    {
      id: 5,
      title: "Home Automation & Security",
      description: "Comprehensive safety system including theft protection and gas leakage detection, demonstrated at the state level.",
      image: "/assate/logo2.png",
      gallery: [],
      position: "left",
    },
  ];

  // Logic to calculate constellation lines between "stars" (dots)
  useEffect(() => {
    const updateLines = () => {
      const dots = document.querySelectorAll('.timeline-dot');
      const newConnections = [];
      const containerRect = containerRef.current.getBoundingClientRect();

      for (let i = 0; i < dots.length - 1; i++) {
        const startRect = dots[i].getBoundingClientRect();
        const endRect = dots[i + 1].getBoundingClientRect();

        newConnections.push({
          x1: startRect.left + startRect.width / 2 - containerRect.left,
          y1: startRect.top + startRect.height / 2 - containerRect.top,
          x2: endRect.left + endRect.width / 2 - containerRect.left,
          y2: endRect.top + endRect.height / 2 - containerRect.top,
        });
      }
      setConnections(newConnections);
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  return (
    <>
      <style jsx>{`
        .projects-section {
          background-color: #0b0f1a; /* Deep space color */
          color: #fff;
          padding: 100px 0;
          position: relative;
          overflow: hidden;
        }

        .projects-timeline {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .constellation-svg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .constellation-path {
          stroke: #60a5fa; /* Primary color */
          stroke-width: 1.5;
          stroke-dasharray: 4 4;
          opacity: 0.4;
          filter: drop-shadow(0 0 4px #60a5fa);
        }

        .timeline-item {
          display: grid;
          grid-template-columns: 1fr 100px 1fr;
          align-items: center;
          margin-bottom: 8rem;
        }

        .timeline-dot {
          grid-column: 2;
          justify-self: center;
          width: 14px;
          height: 14px;
          background: #fff;
          border-radius: 50%;
          box-shadow: 0 0 10px #fff, 0 0 20px #60a5fa;
          position: relative;
          z-index: 2;
        }

        .project-card {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
          max-width: 650px;
          width: 100%;
        }

        .project-card:hover {
          transform: scale(1.02);
          border-color: #60a5fa;
          box-shadow: 0 0 20px rgba(96, 165, 250, 0.2);
        }

        .timeline-item.left .project-card { grid-column: 1; justify-self: end; text-align: right; }
        .timeline-item.right .project-card { grid-column: 3; justify-self: start; }

        .project-image-thumb {
          width: 100%;
          height: 180px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }

        @media (max-width: 768px) {
          .timeline-item { grid-template-columns: 50px 1fr; gap: 20px; }
          .timeline-dot { grid-column: 1; }
          .timeline-item.left .project-card, 
          .timeline-item.right .project-card { grid-column: 2; justify-self: start; text-align: left; }
          .constellation-path { stroke-dasharray: none; }
        }

        /* Modal Styles */
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

        .gallery-grid img {
          transition: transform 0.3s ease;
        }

        .gallery-grid img:hover {
          transform: scale(1.05);
        }

        /* Image Preview Overlay */
        .image-preview-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          cursor: zoom-out;
        }

        .image-preview-overlay img {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }
      `}</style>

      <section id="projects" className="projects-section" ref={containerRef}>
        <div className="section-container" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>Project Constellation</h2>
          <p style={{ opacity: 0.7 }}>A roadmap of innovation and engineering.</p>
        </div>

        {/* The dynamic lines that connect the projects */}
        <svg className="constellation-svg">
          {connections.map((line, i) => (
            <line
              key={i}
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              className="constellation-path"
            />
          ))}
        </svg>

        <div className="projects-timeline">
          {projects.map((project) => (
            <ScrollReveal key={project.id}>
              <div className={`timeline-item ${project.position}`}>
                <div 
                  className="project-card"
                  onClick={() => project.gallery.length > 0 && setActiveProject(project)}
                  style={{ cursor: project.gallery.length ? 'pointer' : 'default' }}
                >
                  <img src={project.image} alt={project.title} className="project-image-thumb" />
                  <h3>{project.title}</h3>
                  <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>{project.description}</p>
                </div>

                <div className="timeline-dot"></div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Gallery Logic (Same as your original) */}
        {activeProject && (
          <div className="project-modal-overlay" onClick={() => setActiveProject(null)}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <button className="close-btn" onClick={() => setActiveProject(null)}>✕</button>
              <h3 style={{ marginBottom: '20px' }}>{activeProject.title}</h3>
              <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
                {activeProject.gallery.map((img, index) => (
                  <img key={index} src={img} alt="Gallery" onClick={() => setPreviewImage(img)} style={{ width: '100%', borderRadius: '8px', cursor: 'zoom-in' }} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===== IMAGE PREVIEW (FULL SCREEN) ===== */}
        {previewImage && (
          <div
            className="image-preview-overlay"
            onClick={() => setPreviewImage(null)}
          >
            <img src={previewImage} alt="preview" />
          </div>
        )}
      </section>
    </>
  );
}
