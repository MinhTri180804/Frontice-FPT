import { FC, HTMLProps } from 'react';
import './sectionAuthorInformation.scss';
import { useQuery } from '@tanstack/react-query';
import taskeeService from '../../../../../../services/taskeeService';
import { InformationAuthor } from '../../../../../../components/common';
import classNames from 'classnames';
import { paths } from '../../../../../../constant';
import { ConditionWrapper } from '../../../../../../components/wrapper';
import { IProfileEntity } from '../../../../../../types/entity';

interface ISectionAuthorInformationProps extends HTMLProps<HTMLDivElement> {
  username: string;
}

const QUERY_KEYS = [paths.QUERY_KEY.informationTaskee];

const SectionAuthorInformation: FC<ISectionAuthorInformationProps> = ({
  username,
  className,
}) => {
  const {
    data: profileData,
    isFetching,
    isFetched,
  } = useQuery({
    queryKey: [username, ...QUERY_KEYS],
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
      {/* State pending */}
      <ConditionWrapper condition={!isFetching && isFetching}>
        <div className="author__information-skeleton"></div>
      </ConditionWrapper>

      {/* State not pending and data is exits */}
      <ConditionWrapper
        condition={Boolean(profileData) && isFetched && !isFetching}
      >
        <InformationAuthor authorProfile={profileData as IProfileEntity} />
      </ConditionWrapper>
    </section>
  );
};

export default SectionAuthorInformation;
