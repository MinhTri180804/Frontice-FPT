import classNames from 'classnames';
import './optionImagePreview.scss';
import { FC } from 'react';

interface IOptionImagePreviewProps {
  isActive?: boolean;
  label: string;
  imagePreviewUrl: string;
  id: string;
  handleSelect: (imageUrl: string, id: string) => void;
}

const OptionImagePreview: FC<IOptionImagePreviewProps> = ({
  label,
  imagePreviewUrl,
  isActive = false,
  handleSelect,
  id,
}) => {
  const handleSelectOption = () => {
    handleSelect(imagePreviewUrl, id);
  };

  const optionImagePreviewClass = classNames(
    'option__image-preview-component',
    {
      active: isActive,
    },
  );
  return (
    <div onClick={handleSelectOption} className={optionImagePreviewClass}>
      <span className="value">{label}</span>
    </div>
  );
};

export default OptionImagePreview;
