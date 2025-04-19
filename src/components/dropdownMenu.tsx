import { Fragment } from 'react';
import { VerticalDotsIcon } from "./icons.tsx";
import Dropdown from 'react-bootstrap/Dropdown';
import { Button } from "./button.tsx";
import { getInitials } from "../utils/utils.tsx";

interface DropdownMenuTwoProps {
  state: 'default' | 'disabled';
  customClassName?: string;
  toggleType: 'icon' | 'text' | 'avatar';
  buttonToggleTypeOption?:
    | 'accent'
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'ghostSecondary'
    | 'destructive';
  avatarToggleTypeOptions?: 'present' | 'not present';
  avatar?: string;
  icon?: React.ReactNode;
  toggleSize: 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
}

export function DropdownMenu({
  customClassName,
  state,
  toggleType,
  avatarToggleTypeOptions,
  buttonToggleTypeOption,
  avatar,
  icon,
  toggleSize,
  children
}: DropdownMenuTwoProps) {
  return (
    <Dropdown bsPrefix="mcMenuDropdown" className={customClassName ?? ''}>
      {state === 'disabled' && (
        <Button
          hasIcon="leading"
          icon={icon && icon}
          size={toggleSize}
          state="disabled"
          type="accent"
          isSubmit={false}
          value=""
        />
      )}
      {state !== 'disabled' && (
        <Dropdown.Toggle
          id="dropdown-autoclose-outside"
          className={`mcBtn
                      button
                      ${toggleType === 'icon' ? 'iconOnly' : ''}
                      size-${toggleSize}
                      state-${state}
                      toggleType-${toggleType}
                      type-${buttonToggleTypeOption}
                      hasIcon-leading
                    `}
        >
          {toggleType === 'text' && 'Menu toggle'}
          {toggleType === 'icon' && (
            <div className="showInfo iconOnly">
              {icon && icon}
              {!icon && <VerticalDotsIcon className={`size-${toggleSize}`} />}
            </div>
          )}
          {toggleType === 'avatar' && (
            <Fragment>
              {(avatarToggleTypeOptions === 'not present') && (
                <span className="avatar-placeholderInitials">{getInitials(avatar ?? 'A A')}</span>
              )}
            </Fragment>
          )}
        </Dropdown.Toggle>
      )}

      {children && children}
    </Dropdown>
  );
}
