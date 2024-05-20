import { useEffect } from 'react';

interface Props<T, S> {
  ref: React.MutableRefObject<T>;
  callback: () => void; 
  altRef?: React.MutableRefObject<S>;
}

function useOutsideClick<RefType extends HTMLElement | null, AltRefType extends HTMLElement | null | undefined>({ref, callback, altRef}: Props<RefType, AltRefType>) {

  const handleClick = (e: MouseEvent) => {
    if (!ref?.current?.contains(e.target as Node) && !altRef?.current?.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, altRef, callback]);
}

export default useOutsideClick;