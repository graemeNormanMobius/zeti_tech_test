import React, { Fragment } from 'react';
import Alert from 'react-bootstrap/Alert';

export function Notification({
  showIcon = false,
  icon,
  type = 'success',
  header,
  showContent = true,
  children
}: {
  showIcon: boolean;
  icon?: React.ReactNode;
  type?: 'neutral' | 'success' | 'danger' | 'warning' | 'info';
  header: string;
  showContent?: boolean;
  children?: any;
}) {
  return (
    <>
      <Alert
        variant={type}
        bsPrefix="customNotification"
        className={"customNotification" + ' ' + [`type-${type}`]}
      >
        <>
          {showIcon && (
            <div className={'iconContainer' + ' ' + [`icon-${type}`]}>{icon}</div>
          )}
          <div className="notificationContent">
            <Alert.Heading className="heading bodySmallEmp">{header}</Alert.Heading>
            {(showContent && children) && (
              <Fragment>
                <p className="content bodySmall">{children[0]}</p>
                <div className="ctaButton">{children[3]}</div>
              </Fragment>
            )}
          </div>
        </>
      </Alert>
    </>
  );
}
