import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
}

export const Button = ({ children, variant = 'primary', className = "", ...props }: ButtonProps) => {
  const base = "px-6 py-3 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md flex items-center gap-2 justify-center";
  const variants = {
    primary: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:shadow-lg focus-visible:ring-offset-white",
    secondary: "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:shadow-lg focus-visible:ring-offset-white",
    outline: "border-2 border-slate-200 text-slate-600 hover:bg-slate-50 focus-visible:ring-offset-white"
  };
  return <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>;
};
