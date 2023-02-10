declare type ClassNames = {
  [key: string]: boolean;
};

export default function combineClassnames(defaultClassNames: string, optionals: ClassNames = {}) {
  const optionalClassnames = Object.entries(optionals)
    .filter(([_, condition]: [string, boolean]) => condition)
    .map(([key]: any) => key);

  return [defaultClassNames, optionalClassnames].join(' ');
}
