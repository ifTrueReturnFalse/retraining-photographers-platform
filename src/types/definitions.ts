/**
 * @file Type Definitions File
 * @description This file contains global type definitions used across the application.
 */

/**
 * @interface SelectOption
 * @description Represents an option for a select input element.
 */
export interface SelectOption {
  /** The human-readable label displayed to the user. */
  label: string;
  /** The underlying value associated with the option. */
  value: string;
}

/**
 * @interface ModalProps
 * @description Defines the common properties for a modal component.
 */
export interface ModalProps {
  /** Indicates whether the modal is currently open or closed. */
  isOpen: boolean
  /** A callback function to be executed when the modal is requested to close. */
  onClose: () => void
}

/** @typedef {-1 | 1} IndexModifier
 * @description A type representing a modifier for an index, used for navigation (e.g., previous/next).
 * `1` to increment or `-1` to decrement.
 */
export type IndexModifier = -1 | 1;