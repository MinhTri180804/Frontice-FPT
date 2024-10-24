import './tagChallenge.scss';
import classNames from 'classnames';
import { FC } from 'react';

interface ITagChallengeProps {
  type: 'premium' | 'free' | 'free++' | 'new';
}
const TagChallenge: FC<ITagChallengeProps> = ({ type }) => {
  const tagChallengeClass = classNames('tag__challenge', {
    new: type === 'new',
    premium: type === 'premium',
    'free-plus': type === 'free++',
    free: type === 'free',
  });
  return (
    <div className={tagChallengeClass}>
      <div className="value">{type}</div>
    </div>
  );
};

export default TagChallenge;
