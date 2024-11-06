import './companyInformation.scss';
import { FC } from 'react';
import { ITaskEntity } from '../../../../../types/entity/task';

interface ICompanyInformationProps {
  data: ITaskEntity['owner'];
}

const CompanyInformation: FC<ICompanyInformationProps> = ({ data }) => {
  const { company: companyName, image } = data;
  return (
    <div className="company__information">
      <div className="logo">
        <img src={image} />
      </div>
      <div className="name">{companyName}</div>
    </div>
  );
};

export default CompanyInformation;
