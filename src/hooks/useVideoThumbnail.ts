"use client";

import { useState, useEffect } from "react";
import { Media } from "@/app/generated/prisma/client";

/**
 * Custom hook to generate a thumbnail from a video file.
 *
 * This hook creates a hidden video element, seeks to a specific time,
 * and draws the frame onto a canvas to produce a base64 image string.
 *
 * @param videoUrl - The filename or relative path of the video (e.g., from the Media model).
 * @returns An object containing:
 *  - `thumbnail`: The base64 data URL of the generated thumbnail image.
 *  - `loading`: A boolean indicating if the thumbnail is currently being generated.
 */
export const useVideoThumbnail = (videoUrl: Media["video"]) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoUrl) return;

    setLoading(true);

    // Create a video element programmatically to capture the frame
    const video = document.createElement("video");

    // Set crossOrigin to anonymous to prevent tainted canvas issues
    // when drawing the video frame onto the canvas.
    video.crossOrigin = "anonymous";

    // Append a timestamp to the URL to bypass browser caching.
    // This ensures the 'loadeddata' event fires reliably.
    video.src = `/content/${videoUrl}?t=${Date.now()}`;
    video.muted = true;
    video.playsInline = true;
    // Load metadata to know dimensions and duration, but don't download the whole file yet
    video.preload = "metadata";
    // Seek to the 1-second mark to avoid capturing a potential black frame at 0s
    video.currentTime = 1;

    const generateThumbnail = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      // Draw the current video frame onto the canvas
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to a JPEG data URL
      setThumbnail(canvas.toDataURL("image/jpeg"));
      setLoading(false);
      // Clean up the video element
      video.remove();
    };

    // Listen for when the video has loaded enough data to render the frame at currentTime
    video.addEventListener("loadeddata", generateThumbnail);

    return () => {
      video.removeEventListener("loadeddata", generateThumbnail);
      setLoading(false);
    };
  }, [videoUrl]);

  return { thumbnail, loading };
};
