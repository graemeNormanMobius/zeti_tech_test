import Spinner from 'react-bootstrap/Spinner';

export function LoadingAnimation({
  isDarkMode,
  skeletonType,
  spinner,
  fixedWidth,
  highlightCard,
  alwaysDarkMode,
  isSkeleton = true
}: {
  isDarkMode: boolean;
  skeletonType: string;
  spinner?: boolean;
  fixedWidth?: number;
  highlightCard?: boolean;
  alwaysDarkMode?: boolean;
  isSkeleton?: boolean;
}) {
  return (
    <div
      className={`widgetLoader
        ${isSkeleton ? 'skeleton' : ''}
        ${skeletonType ?? ''}
        ${highlightCard ? 'highlightCard' : ''}
        ${alwaysDarkMode ? 'dark-mode' : ''}
      `}
      style={{ width: `${fixedWidth}%` }}
    >
      {isDarkMode && spinner && (
        // <span>Loading...</span>
        <Spinner animation="border" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
      {!isDarkMode && spinner && (
        // <span>Loading...</span>
        <Spinner animation="border" variant="dark">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </div>
  );
}
