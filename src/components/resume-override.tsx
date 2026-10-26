"use client";

import { useEffect } from "react";

export function ResumeOverride() {
  const handleDownload = () => {
    const driveLink = "https://drive.google.com/drive/folders/1ObplkBI68RhaXJcWjxY4sDdxKi8M3irI_o_/view?usp=drive_link";
    
    // Check if it's a direct file or folder link
    const fileIdMatch = driveLink.match(/\/d\/(.*?)(?:\/|\?|$)/);
    const folderIdMatch = driveLink.match(/\/folders\/(.*?)(?:\/|\?|$)/);

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
    } else if (folderIdMatch && folderIdMatch[1]) {
      // If it's a folder, open it directly so the user can access/download files inside
      window.open(driveLink, "_blank");
    } else {
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