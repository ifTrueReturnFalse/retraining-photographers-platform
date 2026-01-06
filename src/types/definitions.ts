// Types definitions file

export interface SelectOption {
  label: string;
  value: string;
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export type IndexModifier = -1 | 1;