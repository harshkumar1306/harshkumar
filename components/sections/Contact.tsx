"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiCopy, FiCheck, FiMail } from "react-icons/fi";
import { SiGithub, SiWhatsapp, SiX } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "3000harshkumar@gmail.com";

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
    <div className="w-full h-full min-h-[calc(100vh-4rem)] flex flex-col justify-between py-2 sm:py-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-6xl mx-auto flex-1 flex flex-col justify-between gap-4 sm:gap-6"
      >
        {/* TOP ROW: Utilities & Socials */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 sm:pb-4 border-b border-[var(--border)]">
          {/* Top-Left: Resume Download & Email Copy */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-2 sm:gap-3"
          >
            {/* Resume Direct Download Button */}
            <a
              href="/resume.pdf"
              download="Harsh_Kumar_Resume.pdf"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent)] text-white text-xs sm:text-sm font-medium tracking-wide shadow-sm hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all active:scale-95 cursor-pointer"
              title="Download Resume PDF"
            >
              <FiDownload className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>

            {/* Email Address with Copy Button */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-xs sm:text-sm font-mono text-[var(--text-body)]">
              <span className="truncate max-w-[190px] xs:max-w-none">
                {emailAddress}
              </span>
              <button
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--bg-panel)] border border-[var(--border)] text-[11px] font-mono font-medium text-[var(--text-primary)] hover:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all active:scale-95 cursor-pointer shrink-0"
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
            className="flex items-center gap-2.5 self-start sm:self-auto"
          >
            <a
              href="https://github.com/harshkumar1306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (opens in a new tab)"
              className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#181717] hover:border-[var(--accent)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 shadow-sm"
            >
              <SiGithub className="w-4 h-4" />
            </a>

            <a
              href="https://www.linkedin.com/in/harsh-kumar-21b390257/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (opens in a new tab)"
              className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#0A66C2] hover:border-[var(--accent)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 shadow-sm"
            >
              <FaLinkedinIn className="w-4 h-4" />
            </a>

            <a
              href="https://x.com/Hardin1306"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X Profile (opens in a new tab)"
              className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#181717] hover:border-[var(--accent)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 shadow-sm"
            >
              <SiX className="w-3.5 h-3.5" />
            </a>

            <a
              href="https://wa.me/917248132705"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp (opens in a new tab)"
              className="w-9 h-9 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] flex items-center justify-center text-[#25D366] hover:border-[var(--accent)] hover:scale-110 focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-200 shadow-sm"
            >
              <SiWhatsapp className="w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* CENTER FOCAL AREA: Bookend Display Heading & Primary CTA */}
        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto py-3 sm:py-6">
          {/* Eyebrow Label */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-2 mb-2 sm:mb-3"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.22em] uppercase text-[var(--text-muted)]">
              // 05. Get In Touch
            </span>
          </motion.div>

          {/* Bookend Display Headline */}
          <motion.h2
            variants={itemVariants}
            className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-[var(--text-primary)] uppercase leading-[0.98] max-w-3xl"
          >
            Let&apos;s build something.
          </motion.h2>

          {/* Tagline Statement */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sm sm:text-base md:text-lg text-[var(--text-body)] mt-3 sm:mt-4 max-w-lg font-normal leading-relaxed"
          >
            Open to full-stack and AI engineering roles.
          </motion.p>

          {/* Centered CTA Button Pairing */}
          <motion.div
            variants={itemVariants}
            className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {/* Primary Email Button */}
            <a
              href="mailto:3000harshkumar@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--accent)] text-white text-sm sm:text-base font-medium shadow-sm hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <FiMail className="w-4 h-4" />
              <span>Email Me</span>
            </a>

            {/* Secondary WhatsApp Button */}
            <a
              href="https://wa.me/917248132705"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] text-[var(--text-primary)] text-sm sm:text-base font-medium hover:border-[var(--accent)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none transition-all duration-150 active:scale-95 cursor-pointer"
            >
              <SiWhatsapp className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>
          </motion.div>
        </div>

        {/* BOTTOM FOOTER */}
        <motion.div
          variants={itemVariants}
          className="pt-3 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left font-mono text-xs text-[var(--text-muted)]"
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
