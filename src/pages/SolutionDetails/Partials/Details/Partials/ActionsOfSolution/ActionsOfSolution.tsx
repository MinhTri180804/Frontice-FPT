import {
  ChatBubbleLeftEllipsisIcon,
  HandThumbDownIcon,
  HandThumbUpIcon,
} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { FC, useState } from 'react';
import useActionsOfSolutionLogic from './actionsOfSolution.logic';
import './actionsOfSolution.scss';
import { ConditionWrapper } from '../../../../../../components/wrapper';
import { Loading } from '../../../../../../components/skeleton/Loading';
import { useTranslation } from 'react-i18next';

interface IActionsOfSolutionProps {
  numberOfLike: number | string;
  numberOfDislike: number | string;
  numberOfComment: number | string;
  solutionId: string;
}

const ActionsOfSolution: FC<IActionsOfSolutionProps> = ({
  numberOfComment,
  numberOfDislike,
  numberOfLike,
  solutionId,
}) => {
  const [isLike, setIsLike] = useState<boolean>(false);
  const [isDislike, setIsDislike] = useState<boolean>(false);
  const [isPendingLike, setIsPendingLike] = useState<boolean>(false);
  const [isPendingDislike, setIsPendingDislike] = useState<boolean>(false);
  const { t } = useTranslation();

  const { handleClickComments, handleDislikeAction, handleLikeAction } =
    useActionsOfSolutionLogic({
      status: {
        isDislike,
        isLike,
      },
      action: {
        setIsDislike,
        setIsLike,
        setIsPendingDislike,
        setIsPendingLike,
      },
      data: {
        solutionId,
      },
    });

  const likeActionClass = classNames('action-like', {
    active: !isDislike && isLike,
  });

  const dislikeActionClass = classNames('action-dislike', {
    active: isDislike && !isLike,
  });

  return (
    <div className="action">
      <div className={likeActionClass} onClick={handleLikeAction}>
        <div className="like">
          <ConditionWrapper
            condition={!isPendingLike}
            fallback={() => {
              return <Loading />;
            }}
          >
            <HandThumbUpIcon />
            {t('Link')}
          </ConditionWrapper>
        </div>
        <div className="quantity">{numberOfLike}</div>
      </div>
      <div className={dislikeActionClass} onClick={handleDislikeAction}>
        <div className="dislike">
          <ConditionWrapper
            condition={!isPendingDislike}
            fallback={() => {
              return <Loading />;
            }}
          >
            <HandThumbDownIcon />

            {t('dislike')}
          </ConditionWrapper>
        </div>
        <div className="quantity">{numberOfDislike}</div>
      </div>
      <div className="action-comment" onClick={handleClickComments}>
        <div className="comment">
          <ChatBubbleLeftEllipsisIcon />
          {t('comment')}
        </div>
        <div className="quantity">{numberOfComment}</div>
      </div>
    </div>
  );
};

export default ActionsOfSolution;
