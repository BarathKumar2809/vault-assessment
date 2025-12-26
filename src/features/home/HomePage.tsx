import { useState } from 'react';
import './HomePage.css';

interface HomePageProps {
  onGetStarted: () => void;
}

function HomePage({ onGetStarted }: HomePageProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="nav-container">
          <div className="nav-logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>SecureVault</span>
          </div>
          
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>

          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#about">About</a>
            <button className="nav-cta" onClick={onGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Secure Password Vault
              <br />
              <span className="gradient-text">Browser-Based Encryption</span>
            </h1>
            <p className="hero-description">
              Store your passwords locally with AES-256-GCM encryption. Everything happens 
              in your browser - no servers, no cloud, no tracking. Only your master password 
              can unlock your vault.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={onGetStarted}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                Open Vault
              </button>
              <button className="secondary-btn" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Learn More
              </button>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges">
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>AES-256 Encryption</span>
              </div>
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Zero-Knowledge</span>
              </div>
              <div className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M8.21 4.5C8.21 4.5 10.5 2 12 2c1.5 0 3.79 2.5 3.79 2.5"></path>
                </svg>
                <span>Client-Side Only</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="vault-card">
              <div className="card-header">
                <div className="card-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <span>Your Vault</span>
              </div>
              <div className="card-content">
                <div className="credential-item">
                  <div className="cred-icon email">@</div>
                  <div className="cred-info">
                    <div className="cred-name">Email Account</div>
                    <div className="cred-user">user@example.com</div>
                  </div>
                  <div className="cred-status"></div>
                </div>
                <div className="credential-item">
                  <div className="cred-icon social">f</div>
                  <div className="cred-info">
                    <div className="cred-name">Social Media</div>
                    <div className="cred-user">@username</div>
                  </div>
                  <div className="cred-status"></div>
                </div>
                <div className="credential-item">
                  <div className="cred-icon bank">$</div>
                  <div className="cred-info">
                    <div className="cred-name">Banking</div>
                    <div className="cred-user">••••••••</div>
                  </div>
                  <div className="cred-status"></div>
                </div>
              </div>
              <div className="card-footer">
                <div className="lock-status">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                  <span>Encrypted & Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-container">
          <h2 className="section-title">Features</h2>
          <p className="section-subtitle">
            Everything you need to manage passwords securely
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  <path d="M9 12l2 2 4-4"></path>
                </svg>
              </div>
              <h3>AES-256-GCM Encryption</h3>
              <p>Your secrets are encrypted using Web Crypto API with AES-256-GCM and PBKDF2 (100,000 iterations). Bank-level security in your browser.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3>No Backend Required</h3>
              <p>Everything runs in your browser. No servers, no cloud storage, no data transmission. Your vault stays on your device only.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <h3>Built-in Password Generator</h3>
              <p>Generate strong passwords with customizable options - length, uppercase, lowercase, numbers, and special characters.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
              </div>
              <h3>Fast Search</h3>
              <p>Instantly search through your secrets by name, username, or notes. All searches happen locally in memory.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </div>
              <h3>Quick Copy</h3>
              <p>One-click copy for usernames and passwords. Clipboard automatically clears after 3 seconds for security.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              </div>
              <h3>Manual Lock/Unlock</h3>
              <p>Lock your vault anytime with one click. Unlocking requires your master password. Vault auto-locks when browser closes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="security-section">
        <div className="section-container">
          <div className="security-content">
            <h2 className="section-title">How It Works</h2>
            <p className="security-description">
              This vault uses the Web Crypto API for encryption. Your secrets are stored in browser localStorage 
              but only in encrypted form. Here's what makes it secure:
            </p>
            <ul className="security-list">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span><strong>AES-256-GCM Encryption</strong> - Industry-standard encryption algorithm used by military and banks</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span><strong>PBKDF2 Key Derivation</strong> - Your master password goes through 100,000 iterations to create the encryption key</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span><strong>LocalStorage Only</strong> - Encrypted data stays on your device. No server uploads, no cloud sync</span>
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span><strong>Memory-Only Decryption</strong> - Plaintext passwords only exist in RAM when vault is unlocked</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2>Ready to Start?</h2>
          <p>Create your master password and start storing credentials securely. Everything stays on your device.</p>
          <button className="cta-button" onClick={onGetStarted}>
            Open Your Vault
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <div className="about-content">
            <h2 className="section-title">About SecureVault</h2>
            <p className="about-description">
              SecureVault is a modern, browser-based password manager that prioritizes your privacy and security.
              Built with cutting-edge web technologies, it provides enterprise-grade encryption without compromising
              on user experience.
            </p>
            <div className="about-features">
              <div className="about-card">
                <div className="about-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3>Privacy First</h3>
                <p>Your data never leaves your device. All encryption and decryption happens locally in your browser.</p>
              </div>
              <div className="about-card">
                <div className="about-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <h3>Open Source</h3>
                <p>Transparent codebase you can inspect. Built with React, TypeScript, and modern web standards.</p>
              </div>
              <div className="about-card">
                <div className="about-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                  </svg>
                </div>
                <h3>Lightning Fast</h3>
                <p>Instant access to your passwords with optimized performance and minimal resource usage.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-container">
          <div className="footer-left">
            <div className="footer-logo">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              <span>SecureVault</span>
            </div>
            <p>© 2025 SecureVault. Built with security in mind.</p>
          </div>
          <div className="footer-right">
            <a href="#features">Features</a>
            <a href="#security">Security</a>
            <a href="#about">About</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

