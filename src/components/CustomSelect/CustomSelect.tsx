"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import styles from "./CustomSelect.module.css";
import { SelectOption } from "@/types/definitions";

/**
 * Props for the CustomSelect component.
 */
interface CustomSelectProps {
  /** Optional CSS class names to apply to the container. */
  className?: string;
  /** List of options to display in the select menu. */
  options: SelectOption[];
}

/**
 * A custom select component that synchronizes its state with the URL query parameters.
 * It allows sorting or filtering based on the provided options.
 *
 * @param props - The component props.
 * @param props.className - Optional class name for styling.
 * @param props.options - Array of options available for selection.
 * @returns The rendered custom select component.
 */
export function CustomSelect({ className, options }: CustomSelectProps) {
  // Next.js navigation hooks for URL manipulation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize selection based on URL 'sort' param or default to the first option
  const currentSortValue = searchParams.get("sort") || options[0].value;
  const initialOption =
    options.find((option) => option.value == currentSortValue) || options[0];

  // State to manage the visibility of the options list
  const [isOpen, setIsOpen] = useState(false);
  // State to track the currently selected option
  const [selected, setSelected] = useState(initialOption);
  // Ref for the container element, used to detect clicks outside the component
  const containerRef = useRef<HTMLDivElement>(null);
  // Ref for the button element, used to manage focus
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Filter out the currently selected option from the list to avoid duplication in the dropdown
  const nonSelectedOptions = options.filter(
    (option) => option.value != selected.value
  );

  /**
   * Effect to handle clicks outside the component.
   * Closes the dropdown if a click occurs outside the containerRef.
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Handles the selection of an option.
   * Updates local state, closes the dropdown, and updates the URL query parameter.
   *
   * @param option - The selected option object.
   */
  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    setIsOpen(false);

    // Create a new URLSearchParams object to avoid mutating the original read-only params
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", option.value);
    // Push the new URL with the updated sort parameter, disabling scroll to top
    router.push(`${pathname}?${params.toString()}`, {scroll: false});
  };

  /**
   * Handles clicks on the label.
   * Focuses the button and toggles the dropdown visibility.
   */
  const handleLabelClick = () => {
    buttonRef.current?.focus();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      <label
        onClick={handleLabelClick}
        className={styles.label}
        id="label-sort"
      >
        Trier par
      </label>

      <div
        className={`${styles.selectContainer} ${
          isOpen ? styles.openSelect : ""
        }`}
        aria-label="Order by"
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          ref={buttonRef}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby="label-sort"
          className={styles.button}
        >
          {selected.label}
          <svg
            className={`${styles.customArrow} ${
              isOpen ? styles.arrowOpen : ""
            }`}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                fill="#fff"
              ></path>
            </g>
          </svg>
        </button>

        {isOpen && (
          <ul role="listbox" className={styles.optionsList}>
            {nonSelectedOptions.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={false}
                onClick={() => handleSelect(option)}
                className={styles.option}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
