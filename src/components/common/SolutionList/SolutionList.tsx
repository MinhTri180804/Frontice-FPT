import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { emptySolution } from '../../../assets/images';
import { ISolutionResponse } from '../../../types/response/solution';
import EmptyComponent from '../Empty/Empty';
import Solution from '../Solution/Solution';
import './solutionList.scss';

interface ISolutionListProps {
  solutionsData: ISolutionResponse[];
}

const SolutionList: FC<ISolutionListProps> = ({ solutionsData }) => {
  const { t } = useTranslation();

  console.log(solutionsData);
  if (solutionsData.length === 0) {
    return (
      <EmptyComponent
        pathImg={emptySolution}
        text={t('Empty.DontSubmittedChallenge')}
      />
    );
  }

  return (
    <div className="solution__list">
      {solutionsData.map((solution, index) => (
        <Solution solution={solution} key={`${index}`} />
      ))}
    </div>
  );
};

export default SolutionList;
