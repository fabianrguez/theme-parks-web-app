import type { ReactNode } from 'react';
import styles from '@/styles/tooltip.module.scss';

declare type TooltipProps = {
  children: ReactNode;
  content: string;
};

export default function Tooltip({ content, children }: TooltipProps) {
  return (
    <span className={styles['tooltip']} data-tooltip={content}>
      {children}
    </span>
  );
}
