'use client'
import clsx from 'clsx';
import { useFormStatus } from 'react-dom'

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
};
  
export function Button({ children, onClick, type, disabled }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className={clsx(
        "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs",
        { "opacity-50": disabled }
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function SubmitButton({ children }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>{children}</Button>
  );
}