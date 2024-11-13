import {
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  PencilSquareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { DefaultAvatar } from '../../../../assets/images';
import IComment from '../../../../components/common/Comment';
import { ConditionWrapper } from '../../../../components/wrapper';
import { paths } from '../../../../constant';
import solutionService from '../../../../services/solutionService';
import { useAuthStore } from '../../../../store/authStore';
import useSelfCommentsStore from '../../../../store/seftCommentsStore';
import { ITaskeeEntity } from '../../../../types/entity';
import { ICommentEntity } from '../../../../types/entity/comment';
import { convertTimestampToVietnamTime } from '../../../../utils/convertTime';
import './Comments.scss';
import { CommentSkeleton } from '../../../../components/skeleton/Comment';

interface ICommentProps {
  commentData: ICommentEntity;
  parentCommentAuthor?: ITaskeeEntity;
  handleRemoveReplyCommentFromParent?: (commentId: string) => void;
}

const Comment: React.FC<ICommentProps> = ({
  commentData,
  parentCommentAuthor,
  handleRemoveReplyCommentFromParent,
}) => {
  const optionActionMoreRef = useRef<HTMLDivElement>(null);
  const comments = useSelfCommentsStore((state) => state.comments);
  const profile = useAuthStore((state) => state.profile);
  const { removeComment } = useSelfCommentsStore();
  const [showSelfComment, setShowSelfComment] = useState<boolean>(false);
  const [showMoreAction, setShowMoreAction] = useState<boolean>(false);
  const [repliesComment, setRepliesComments] = useState<ICommentEntity[]>([]);
  const [conditionQuantityRepliesComment, setConditionQuantityRepliesComment] =
    useState<boolean>(commentData.replies > 0);
  const [pageCommentReplies, setPageCommentReplies] = useState<string | number>(
    0,
  );
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const handel = () => {
    setShowSelfComment(!showSelfComment);
  };

  useEffect(() => {
    if (showMoreAction) {
      document.addEventListener('mousedown', handleClickOutsideActionMore);
    }

    return () => {
      document.addEventListener('mousedown', handleClickOutsideActionMore);
    };
  }, [showMoreAction]);

  const handleClickOutsideActionMore = (event: MouseEvent) => {
    if (
      optionActionMoreRef.current &&
      !optionActionMoreRef.current.contains(event.target as Node)
    ) {
      setShowMoreAction(false);
    }
  };

  const handleRemoveReplyComment = (commentId: string) => {
    setRepliesComments(
      repliesComment.filter((comment) => comment.id !== commentId),
    );
  };

  const mutationRemoveComment = useMutation({
    mutationKey: [paths.MUTATION_KEY.remove_comment],
    mutationFn: async () => {
      setShowMoreAction(false);
      return solutionService.removeComment({
        commentId: commentData.id,
      });
    },
    onSuccess: () => {
      if (comments.length !== 0) {
        removeComment(commentData.id);
      }
      if (!parentCommentAuthor) {
        queryClient.invalidateQueries({
          queryKey: [
            paths.QUERY_KEY.commentsOfSolution,
            commentData.challenge_solution_id,
          ],
        });
      } else {
        if (handleRemoveReplyCommentFromParent) {
          handleRemoveReplyCommentFromParent(commentData.id);
        }
      }
      toast.success(t('ToastMessage.Comment.Remove.Success'));
    },
    onError: () => {
      toast.error(t('ToastMessage.Comment.Remove.Error'));
    },
  });

  const mutationGetRepliesComment = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      if (commentData.replies > 0) {
        setPageCommentReplies((prev) => Number(prev) + 1);
        return solutionService.getAllCommentReply({
          commentParentId: commentData.id,
          page: Number(pageCommentReplies) + 1,
        });
      }
      return null;
    },
    onSuccess: (response) => {
      if (response) {
        if (Number(pageCommentReplies) === Number(response.data.last_page)) {
          setConditionQuantityRepliesComment(false);
        }
        setRepliesComments([...response.data.comments, ...repliesComment]);
        return;
      }

      throw new Error(t('RepliesComment.Notfound'));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleReplySuccessComment = (comment: ICommentEntity) => {
    setRepliesComments([...repliesComment, comment]);
  };

  const commentAt = convertTimestampToVietnamTime(commentData.created_at);

  return (
    <div className="container-comment">
      <div className="info-author">
        <div className="avatar-author">
          <img src={commentData.taskee.image || DefaultAvatar} />
        </div>
        <div className="name-author">
          {commentData.taskee.firstname} {commentData.taskee.lastname}
        </div>
        <div className="date-comment">Comment on {commentAt}</div>
        <ConditionWrapper condition={Boolean(parentCommentAuthor)}>
          {parentCommentAuthor && (
            <ConditionWrapper
              condition={commentData.taskee.username !== profile?.username}
            >
              <div className="reply-to">
                Reply to:
                <p>
                  {parentCommentAuthor.firstname} {parentCommentAuthor.lastname}
                </p>
              </div>
            </ConditionWrapper>
          )}
        </ConditionWrapper>
      </div>
      <div className="content-comment">
        <p>{commentData.content}</p>
        <div className="interaction-panel">
          <div className="action-reply" onClick={handel}>
            <ChatBubbleLeftRightIcon className="icon" color="#494A4D" />
            <p>{t('ReplyComment')}</p>
          </div>
          <ConditionWrapper
            condition={profile?.username === commentData.taskee.username}
          >
            <div className="action-options">
              <EllipsisHorizontalIcon
                className="icon"
                width={24}
                height={24}
                color="#494A4D"
                onClick={() => setShowMoreAction(!showMoreAction)}
              />

              <div
                className={`options ${showMoreAction && 'active'}`}
                ref={optionActionMoreRef}
              >
                <div
                  className="option option-remove"
                  onClick={() => mutationRemoveComment.mutate()}
                >
                  <TrashIcon width={24} height={24} />
                  <div className="label">{t('Remove.Comment')}</div>
                </div>
                <div className="option option-edit">
                  <PencilSquareIcon width={24} height={24} />
                  <div className="label">{t('Edit.Comment')}</div>
                </div>
              </div>
            </div>
          </ConditionWrapper>
        </div>
      </div>

      <ConditionWrapper
        condition={
          Boolean(repliesComment.length) || mutationGetRepliesComment.isPending
        }
      >
        <div className="replies">
          <ConditionWrapper
            condition={!mutationGetRepliesComment.isPending}
            fallback={() => {
              return Array.from({ length: commentData.replies }).map(
                (_, index) => <CommentSkeleton key={`${index}`} />,
              );
            }}
          >
            {repliesComment.map((comment, index) => (
              <Comment
                commentData={comment}
                key={`${index}`}
                parentCommentAuthor={commentData.taskee}
                handleRemoveReplyCommentFromParent={handleRemoveReplyComment}
              />
            ))}
          </ConditionWrapper>
        </div>
      </ConditionWrapper>

      <ConditionWrapper
        condition={commentData.replies > 0 && conditionQuantityRepliesComment}
      >
        <div
          className="view__more-replies"
          onClick={() => mutationGetRepliesComment.mutate()}
        >
          <ChevronDownIcon width={24} height={24} />
          <div className="label">{t('ViewMore.Comments')}</div>
        </div>
      </ConditionWrapper>

      <ConditionWrapper condition={showSelfComment}>
        <IComment
          solutionId={commentData.challenge_solution_id}
          parentComment={commentData.id}
          handleReplyCommentSuccess={handleReplySuccessComment}
        />
      </ConditionWrapper>
      {/* {childrenComment && (
        <div className="replies">
          {childrenComment.map((child, index) => (
            <Comment
              key={index}
              data={{ ...child, parentCommentName: nameAuthor }}
            />
          ))}
        </div>
      )} */}
    </div>
  );
};

export default Comment;
