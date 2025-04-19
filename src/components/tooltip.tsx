import Popover from 'react-bootstrap/Popover';
import { OverlayTrigger } from 'react-bootstrap';
import { InfoTooltipIcon } from "./icons.tsx";

export function Tooltip({
  placement,
  data
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
}) {
  return (
    <OverlayTrigger
      trigger={['hover', 'focus']}
      placement={placement}
      overlay={
        <Popover className="popover bodyXSmall" id={`popover-positioned-${placement}`}>
          <Popover.Body as="div" className="popoverBody">
            {data}
          </Popover.Body>
        </Popover>
      }
    >
      <span className="tooltip">
        <InfoTooltipIcon className="size-xs icon" />
      </span>
    </OverlayTrigger>
  );
}
