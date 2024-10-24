import './DescSolution.scss';
interface Solution {
  titleSolutioon: string;
  descriptionSolution: string;
}
const DescSolution: React.FC<Solution> = ({ ...props }) => {
  const { titleSolutioon, descriptionSolution } = props;
  return (
    <>
      <div className="desc-title-solution">
        <div className="title-solution">{titleSolutioon}</div>
        <div className="desc-solution">{descriptionSolution}</div>
      </div>
    </>
  );
};
export default DescSolution;
