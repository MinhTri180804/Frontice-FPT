import { FC, ReactNode } from 'react';

interface ConditionWrapperProps {
  children: ReactNode;
  fallback?: () => ReactNode;
  condition: boolean;
}

const ConditionWrapper: FC<ConditionWrapperProps> = ({
  children,
  fallback,
  condition,
}) => {
  if (!condition) {
    return <>{fallback && fallback()}</>;
  }
  return <>{children}</>;
};

export default ConditionWrapper;
