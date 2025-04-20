import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';

interface ButtonProps {
  value: any; // string;
  type: 'accent' | 'primary' | 'secondary' | 'ghost' | 'ghostSecondary' | 'destructive';
  size: 'sm' | 'md' | 'lg' | 'xl';
  state: 'default' | 'hover' | 'focus' | 'disabled';
  hasIcon: 'noIcon' | 'leading' | 'trailing';
  isSubmit: boolean;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  value,
  className,
  isSubmit,
  icon,
  type,
  size,
  state,
  hasIcon,
  onClick
}: ButtonProps) {
  return (
    <BootstrapButton
      bsPrefix="mcBtn"
      className={`button
        ${className ? className : ''}
        ${'size-' + size}
        ${size === 'sm' ? 'bodyXSmallEmp' : ''}
        ${size === 'md' ? 'bodySmallEmp' : ''}
        ${size === 'lg' ? 'bodyMedEmp' : ''}
        ${size === 'xl' ? 'bodyMedEmp' : ''}
        ${value !== '' ? 'iconWithValue' : 'iconOnly'}
        ${'state-' + state}
        ${'type-' + type}
        ${'hasIcon-' + hasIcon}
      `}
      type={isSubmit ? 'submit' : 'button'}
      onClick={onClick}
    >
      {hasIcon !== 'noIcon' && (
        <div
          className={`showInfo
            ${value === '' ? 'iconOnly' : ''}
         `}
        >
          {icon}
        </div>
      )}
      {value !== '' && value}
    </BootstrapButton>
  );
}
