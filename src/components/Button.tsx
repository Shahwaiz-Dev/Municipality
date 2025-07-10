import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: ReactNode;
  className?: string;
}

export default function Button({ href, children, className = '', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold uppercase tracking-wider transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary bg-bg-dark text-text-light hover:bg-accent active:bg-bg-dark';

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button className={`${base} ${className}`} {...props}>
      {children}
    </button>
  );
} 