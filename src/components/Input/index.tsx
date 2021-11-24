import {
  useEffect,
  useRef,
  useState,
  useCallback
} from 'react';

import Icon from 'react-icons/index';

import { useField } from '@unform/core';

import { Container } from './styles';

interface InputProps {
  name: string;
  placeholder: string;
  value: string | number;
  icon?: Icon;
  rest?: HTMLInputElement;
  onChange?: (event: any) => void;
}

export function Input({ name, placeholder, icon: Icon, ...rest }: InputProps){
  const inputRef = useRef<any>();

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, registerField } = useField(name);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(inputRef.current?.value);
  }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}

      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};