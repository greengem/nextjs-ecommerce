'use client'
import { cn } from '@/lib/utils';
import { useFormStatus } from 'react-dom'
import { Button } from "@radix-ui/themes";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    isIconOnly?: boolean;
    className?: string;
};

export function SubmitButton({ children }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending}>{children}</Button>
  );
}