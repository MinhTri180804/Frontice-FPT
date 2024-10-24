import './Empty.scss';
import ImgPath from '../../../asset/images/empty-challenge.jpg';
interface EmptyProps {
  text: string;
  pathImg?: string;
}
const EmptyComponent: React.FC<EmptyProps> = ({ ...props }) => {
  const { text, pathImg = ImgPath } = props;
  return (
    <div className="empty-container">
      <div className="empty-image">
        <img src={pathImg} alt="" />
      </div>
      <div className="empty-text">{text}</div>
    </div>
  );
};
export default EmptyComponent;
