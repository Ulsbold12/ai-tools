export const BackgroundVideo = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="h-full w-full object-cover">
        <source src="/videos/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50" />
    </div>
  );
};
