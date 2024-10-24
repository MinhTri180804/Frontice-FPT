import {
  IOptionSelect,
  IOptionSelectItem,
} from '../../../types/entity/components';
import './optionSelect.scss';
import { FC, HTMLProps, useState } from 'react';
import { OptionSelectItem } from './Partials';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { IOptionLanguage } from '../../../types/entity';

interface IOptionSelectProps
  extends IOptionSelect<IOptionSelectItem>,
    HTMLProps<HTMLDivElement> {
  handleSelect: (value: string) => void;
}

const OptionSelect: FC<IOptionSelectProps> = ({
  defaultOptionSelect,
  displayDefault,
  options,
  handleSelect,
  className,
  ...props
}) => {
  const [isShow, setIsShow] = useState<boolean>();
  const [valueSelect, setValueSelect] = useState<IOptionSelectItem>({
    displayContent:
      (defaultOptionSelect?.displayContent as string) ||
      (displayDefault?.displayContent as string),
    Icon: defaultOptionSelect?.Icon || displayDefault?.Icon,
    optionValue: defaultOptionSelect?.optionValue || null,
  });

  const handleTrigger = () => {
    setIsShow(!isShow);
  };

  const optionSelectComponentClass = classNames(
    'option__select-component',
    className,
    {
      show: isShow,
    },
  );

  const handleOptionSelect = (option: IOptionSelectItem) => {
    if (option !== valueSelect) {
      setValueSelect(option);

      if (option.optionValue) {
        handleSelect(option.optionValue as IOptionLanguage);
        setIsShow(false);
      }
    }
  };

  return (
    <div className={optionSelectComponentClass} {...props}>
      <div className="trigger" onClick={handleTrigger}>
        <div className="content">
          {valueSelect.Icon && (
            <div className="icon">
              {typeof valueSelect.Icon === 'string' && valueSelect.Icon ? (
                <img src={valueSelect.Icon} alt="" />
              ) : (
                valueSelect.Icon && (
                  <valueSelect.Icon className="icon-default" />
                )
              )}
            </div>
          )}
          <div className="label">{valueSelect.displayContent}</div>
        </div>
        <div className="icon dropdown">
          <ChevronDownIcon width={24} height={24} />
        </div>
      </div>
      <div className="options__list">
        {options.map((option, index) => (
          <OptionSelectItem
            handleSelectItem={handleOptionSelect}
            optionData={option}
            key={`${index}`}
            isActive={valueSelect.optionValue === option.optionValue}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionSelect;
