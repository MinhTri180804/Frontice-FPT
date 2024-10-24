import classNames from 'classnames';
import './faq.scss';
import { FC, useEffect, useRef, useState } from 'react';

interface IFaqProps {
  title: string;
  description: string;
}

const Faq: FC<IFaqProps> = ({ title, description }) => {
  const currentRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleChangeOpen: () => void = () => {
    setIsOpen(!isOpen);
  };
  const faqClass = classNames('faq__component', {
    open: isOpen,
  });

  useEffect(() => {
    if (currentRef.current) {
      const contentElement = currentRef.current.querySelector(
        '.content',
      ) as HTMLDivElement;

      if (isOpen) {
        contentElement.style.maxHeight = `${contentElement.scrollHeight}px`;
        contentElement.style.visibility = 'visible';
      } else {
        contentElement.style.maxHeight = '0px';
        contentElement.style.visibility = 'hidden';
      }
    }
  }, [isOpen]);

  return (
    <div className={faqClass} ref={currentRef} onClick={handleChangeOpen}>
      <div className="title">
        <div className="value">{title}</div>
        <div className="icon">
          <div className="icon-custom"></div>
        </div>
      </div>

      <div className="content">{description}</div>
    </div>
  );
};

export default Faq;
