"use client";

import { useState, useEffect } from "react";
import { Media } from "@/app/generated/prisma/client";

export const useVideoThumbnail = (videoUrl: Media["video"]) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!videoUrl) return;

    setLoading(true);

    const video = document.createElement("video");

    video.crossOrigin = "anonymous";
    video.src = `/content/${videoUrl}?t=${Date.now()}`;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.currentTime = 1;

    const generateThumbnail = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      setThumbnail(canvas.toDataURL("image/jpeg"));
      setLoading(false);
      video.remove();
    };

    video.addEventListener("loadeddata", generateThumbnail);

    return () => {
      video.removeEventListener("loadeddata", generateThumbnail);
      setLoading(false);
    };
  }, [videoUrl]);

  return { thumbnail, loading };
};
