import './DescSolution.scss';
interface Solution {
  titleSolution: string;
  descriptionSolution: string;
}
const DescSolution: React.FC<Solution> = ({ ...props }) => {
  const { titleSolution, descriptionSolution } = props;
  return (
    <>
      <div className="desc-title-solution">
        <div className="title-solution">{titleSolution}</div>
        <div className="desc-solution">{descriptionSolution}</div>
      </div>
    </>
  );
};
export default DescSolution;
