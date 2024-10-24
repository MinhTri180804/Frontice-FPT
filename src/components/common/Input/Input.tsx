import React, { forwardRef, HTMLProps, Ref, useId } from 'react';
import './Input.scss';

interface IInputProps extends HTMLProps<HTMLInputElement> {
  label?: string;
  status?: 'default' | 'error' | 'success' | 'loading';
  message?: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Input = forwardRef((props: IInputProps, ref: Ref<HTMLInputElement>) => {
  const idInput = useId();

  const {
    label,
    required,
    Icon,
    message,
    status = 'default',
    ...inputProps
  } = props;

  return (
    <div className={`input__component ${status} `}>
      {label && (
        <label htmlFor={idInput}>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </label>
      )}
      <div className="input__component-container">
        <input id={idInput} ref={ref} {...inputProps} />
        {Icon && (
          <div className="icon">
            <Icon />
          </div>
        )}
      </div>
      {message && <div className={`message ${status}`}> {message}</div>}
    </div>
  );
});

export default Input;
