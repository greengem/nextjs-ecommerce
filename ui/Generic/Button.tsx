'use client'
import { useFormStatus } from 'react-dom'

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
};
  
export function Button({ children, onClick, type }: ButtonProps) {
  return (
    <button
      type={type || "button"}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function SubmitButton({ children }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" aria-disabled={pending}>{children}</Button>
  );
}