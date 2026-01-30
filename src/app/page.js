'use client';

import { useEffect, useRef } from 'react';
import ScrollReveal from './components/ScrollReveal';
import CertificateModal from './components/CertificateModal';
import Projects from './components/Projects';
import Moon from './components/Moon';
import Navigation from './components/Navigation';
import StarConstellation from './components/StarConstellation';

export default function Home() {
  const stripRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stripRef.current) return;

      const rect = stripRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = (windowHeight - rect.top) / windowHeight;
        const move = Math.sin(progress * Math.PI) * 40 - 20;
        stripRef.current.style.transform = `translateX(${move}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="main-container">
      <Moon />
      <StarConstellation />
      <Navigation />

      {/* HERO SECTION */}
      <section className="hero" id="home">
        <div className="hero-content">
          <div className="hero-text">
            <div className="greeting">Welcome to my portfolio</div>

            <h1>
              Hi, I'm <span className="gradient-text">Guddu Kumar</span>
            </h1>

            <p className="subtitle">Tech & Robotics Enthusiast</p>

            <p className="description">
              A passionate robotics enthusiast with skills in mobile app development,
              website development, and electronics repair.
            </p>

            <div className="cta-buttons">
              <a
                href="mailto:sumitradevi10590gk@gmail.com"
                className="btn btn-primary"
              >
                ✉️ Get In Touch
              </a>

              <a
                href="https://www.instagram.com/roboticswithansh/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                📸 Instagram
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/assate/dp1.png"
              alt="Guddu Kumar"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="about" id="about">
        <div className="section-container">
          <h2>About Me</h2>

          <div className="about-content">
            <p>
              My name is Guddu Kumar (nickname ansh thakur) I am 17 years old . I have completed my 12th grade in the Commerce stream
              from HBSE (Haryana State Board). I am passionate about robotics and technology.
              I have skills in mobile app development and website development. Along with
              this, I enjoy repairing electrical and electronic devices.
            </p>

            <div className="skills-grid">
              <div className="skill-tag">Robotics</div>
              <div className="skill-tag">App Development</div>
              <div className="skill-tag">Website Development</div>
              <div className="skill-tag">Electronics Repair</div>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATE STRIP */}
      <section className="certificate-strip">
        <div className="certificate-strip-inner" ref={stripRef}>
          <div className="cert-box"><img src="/certificates/cert1.jpeg" /></div>
          <div className="cert-box"><img src="/certificates/cert2.jpeg" /></div>
          <div className="cert-box"><img src="/certificates/cert3.jpeg" /></div>
          <div className="cert-box"><img src="/certificates/cert4.jpeg" /></div>
          <div className="cert-box"><img src="/certificates/cert5.jpeg" /></div>
          <div className="cert-box"><img src="/certificates/cert6.jpeg" /></div>
        </div>
      </section>

      {/* PROJECTS */}
      <Projects />

      {/* CERTIFICATES */}
      <section className="certificates" id="certificates">
        <div className="section-container">
          <h2>Certificates & Achievements</h2>
          <CertificateModal />
        </div>
      </section>

      {/* ✅ FIXED CONTACT SECTION */}
      <section className="contact" id="contact">
        <div className="section-container">
          <h2>Let's Connect</h2>
          <p className="contact-text">
            Reach out for robotics projects, collaborations, or gaming content.
          </p>

          <a
            href="mailto:sumitradevi10590gk@gmail.com?subject=Hello%20Guddu&body=Hi%20Guddu,%0A%0AI%20visited%20your%20portfolio%20and%20would%20like%20to%20connect."
            className="btn btn-primary btn-large"
          >
            ✉️ Email Me
          </a>

          <div className="contact-links">
            <a
              href="https://www.instagram.com/roboticswithansh/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              🤖 Instagram (Robotics)
            </a>

            <a
              href="https://www.instagram.com/understand_vibes/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              🎮 Instagram (Gaming)
            </a>

            <a
              href="https://discord.com/users/thakur10590"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              💬 Discord: thakur10590
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>&copy; 2026 Guddu Kumar. All rights reserved.</p>
      </footer>
    </main>
  );
}
