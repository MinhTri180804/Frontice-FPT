import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import avatarAuthor from '../../../asset/images/avatar.png';
import solutionService from '../../../services/solutionService';
import { useAuthStore } from '../../../store/authStore';
import Button from '../Button';
import './Comment.scss';
import useSelfCommentsStore from '../../../store/seftCommentsStore';
import { paths } from '../../../constant';
import { ICommentEntity } from '../../../types/entity/comment';

interface ICommentProps {
  parentComment?: string;
  solutionId: string;
  handleReplyCommentSuccess?: (comment: ICommentEntity) => void;
}

const IComment: React.FC<ICommentProps> = ({
  parentComment = null,
  solutionId,
  handleReplyCommentSuccess,
}) => {
  const [commentValue, setCommentValue] = useState<string>('');
  const queryClient = useQueryClient();
  const createCommentPending = useSelfCommentsStore(
    (state) => state.createCommentPending,
  );
  const addToComment = useSelfCommentsStore((state) => state.addToComments);
  const profile = useAuthStore((state) => state.profile);
  const { t } = useTranslation();
  const mutationComment = useMutation({
    mutationFn: async () => {
      if (profile) {
        const id = Date.now().toString();
        createCommentPending({
          id: id,
          taskee: {
            firstname: profile.firstname,
            lastname: profile.lastname,
            username: profile.username,
            image: profile.image,
            url: '',
          },
          content: commentValue,
          status: 'pending',
        });
        return solutionService.uploadComment({
          parent_id: parentComment || null,
          content: commentValue,
          challenge_solution_id: solutionId,
        });
      }
    },
    onSuccess: (response) => {
      setCommentValue('');
      if (response) {
        addToComment(response.data, 'success');
        toast.success(t('Comment.Success'));
        queryClient.refetchQueries({
          queryKey: [paths.QUERY_KEY.solutionDetails, solutionId],
        });
        return;
      }

      throw new Error('Error comment not response data');
    },
    onError: (error) => {
      toast.error(error.message || t('Comment.Error'));
    },
  });

  const mutationReply = useMutation({
    mutationKey: [],
    mutationFn: async () => {
      return solutionService.uploadComment({
        parent_id: parentComment,
        content: commentValue,
        challenge_solution_id: solutionId,
      });
    },
    onSuccess: (response) => {
      setCommentValue('');
      if (handleReplyCommentSuccess && parentComment) {
        toast.success(t('CommentReply.Success'));
        handleReplyCommentSuccess(response.data);
        queryClient.refetchQueries({
          queryKey: [paths.QUERY_KEY.solutionDetails, solutionId],
        });
      } else {
        throw new Error('Parent Comment not found !A');
      }
    },
    onError: (error) => {
      toast.error(error.message || t('Comment.Error'));
    },
  });

  const handleChangeValueComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const handleSubmitComment = () => {
    if (handleReplyCommentSuccess && parentComment) {
      return mutationReply.mutate();
    }

    return mutationComment.mutate();
  };

  console.log('avatar: ', profile);

  return (
    <>
      <div className="container-comment">
        <div className="main-comment">
          <div className="image">
            <img src={profile?.image || avatarAuthor} alt="" />
          </div>
          <div className="input-text">
            <textarea
              placeholder={t('Placeholder.Comment')}
              value={commentValue}
              onChange={handleChangeValueComment}
            ></textarea>
          </div>
        </div>
        <div className="action">
          <Button
            buttonSize="small"
            styleType="primary"
            label="Comment"
            className="fix-content"
            onClick={() => handleSubmitComment()}
            disabled={commentValue.length === 0 || mutationComment.isPending}
          />
        </div>
      </div>
    </>
  );
};

export default IComment;
