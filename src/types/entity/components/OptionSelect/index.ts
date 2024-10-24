export interface IOptionSelect<T> {
  defaultOptionSelect?: IOptionSelectItem;
  displayDefault?: {
    displayContent: string;
    Icon?: React.FC<React.SVGProps<SVGSVGElement>> | string;
  };
  options: T[];
}

export interface IOptionSelectItem {
  displayContent: string;
  optionValue: string | null;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>> | string;
}
