interface VideoProps {
  src: string;
}

export function Video({ src }: VideoProps) {
  return (
    <video width={350} height={300} controls preload="">
      <source src={src} type="video/mp4" />
      Le navigateur ne supporte pas les vidéos.
    </video>
  );
}
