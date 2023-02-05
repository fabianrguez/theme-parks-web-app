import NextHead from 'next/head';
import type { ReactNode } from 'react';

type HeadProps = {
  pageTitle?: string;
  metaContent: string;
  children?: ReactNode;
};

const Head = ({ pageTitle = '', metaContent, children }: HeadProps) => (
  <NextHead>
    <title>🎢 Theme Parks Application | {pageTitle}</title>
    <meta name="description" content={metaContent} />
    {children}
  </NextHead>
);

export default Head;
