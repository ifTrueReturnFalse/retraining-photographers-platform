/**
 * Props for the Video component.
 */
interface VideoProps {
  /** The source URL of the video file. */
  src: string;
  /** Optional CSS class names to apply to the video element. */
  className?: string;
}

/**
 * Video component.
 *
 * Renders a native HTML5 video player with controls and autoplay enabled.
 * It includes a fallback message for browsers that do not support the video tag.
 *
 * @param {VideoProps} props - The props for the component.
 * @returns {JSX.Element} The rendered video element.
 */
export function Video({ src, className }: VideoProps) {
  return (
    // Render video with fixed dimensions (1920x1080), controls, and autoplay
    <video width={1080} height={1920} controls autoPlay className={className}>
      <source src={src} type="video/mp4" />
      {/* Fallback text for unsupported browsers */}
      Le navigateur ne supporte pas les vidéos.
    </video>
  );
}
