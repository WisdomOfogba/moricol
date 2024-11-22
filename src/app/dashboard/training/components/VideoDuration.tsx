import { useEffect, useState } from "react";

type VideoDurationProps = {
  videoUrl: string; // URL or path to the video file
};

const VideoDuration: React.FC<VideoDurationProps> = ({ videoUrl }) => {
  const [duration, setDuration] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDuration = async () => {
      try {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.preload = "metadata";

        video.onloadedmetadata = () => {
          const totalSeconds = Math.floor(video.duration);
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;
          setDuration(`${minutes}:${seconds.toString().padStart(2, "0")}`);
        };

        // video.onerror = () => {
        //   throw new Error("Failed to load video metadata.");
        // };
      } catch (error) {
        console.error("Error fetching video duration:", error);
        setDuration("Error");
      }
    };

    fetchVideoDuration();
  }, [videoUrl]);

  return (
      <p>{duration && duration !== "Error" ? `${duration}` : ""}</p>
  );
};

export default VideoDuration;
