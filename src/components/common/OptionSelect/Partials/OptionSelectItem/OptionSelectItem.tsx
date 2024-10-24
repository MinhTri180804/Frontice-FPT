import classNames from 'classnames';
import { IOptionSelectItem } from '../../../../../types/entity/components';
import './optionSelectItem.scss';
import { FC, HTMLProps } from 'react';

interface IOptionSelectItemProps extends HTMLProps<HTMLDivElement> {
  optionData: IOptionSelectItem;
  handleSelectItem: (option: IOptionSelectItem) => void;
  isSelected?: boolean;
  isActive?: boolean;
}

const OptionSelectItem: FC<IOptionSelectItemProps> = ({
  optionData,
  handleSelectItem,
  isSelected = false,
  className,
  isActive = false,
  ...props
}) => {
  const optionSelectItemClass = classNames(
    'option__select-item-component',
    className,
    {
      selected: isSelected,
      active: isActive,
    },
  );

  const handleClickOptionItem = () => {
    handleSelectItem(optionData);
  };

  return (
    <div
      onClick={handleClickOptionItem}
      className={optionSelectItemClass}
      {...props}
    >
      {optionData.Icon && (
        <div className="icon">
          {typeof optionData.Icon !== 'string' ? (
            optionData.Icon && <optionData.Icon className="icon-option" />
          ) : (
            <img src={optionData.Icon} />
          )}
        </div>
      )}

      <div className="label">{optionData.displayContent}</div>
    </div>
  );
};

export default OptionSelectItem;
