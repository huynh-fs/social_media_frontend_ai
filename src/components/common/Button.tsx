import React from 'react';
import { cva, VariantProps } from 'class-variance-authority';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' | 'danger';
	size?: 'sm' | 'md' | 'lg';
	isLoading?: boolean;
	children: React.ReactNode;
}

const buttonStyles = cva(
	'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
	{
		variants: {
			variant: {
				primary: 'bg-blue-600 text-white hover:bg-blue-700',
				secondary: 'bg-transparent border border-gray-300 text-black hover:bg-gray-100',
				danger: 'bg-red-600 text-white hover:bg-red-700',
			},
			size: {
				sm: 'px-3 py-1 text-sm',
				md: 'px-4 py-2 text-base',
				lg: 'px-6 py-3 text-lg',
			},
			isLoading: {
				true: 'cursor-not-allowed opacity-70',
				false: '',
			},
		},
		defaultVariants: {
			variant: 'primary',
			size: 'md',
			isLoading: false,
		},
	}
);

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	size = 'md',
	isLoading = false,
	children,
	className,
	...rest
}) => {
	return (
		<button
			className={buttonStyles({ variant, size, isLoading, className })}
			disabled={isLoading || rest.disabled}
			{...rest}
		>
			{isLoading && (
				<span className="mr-2">
					{/* Spinner placeholder, replace with Spinner component if available */}
					<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
					</svg>
				</span>
			)}
			{children}
		</button>
	);
};
