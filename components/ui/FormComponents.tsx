import React, { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

// Base form field props
export interface BaseFieldProps {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
  hintClassName?: string;
}

// Input variants and sizes
export type InputVariant = 'default' | 'filled' | 'outlined';
export type InputSize = 'sm' | 'md' | 'lg';

// Input component props
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'required' | 'className'>, BaseFieldProps {
  variant?: InputVariant;
  size?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
}

// Textarea component props
export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'required' | 'className'>, BaseFieldProps {
  variant?: InputVariant;
  size?: InputSize;
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

// Select component props
export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'required' | 'className'>, BaseFieldProps {
  variant?: InputVariant;
  size?: InputSize;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
}

// Checkbox component props
export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'required' | 'className'>, BaseFieldProps {
  size?: InputSize;
}

// Radio component props
export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size' | 'required' | 'className'>, BaseFieldProps {
  size?: InputSize;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
}

// Style mappings
const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const variantStyles = {
  default: 'border border-gray-300 bg-white focus:border-red-500 focus:ring-red-500',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-red-500',
  outlined: 'border-2 border-gray-300 bg-transparent focus:border-red-500',
};

const baseInputStyles = 'w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-1 disabled:opacity-50 disabled:cursor-not-allowed';

// Field Label Component
const FieldLabel: React.FC<{
  htmlFor?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}> = ({ htmlFor, required, className, children }) => (
  <label
    htmlFor={htmlFor}
    className={cn('block text-sm font-medium text-gray-700 mb-1', className)}
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

// Field Error Component
const FieldError: React.FC<{
  error?: string;
  className?: string;
}> = ({ error, className }) => {
  if (!error) return null;

  return (
    <p className={cn('mt-1 text-sm text-red-600', className)}>
      {error}
    </p>
  );
};

// Field Hint Component
const FieldHint: React.FC<{
  hint?: string;
  className?: string;
}> = ({ hint, className }) => {
  if (!hint) return null;

  return (
    <p className={cn('mt-1 text-sm text-gray-500', className)}>
      {hint}
    </p>
  );
};

// Input Component
export const Input = forwardRef<HTMLInputElement, InputProps>((
  {
    label,
    error,
    hint,
    required,
    className,
    labelClassName,
    errorClassName,
    hintClassName,
    variant = 'default',
    size = 'md',
    leftIcon,
    rightIcon,
    loading,
    id,
    ...props
  },
  ref
) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const inputClasses = cn(
    baseInputStyles,
    sizeStyles[size],
    variantStyles[variant],
    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    leftIcon && 'pl-10',
    rightIcon && 'pr-10',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <FieldLabel
          htmlFor={inputId}
          {...(required !== undefined && { required })}
          {...(labelClassName && { className: labelClassName })}
        >
          {label}
        </FieldLabel>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="text-gray-400">{leftIcon}</div>
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          className={inputClasses}
          {...props}
        />

        {(rightIcon || loading) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-red-600" />
            ) : (
              <div className="text-gray-400">{rightIcon}</div>
            )}
          </div>
        )}
      </div>

      {error && <FieldError error={error} {...(errorClassName && { className: errorClassName })} />}
      {hint && <FieldHint hint={hint} {...(hintClassName && { className: hintClassName })} />}
    </div>
  );
});

Input.displayName = 'Input';

// Textarea Component
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((
  {
    label,
    error,
    hint,
    required,
    className,
    labelClassName,
    errorClassName,
    hintClassName,
    variant = 'default',
    size = 'md',
    resize = 'vertical',
    id,
    ...props
  },
  ref
) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const resizeClasses = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  };
  
  const textareaClasses = cn(
    baseInputStyles,
    sizeStyles[size],
    variantStyles[variant],
    resizeClasses[resize],
    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <FieldLabel
          htmlFor={textareaId}
          {...(required !== undefined && { required })}
          {...(labelClassName && { className: labelClassName })}
        >
          {label}
        </FieldLabel>
      )}

      <textarea
        ref={ref}
        id={textareaId}
        className={textareaClasses}
        {...props}
      />

      {error && <FieldError error={error} {...(errorClassName && { className: errorClassName })} />}
      {hint && <FieldHint hint={hint} {...(hintClassName && { className: hintClassName })} />}
    </div>
  );
});

Textarea.displayName = 'Textarea';

// Select Component
export const Select = forwardRef<HTMLSelectElement, SelectProps>((
  {
    label,
    error,
    hint,
    required,
    className,
    labelClassName,
    errorClassName,
    hintClassName,
    variant = 'default',
    size = 'md',
    options,
    placeholder,
    id,
    ...props
  },
  ref
) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const selectClasses = cn(
    baseInputStyles,
    sizeStyles[size],
    variantStyles[variant],
    hasError && 'border-red-500 focus:border-red-500 focus:ring-red-500',
    'pr-10 appearance-none bg-no-repeat bg-right',
    className
  );

  return (
    <div className="w-full">
      {label && (
        <FieldLabel
          htmlFor={selectId}
          {...(required !== undefined && { required })}
          {...(labelClassName && { className: labelClassName })}
        >
          {label}
        </FieldLabel>
      )}

      <div className="relative">
        <select
          ref={ref}
          id={selectId}
          className={selectClasses}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {error && <FieldError error={error} {...(errorClassName && { className: errorClassName })} />}
      {hint && <FieldHint hint={hint} {...(hintClassName && { className: hintClassName })} />}
    </div>
  );
});

Select.displayName = 'Select';

// Checkbox Component
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((
  {
    label,
    error,
    hint,
    required,
    className,
    labelClassName,
    errorClassName,
    hintClassName,
    size = 'md',
    id,
    ...props
  },
  ref
) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = !!error;
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const checkboxClasses = cn(
    'rounded border-gray-300 text-red-600 focus:ring-red-500',
    sizeClasses[size],
    hasError && 'border-red-500',
    className
  );

  return (
    <div className="w-full">
      <div className="flex items-start">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={checkboxClasses}
          {...props}
        />
        
        {label && (
          <div className="ml-2 flex-1">
            <FieldLabel
              htmlFor={checkboxId}
              {...(required !== undefined && { required })}
              className={cn('mb-0', labelClassName)}
            >
              {label}
            </FieldLabel>
          </div>
        )}
      </div>

      {error && <FieldError error={error} {...(errorClassName && { className: errorClassName })} />}
      {hint && <FieldHint hint={hint} {...(hintClassName && { className: hintClassName })} />}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

// Radio Group Component
export const RadioGroup: React.FC<RadioProps> = ({
  label,
  error,
  hint,
  required,
  className,
  labelClassName,
  errorClassName,
  hintClassName,
  size = 'md',
  options,
  name,
  value,
  onChange,
  ...props
}) => {
  const hasError = !!error;
  
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };
  
  const radioClasses = cn(
    'border-gray-300 text-red-600 focus:ring-red-500',
    sizeClasses[size],
    hasError && 'border-red-500'
  );

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <FieldLabel
          {...(required !== undefined && { required })}
          {...(labelClassName && { className: labelClassName })}
        >
          {label}
        </FieldLabel>
      )}

      <div className="space-y-2">
        {options.map((option) => {
          const radioId = `${name}-${option.value}`;

          return (
            <div key={option.value} className="flex items-center">
              <input
                type="radio"
                id={radioId}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                disabled={option.disabled}
                className={radioClasses}
                {...props}
              />
              <label
                htmlFor={radioId}
                className={cn(
                  'ml-2 text-sm text-gray-700',
                  option.disabled && 'opacity-50 cursor-not-allowed'
                )}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      {error && <FieldError error={error} {...(errorClassName && { className: errorClassName })} />}
      {hint && <FieldHint hint={hint} {...(hintClassName && { className: hintClassName })} />}
    </div>
  );
};

// Form Group Component
export const FormGroup: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn('space-y-4', className)}>
    {children}
  </div>
);

// Form Actions Component
export const FormActions: React.FC<{
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}> = ({ children, className, align = 'right' }) => {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  };
  
  return (
    <div className={cn('flex gap-3 pt-4', alignClasses[align], className)}>
      {children}
    </div>
  );
};

export default {
  Input,
  Textarea,
  Select,
  Checkbox,
  RadioGroup,
  FormGroup,
  FormActions,
};