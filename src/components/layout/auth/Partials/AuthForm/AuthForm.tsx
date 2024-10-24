import './authForm.scss';
import { FC } from 'react';

interface IAuthFormProps {
  children: React.ReactNode;
}
const AuthForm: FC<IAuthFormProps> = ({ children }) => {
  return <div className="auth__form-container">{children}</div>;
};
export default AuthForm;
