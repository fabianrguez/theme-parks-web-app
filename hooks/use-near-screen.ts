import useIsInViewport from './use-is-in-viewport';

type UseNearScreenProps = {
  initialValue?: boolean;
  offset?: string;
};

const useNearScreen = <TElement extends HTMLElement>({
  initialValue = false,
  offset = '200px',
}: UseNearScreenProps = {}) => useIsInViewport<TElement>({ initialValue, offset, once: true });

export default useNearScreen;
