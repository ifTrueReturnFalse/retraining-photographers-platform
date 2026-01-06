import styles from "./BaseButton.module.css";

/**
 * Interface for the BaseButton component props.
 */
interface BaseButtonProps {
  /** The text to display inside the button. */
  buttonText: string;
  /**
   * Optional click handler.
   * Defaults to a no-op function if not provided.
   */
  onClick?: () => void;
  /** Optional additional CSS class names to apply to the button. */
  className?: string;
}

/**
 * BaseButton component.
 *
 * Renders a button with default styles defined in the CSS module.
 * Allows extending styles via the `className` prop.
 *
 * @param {BaseButtonProps} props - The component props.
 * @returns {JSX.Element} The rendered button component.
 */
export function BaseButton({
  buttonText,
  onClick = () => {},
  className,
}: BaseButtonProps) {
  return (
    <>
      <button
        // Wrapper function to ensure the click handler is called correctly
        onClick={() => onClick()}
        // Concatenate the module class with any external classes provided
        className={`${styles.button} ${className}`}
      >
        {buttonText}
      </button>
    </>
  );
}
