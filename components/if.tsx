import type { ReactNode } from 'react';

declare type IfProps = {
  condition: boolean;
  children: ReactNode;
};

const If = ({ condition, children }: IfProps): JSX.Element => (condition ? <>{children}</> : <></>);

export default If;
