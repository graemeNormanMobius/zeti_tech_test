import { Fragment } from 'react';

interface BadgeProps {
  value: string;
  sentiment: 'default' | 'highlight' | 'positive' | 'negative' | 'warning';
  type: 'default' | 'text' | 'dot' | 'rounded';
}

export function Badge({ value, sentiment, type }: BadgeProps) {
  return (
    <div
      className={`badge
      ${'sentiment-' + sentiment}
      ${'type-' + type}
      label`}
    >
      {type === 'rounded' && <span className={'indicator'}>{value}</span>}
      {type !== 'rounded' && (
        <Fragment>
          <span className={'indicator'}></span> {type !== 'dot' && value}
        </Fragment>
      )}
    </div>
  );
}
