"use client";

import { useEffect } from "react";

export function ResumeOverride() {
  const handleDownload = () => {
    // Replace this string with your actual Google Drive PDF link
    const driveLink = "https://drive.google.com/file/d/1NKXxL9-klq0G05ACii1Ic0EqWIknW_o_/view?usp=drive_link";
    
    // Automatically convert a standard Google Drive viewing link into a direct download link
    const fileIdMatch = driveLink.match(/\/d\/(.*?)\//);
    
    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      const directDownloadLink = `https://drive.google.com/uc?export=download&id=${fileId}`;
      
      // Create a temporary anchor tag to trigger the silent download
      const a = document.createElement("a");
      a.href = directDownloadLink;
      a.download = "Swayam_Patel_Resume.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Fallback just in case you use a different hosting provider
      window.open(driveLink, "_blank");
    }
  };

  // Listener for typing "cv" or "resume"
  useEffect(() => {
    let buffer = "";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target as HTMLElement).isContentEditable
      )
        return;

      buffer += e.key.toLowerCase();
      if (buffer.length > 10) buffer = buffer.slice(-6);

      if (buffer.endsWith("resume") || buffer.endsWith("cv")) {
        handleDownload(); // Trigger download directly
        buffer = ""; // Reset buffer
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Listener for clicking the CV button
  useEffect(() => {
    const handleOpenResume = () => {
      handleDownload(); // Trigger download directly
    };
    
    window.addEventListener("open-resume", handleOpenResume);
    return () => window.removeEventListener("open-resume", handleOpenResume);
  }, []);

  // Return null because there is no longer a visual preview box to render
  return null;
}