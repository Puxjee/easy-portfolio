// Hook types and interfaces

// Resizable hook types
export interface UseResizableProps {
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  onResize?: (width: number) => void;
}

export interface UseResizableReturn {
  width: number;
  isResizing: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  setWidth: (width: number) => void;
}

// Generic hook return types
export interface UseToggleReturn {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T | ((prev: T) => T)) => void;
  removeValue: () => void;
}

// Event handler types
export type MouseEventHandler = (e: React.MouseEvent) => void;
export type KeyboardEventHandler = (e: React.KeyboardEvent) => void;
export type ChangeEventHandler = (
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;
export type FormEventHandler = (e: React.FormEvent) => void;
