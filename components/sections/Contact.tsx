"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload, FiCopy, FiCheck, FiMail, FiExternalLink } from "react-icons/fi";
import { SiGithub, SiWhatsapp, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const emailAddress = "kumarharsh1306@gmail.com";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  const handleOpenGmail = () => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(emailAddress).catch((err) => {
          console.error("Failed to copy email on open gmail:", err);
        });
      }
    } catch (err) {
      console.error("Failed to copy email on open gmail:", err);
    }
  };

  const handleEmailMe = (e: React.MouseEvent) => {
    e.preventDefault();
    // Copy address to clipboard
    try {
      navigator.clipboard.writeText(emailAddress);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
    setEmailCopied(true);
    setShowEmailOptions(true);

    // Attempt mailto via anchor click
    try {
      const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent("Engineering Roles / Website Development")}`;
      const mailtoAnchor = document.createElement("a");
      mailtoAnchor.href = mailtoUrl;
      mailtoAnchor.rel = "noopener noreferrer";
      document.body.appendChild(mailtoAnchor);
      mailtoAnchor.click();
      document.body.removeChild(mailtoAnchor);
    } catch (err) {
      console.error("Mailto error:", err);
    }

    setTimeout(() => {
      setEmailCopied(false);
    }, 3500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="w-full flex flex-col justify-between py-2 sm:py-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-between gap-4 sm:gap-6"
      >
        {/* TOP ROW: Utilities & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[var(--border)] w-full">
          {/* Top-Left: Resume Download & Email Copy */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto"
          >
            {/* Resume Direct Download Button */}
            <a
              href="/resume.pdf"
              download="Harsh_Kumar_Resume.pdf"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all active:scale-95 cursor-pointer min-h-[36px]"
              title="Download Resume PDF"
            >
              <FiDownload className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Email Address with Copy Button */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-xs sm:text-sm font-mono text-[var(--text-body)] max-w-full min-h-[36px]">
              <span className="truncate max-w-[130px] xs:max-w-[190px] sm:max-w-none text-[11px] xs:text-xs sm:text-sm">
                {emailAddress}
              </span>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
                className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-0.5 rounded-full bg-[var(--bg-panel)] border border-[var(--border)] text-[10px] sm:text-[11px] font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all active:scale-95 cursor-pointer shrink-0"
              >
                {copied ? (
                  <>
                    <FiCheck className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <FiCopy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>

          {/* Top-Right: Social Outlinks */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center sm:justify-end gap-2.5 sm:gap-2.5 w-full sm:w-auto"
          >
            <a
              href="https://github.com/harshkumar1306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in a new tab)"
              className="w-9 h-9 sm:w-9 sm:h-9 min-w-[36px] min-h-[36px] rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#181717] hover:border-[var(--accent)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 shadow-sm"
            >
              <SiGithub className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/harsh-kumar-21b390257/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in a new tab)"
              className="w-9 h-9 sm:w-9 sm:h-9 min-w-[36px] min-h-[36px] rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#0A66C2] hover:border-[var(--accent)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 shadow-sm"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>

            <a
              href="https://x.com/Hardin1306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile (opens in a new tab)"
              className="w-9 h-9 sm:w-9 sm:h-9 min-w-[36px] min-h-[36px] rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#181717] hover:border-[var(--accent)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 shadow-sm"
            >
              <SiX className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* CENTER FOCAL AREA: Bookend Display Heading & Primary CTA */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-2.5 sm:py-6">
          {/* Eyebrow Label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-2 sm:mb-3"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase text-[var(--text-muted)]">
              // Get In Touch
            </span>
          </motion.div>

          {/* Bookend Display Headline */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[var(--text-primary)] uppercase leading-[1.02] sm:leading-[0.98] max-w-3xl"
          >
            Let&apos;s build something.
          </motion.h2>

          {/* Tagline Statement */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs xs:text-sm sm:text-base md:text-lg text-[var(--text-body)] mt-2 sm:mt-4 max-w-lg font-normal leading-relaxed"
          >
            Open to engineering roles and website development.
          </motion.p>

          {/* Centered CTA Button Pairing */}
          <motion.div
            variants={itemVariants}
            className="mt-4 sm:mt-7 flex flex-col items-center"
          >
            <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
              {/* Primary Email Button */}
              <button
                type="button"
                onClick={handleEmailMe}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[var(--accent)] text-white text-xs xs:text-sm sm:text-base font-medium shadow-sm hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-150 active:scale-95 cursor-pointer min-h-[44px]"
                title="Send email or copy address"
              >
                {emailCopied ? (
                  <>
                    <FiCheck className="w-4 h-4 text-white" />
                    <span>Email Copied!</span>
                  </>
                ) : (
                  <>
                    <FiMail className="w-4 h-4" />
                    <span>Email Me</span>
                  </>
                )}
              </button>

              {/* Secondary WhatsApp Button */}
              <a
                href="https://wa.me/917248132705"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-xs xs:text-sm sm:text-base font-medium hover:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-150 active:scale-95 cursor-pointer min-h-[44px]"
              >
                <SiWhatsapp className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Helper Fallback for Webmail users */}
            <AnimatePresence>
              {showEmailOptions && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.96 }}
                  className="mt-3 inline-flex flex-wrap items-center justify-center gap-1.5 xs:gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-panel)] border border-[var(--border)] text-[11px] xs:text-xs font-mono text-[var(--text-body)] shadow-sm text-center"
                >
                  <span className="text-emerald-600 font-medium flex items-center gap-1">
                    <FiCheck className="w-3.5 h-3.5 shrink-0" /> Address copied
                  </span>
                  <span className="text-[var(--text-muted)] hidden xs:inline">&bull;</span>
                  <a
                    href="https://mail.google.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleOpenGmail}
                    className="text-[var(--accent)] hover:underline font-medium inline-flex items-center gap-1"
                  >
                    <span>Open in Gmail</span>
                    <FiExternalLink className="w-3 h-3" />
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* BOTTOM FOOTER */}
        <motion.div
          variants={itemVariants}
          className="pt-2.5 sm:pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-2 text-center sm:text-left font-mono text-[11px] sm:text-xs text-[var(--text-muted)]"
        >
          <span>&copy; 2026 Harsh Kumar. All rights reserved.</span>
          <span className="tracking-wider">
            // DESIGN-FIRST &bull; SYSTEMS FIRST
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
