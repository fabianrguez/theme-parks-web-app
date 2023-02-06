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
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
    {children}
  </NextHead>
);

export default Head;
