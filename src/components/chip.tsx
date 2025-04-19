import React from 'react';

interface ChipProps {
  value: string;
  style: 'fill' | 'border';
  size: 'sm' | 'md';
  state: 'default' | 'active' | 'disabled';
  showCount: boolean;
  countValue?: number;
  icon?: React.ReactNode;
  hasIcon?: 'noIcon' | 'leading' | 'trailing';
  onClickFn?: () => void;
}

export function Chip({
  value,
  icon,
  style,
  showCount,
  countValue,
  size,
  state,
  hasIcon,
  onClickFn
}: ChipProps) {
  if (onClickFn) {
    const handleClick = (e: React.MouseEvent) => {
      // Prevent event from bubbling up
      e.stopPropagation();

      // Only call onClickFn if it exists
      if (onClickFn) {
        onClickFn();
      }
    };

    return (
      <div
        className={`chip
        ${'hasIcon-' + hasIcon}
        ${'showCount-' + showCount}
        ${'size-' + size}
        ${size === 'sm' ? 'bodyXSmallEmp' : 'bodySmallEmp'}
        ${'state-' + state}
        ${'style-' + style}`}
        onClick={handleClick}
        // onClick={onClickFn}
      >
        {hasIcon !== 'noIcon' && <div className={'showInfo'}>{icon}</div>}
        {value}
        {showCount && <div className={'showCountInfo label'}>{countValue}</div>}
      </div>
    );
  } else {
    return (
      <div
        className={`chip
        ${'hasIcon-' + hasIcon}
        ${'showCount-' + showCount}
        ${'size-' + size}
        ${size === 'sm' ? 'bodyXSmallEmp' : 'bodySmallEmp'}
        ${'state-' + state}
        ${'style-' + style}`}
      >
        {hasIcon !== 'noIcon' && <div className={'showInfo'}>{icon}</div>}
        {value}
        {showCount && <div className={'showCountInfo label'}>{countValue}</div>}
      </div>
    );
  }
}
