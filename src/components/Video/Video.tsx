interface VideoProps {
  src: string;
  className?: string;
}

export function Video({ src, className }: VideoProps) {
  return (
    <video width={1080} height={1920} controls autoPlay className={className}>
      <source src={src} type="video/mp4" />
      Le navigateur ne supporte pas les vidéos.
    </video>
  );
}
