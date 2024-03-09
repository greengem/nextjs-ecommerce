'use client'
import clsx from 'clsx';
import { useFormStatus } from 'react-dom'

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    isIconOnly?: boolean;
};
  
export function Button({ children, onClick, type, disabled, isIconOnly }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className={clsx(
        "bg-neutral-100 hover:bg-neutral-400 text-black font-bold py-2 rounded text-xs ring-1 ring-neutral-500",
        { "opacity-50": disabled, "px-2": isIconOnly, "px-4": !isIconOnly }
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