import Popover from 'react-bootstrap/Popover';
import { OverlayTrigger } from 'react-bootstrap';

export function ButtonTooltip({
  placement,
  data,
  type,
  children
}: {
  placement:
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
  data: string;
  type?: string;
  children: any;
}) {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement={placement}
      overlay={
        <Popover
          className={`popover ${type ? type : 'genericPopover'}`}
          id={`popover-positioned-${placement}`}
        >
          <Popover.Body as="div" className="popoverBody micro">
            {data}
          </Popover.Body>
        </Popover>
      }
    >
      <span className="tooltip menuItemContainer">{children}</span>
    </OverlayTrigger>
  );
}
