
import ReactPlayer from "react-player";

const VideoPlayer = ({ videoUrl }: {  videoUrl?: string;}) => {
  return (
    <div>
      <ReactPlayer url={videoUrl} controls width="100%" height="500px" />
    </div>
  );
};

export default VideoPlayer;
