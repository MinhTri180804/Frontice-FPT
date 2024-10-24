import { useNavigate } from 'react-router-dom';

const usePreviousPage = (lengthPreviousPage?: number) => {
  const navigate = useNavigate();
  let value: number = -1;

  if (lengthPreviousPage !== undefined) {
    value =
      lengthPreviousPage > 0 ? lengthPreviousPage * -1 : lengthPreviousPage;
  }

  return () => {
    navigate(value);
  };
};

export default usePreviousPage;
