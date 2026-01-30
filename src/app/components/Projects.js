'use client';

import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

const projects = [
  {
    id: 1,
    title: "AgriConnect App",
    description:
      "AgriConnect is a mobile application developed during my 12th class for the Kushal Business Challenge (KBC). The project was selected at Block Level and District Level, then qualified for the State Level. Our team received ₹1,00,000+ government funding for this app.",
    image: "/projects/agri/a8.png",
    gallery: [
      "/projects/agri/a1.jpeg",
      "/projects/agri/a2.jpeg",
      "/projects/agri/a3.jpeg",
      "/projects/agri/a4.jpeg",
      "/projects/agri/a5.jpeg",
      "/projects/agri/a6.jpeg",
      "/projects/agri/a7.jpeg",
      "/projects/agri/a8.png",
    ],
    position: "left",
  },

  {
    id: 2,
    title: "Children’s Safety Smart Shoe",
    description:
      "Designed a GPS-enabled smart safety shoe with two emergency buttons: one for instant emergency calls and another for live location sharing. Parents can track the child anytime for enhanced safety.",
    image: "/projects/ChildrensSafety/s4.jpeg",
    gallery: [
      "/projects/ChildrensSafety/s0.jpeg",
      "/projects/ChildrensSafety/s1.jpeg",
      "/projects/ChildrensSafety/s3.jpeg",
      "/projects/ChildrensSafety/s4.jpeg",
      "/projects/ChildrensSafety/s5.jpeg",
    ],
    position: "right",
  },

  {
    id: 3,
    title: "Smart Garbage Segregation Bin (Prototype)",
    description:
      "Developed a smart garbage segregation bin prototype that automatically separates dry and wet waste using sensors and microcontroller-based logic, promoting efficient waste management.",
    image: "/projects/bin/s1.png", // ✅ THUMBNAIL
    gallery: [
      "/projects/bin/s1.png",
      "/projects/bin/s2.jpeg",
      "/projects/bin/s3.jpeg",
    ],
    position: "left",
  },
  {
  id: 4,
  title: "Smart Compost Bin",
  description:
    "Developed a smart compost bin integrated with the AgriConnect App. The system features real-time temperature monitoring using a probe sensor and automatic temperature control through an adjustable fan. This connectivity ensures odor-free operation and faster composting by maintaining optimal conditions, all monitored and controlled via the AgriConnect mobile application.",
  image: "/projects/compost-bin/c1.jpeg", // ✅ THUMBNAIL
  gallery: [
    "/projects/compost-bin/c1.jpeg",
    "/projects/compost-bin/c2.jpeg",
    "/projects/compost-bin/c3.jpeg",
    "/projects/compost-bin/c4.jpeg",
  ],
  position: "right",
},
{
  id: 5,
  title: "Home Automation & Security System",
  description:
    "Developed a comprehensive home automation and safety system during my 10th class. The project included theft protection, gas leakage detection, and automated safety alerts to prevent accidents. Due to the unavailability of a smartphone at that time, project images were not captured, but the system was successfully demonstrated at the school and district/state level.",
  image: "/assate/logo2.png", // placeholder image
  gallery: [], // ❌ NO GALLERY
  position: "left",
},


];


  return (
    <>
      <style jsx>{`
        /* PROJECTS SECTION LAYOUT */
        .projects-timeline {
          max-width: 1200px;
          margin: 0 auto;
        }

        /* Dots on the center line */
        .timeline-dot {
          position: absolute;
          width: 16px;
          height: 16px;
          background-color: var(--primary-color);
          border: 4px solid var(--dark-bg);
          border-radius: 50%;
          z-index: 1;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Position dots for left and right items */
        .timeline-item .timeline-dot {
          left: 50%;
          margin-left: -8px;
        }

        .timeline-item.right .timeline-dot {
          right: auto;
          left: 50%;
          margin-left: -8px;
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

        /* Ensure the cards have relative positioning so the Star Constellation finds them */
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
      `}</style>

      <section id="projects" style={{ position: 'relative', padding: '100px 0' }}>
      <div className="section-container">
        <h2>My Projects</h2>
      </div>
      <div className="projects-timeline">
        {projects.map((project) => (
          <ScrollReveal key={project.id}>
            <div className={`timeline-item ${project.position}`}>
              <div
                className="timeline-card project-card"
                onClick={() =>
                  project.gallery.length > 0 && setActiveProject(project)
                }
                style={{ cursor: project.gallery.length ? "pointer" : "default" }}
              >
                <div className="project-image">
                  {/* Add 'constellation-node' class here */}
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="constellation-node" 
                  />
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </div>
              <div className="timeline-dot"></div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ===== GALLERY MODAL ===== */}
      {activeProject && (
        <div
          className="project-modal-overlay"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="project-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setActiveProject(null)}
            >
              ✕
            </button>

            <h3>{activeProject.title}</h3>

            <div className="gallery-grid">
              {activeProject.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="project image"
                  onClick={() => setPreviewImage(img)}
                  style={{ cursor: "zoom-in" }}
                />
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
