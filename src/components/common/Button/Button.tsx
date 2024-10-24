import { HTMLProps } from 'react';
import './Button.scss';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  buttonSize: 'extra-small' | 'small' | 'medium' | 'normal' | 'large';
  iconPosition?: 'left' | 'right';
  label?: string; // Nhãn của button
  styleType?: 'primary' | 'secondary' | 'tertiary';
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Button: React.FC<ButtonProps> = ({ ...props }) => {
  const {
    label = 'label',
    buttonSize,
    iconPosition,
    styleType = 'primary',
    Icon,
    disabled = false,
    type,
    className,
    ...others
  } = props;

  return (
    <button
      type={type as 'button' | 'submit' | 'reset'}
      className={`button-container ${className}  ${buttonSize} ${styleType}`}
      disabled={disabled}
      {...others}
    >
      {iconPosition == 'left' && Icon && (
        <div className="icon">
          <Icon />
        </div>
      )}
      <div className="label">{label}</div>
      {iconPosition == 'right' && Icon && (
        <div className="icon">
          <Icon />
        </div>
      )}
    </button>
  );
};

export default Button;
