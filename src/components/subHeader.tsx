import { Tooltip } from './tooltip';

interface SubHeaderProps {
  value: string;
  showInfo: boolean;
  tooltipPlacement:
    | 'auto-start'
    | 'auto'
    | 'auto-end'
    | 'top-start'
    | 'top'
    | 'top-end'
    | 'right-start'
    | 'right'
    | 'right-end'
    | 'bottom-end'
    | 'bottom'
    | 'bottom-start'
    | 'left-end'
    | 'left'
    | 'left-start';
  tooltipContent: string;
}

export function SubHeader({ value, showInfo, tooltipPlacement, tooltipContent }: SubHeaderProps) {
  return (
    <div className={'subHeader bodySmallEmp'}>
      {value}
      {showInfo && (
        <div className={'showInfo'}>
          <Tooltip placement={tooltipPlacement} data={tooltipContent} />
        </div>
      )}
    </div>
  );
}
