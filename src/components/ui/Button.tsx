import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 cursor-pointer tracking-wide';

  const variants = {
    primary: 'bg-gradient-to-r from-gold via-amber-500 to-gold text-dark-900 hover:shadow-lg hover:shadow-gold/30 hover:scale-[1.02] active:scale-[0.98]',
    outline: 'border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50 hover:scale-[1.02] active:scale-[0.98]',
    ghost: 'text-gray-400 hover:text-gold hover:bg-gold/5',
  };

  const sizes = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-sm',
    lg: 'px-9 py-4 text-base',
  };

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
