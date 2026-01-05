import styles from "./BaseButton.module.css";

interface BaseButtonProps {
  buttonText: string;
  onClick?: () => void;
  className?: string;
}

export function BaseButton({
  buttonText,
  onClick = () => {},
  className,
}: BaseButtonProps) {
  return (
    <>
      <button
        onClick={() => onClick()}
        className={`${styles.button} ${className}`}
      >
        {buttonText}
      </button>
    </>
  );
}
