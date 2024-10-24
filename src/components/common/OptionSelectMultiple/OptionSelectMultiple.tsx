import { ChevronDownIcon } from '@heroicons/react/24/outline';
import './optionSelectMultiple.scss';
import { FC, HTMLProps, useState } from 'react';
import { OptionSelectItem } from '../OptionSelect/Partials';
import { IOptionSelectItem } from '../../../types/entity/components';
import classNames from 'classnames';

interface IOptionSelectMultipleProps extends HTMLProps<HTMLDivElement> {
  options: IOptionSelectItem[];
  handleSelects: (valueSelects: IOptionSelectItem[]) => void;
}
const OptionSelectMultiple: FC<IOptionSelectMultipleProps> = ({
  options,
  handleSelects,
  className,
  ...props
}) => {
  const [isShowOptions, setIsShowOptions] = useState<boolean>(false);
  const [dataSelected, setDataSelected] = useState<IOptionSelectItem[]>([]);

  const optionSelectMultipleClass = classNames(
    'option__select-multiple-component',
    className,
    {
      show: isShowOptions,
    },
  );

  const handleClickComponent: () => void = () => {
    setIsShowOptions(!isShowOptions);
  };

  const handleSelectOption: (optionValue: IOptionSelectItem) => void = (
    optionValue,
  ) => {
    const indexOptionValue = dataSelected.indexOf(optionValue);
    if (indexOptionValue === -1) {
      const dataSelectedNew = [...dataSelected, optionValue];
      setDataSelected(dataSelectedNew);
      handleSelects(dataSelectedNew);
    } else {
      const dataSelectedNew = dataSelected.filter(
        (_, index) => index !== indexOptionValue,
      );
      setDataSelected(dataSelectedNew);
      handleSelects(dataSelectedNew);
      return;
    }
  };

  return (
    <div className={optionSelectMultipleClass} {...props}>
      <div className="content" onClick={handleClickComponent}>
        <div className="option__selected-list">
          {dataSelected.map((selected, index) => (
            <OptionSelectItem
              style={{ backgroundColor: '#dcdcfd' }}
              optionData={selected}
              handleSelectItem={handleSelectOption}
              key={`${index}`}
            />
          ))}
        </div>
        <div className="icon dropdown">
          <ChevronDownIcon />
        </div>
      </div>
      <div className="options__list">
        {options.map((option, index) => (
          <OptionSelectItem
            optionData={option}
            key={`${index}`}
            handleSelectItem={handleSelectOption}
            isActive={dataSelected.includes(option)}
          />
        ))}
      </div>
    </div>
  );
};

export default OptionSelectMultiple;
