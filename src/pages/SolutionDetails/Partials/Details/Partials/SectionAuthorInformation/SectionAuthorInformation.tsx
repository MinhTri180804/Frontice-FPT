import { FC, HTMLProps } from 'react';
import './sectionAuthorInformation.scss';
import { useQuery } from '@tanstack/react-query';
import taskeeService from '../../../../../../services/taskeeService';
import { InformationAuthor } from '../../../../../../components/common';
import classNames from 'classnames';

interface ISectionAuthorInformationProps extends HTMLProps<HTMLDivElement> {
  username: string;
}
const SectionAuthorInformation: FC<ISectionAuthorInformationProps> = ({
  username,
  className,
}) => {
  console.log(username);
  const { data: profileData, isPending } = useQuery({
    queryKey: [username],
    queryFn: async () => {
      if (username === '') return null;
      const response = await taskeeService.getInformation({ username });
      const responseData = response.data.data;
      return responseData;
    },
  });

  const authorInformationClass = classNames('author__information', className);

  return (
    <section className={authorInformationClass}>
      {isPending && <div className="author__information-skeleton"></div>}
      {profileData && !isPending && (
        <InformationAuthor authorProfile={profileData} />
      )}
    </section>
  );
};

export default SectionAuthorInformation;
