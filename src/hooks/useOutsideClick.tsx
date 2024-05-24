/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

interface Props<T, S> {
  ref: React.MutableRefObject<T>;
  callback: () => void; 
  altRef?: React.MutableRefObject<S>;
  altRefs?: React.MutableRefObject<any>[];
}

function useOutsideClick<RefType extends HTMLElement | null, AltRefType extends HTMLElement | null | undefined>({
  ref, callback, altRef, altRefs
}: Props<RefType, AltRefType>) {

  function clickedOutsideElements(e: MouseEvent) {
    let test = !ref?.current?.contains(e.target as Node) && !altRef?.current?.contains(e.target as Node);

    if(altRefs && altRefs.length) {
      for(const target of altRefs) {
        if(target.current?.contains(e.target as Node)) {
          test = false
        }
      }
    }

    return test
  }

  const handleClick = (e: MouseEvent) => {
    const clikedOutside = clickedOutsideElements(e)
    if (clikedOutside) {
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