import { FC, useId, useState } from 'react';
import './checkbox.scss';
import classNames from 'classnames';

interface ICheckboxProps {
  eventChecked?: (status: boolean) => void;
  label?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  isError?: boolean;
}

const Checkbox: FC<ICheckboxProps> = ({
  eventChecked,
  label,
  isChecked = false,
  isDisabled = false,
  isError = false,
}) => {
  const [checked, setChecked] = useState<boolean>(isChecked);
  const id = useId();

  const handleChecked = () => {
    setChecked(!checked);
    if (eventChecked) eventChecked(!checked);
  };

  const checkboxClass = classNames({
    'checkbox-wrapper-4': true,
    disabled: isDisabled,
    error: isError,
  });

  return (
    <div className={checkboxClass}>
      <input
        className="inp-cbx"
        id={id}
        type="checkbox"
        checked={checked}
        onChange={handleChecked}
        disabled={isDisabled}
      />
      <label className="cbx" htmlFor={id}>
        <span>
          <svg width="12px" height="10px">
            <use xlinkHref="#check-4"></use>
          </svg>
        </span>
        {label && <span>{label}</span>}
      </label>
      <svg className="inline-svg">
        <symbol id="check-4" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>
  );
};

export default Checkbox;
