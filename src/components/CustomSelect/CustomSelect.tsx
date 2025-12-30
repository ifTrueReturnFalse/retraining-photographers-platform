"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./CustomSelect.module.css";
import { SelectOption } from "@/types/definitions";

interface CustomSelectProps {
  className?: string;
  options: SelectOption[]
}

export function CustomSelect({ className, options }: CustomSelectProps) {
  // Handle options opening
  const [isOpen, setIsOpen] = useState(false);
  // Keep the current option
  const [selected, setSelected] = useState(options[0]);
  // Reference to the all div, to check later outside clicks
  const containerRef = useRef<HTMLDivElement>(null);
  // Reference to the button opening the options list
  const buttonRef = useRef<HTMLButtonElement>(null);
  // Filter the available options
  const nonSelectedOptions = options.filter(
    (option) => option.value != selected.value
  );

  // Checks oustide clicks
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

  // Change the selected option and close the list
  const handleSelect = (option: SelectOption) => {
    setSelected(option);
    setIsOpen(false);
  };

  // Simulate the html for functionnality
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

      <div className={`${styles.selectContainer} ${isOpen ? styles.openSelect : ''}`} aria-label="Order by">
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
