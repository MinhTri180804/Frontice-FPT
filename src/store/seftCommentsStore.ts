import { create } from 'zustand';
import { ICommentEntity } from '../types/entity/comment';

type IStatusComment = 'pending' | 'success' | 'error';
type IStatusStateComment = 'pending' | 'ide';

type ISelfComment = Pick<ICommentEntity, 'content' | 'id' | 'taskee'> & {
  status: IStatusComment;
};

type ICommentEntityCustom = ICommentEntity & { status: IStatusComment };

type State = {
  status: IStatusStateComment;
  comments: ICommentEntityCustom[];
  commentPending: ISelfComment | null;
};

type Action = {
  addToComments: (
    comment: Omit<ICommentEntityCustom, 'status'>,
    statusResponse: 'success' | 'error',
  ) => void;
  createCommentPending: (comment: ISelfComment) => void;
  removeComment: (commentId: string) => void;
};

const useSelfCommentsStore = create<State & Action>((set) => ({
  status: 'ide',
  comments: [],
  commentPending: null,
  createCommentPending: (comment) =>
    set((state) => {
      if (state.status === 'ide' && state.commentPending === null) {
        return {
          commentPending: comment,
          status: 'pending',
        };
      }
      return { ...state };
    }),

  addToComments: (comment, statusResponse) =>
    set((state) => {
      if (state.status === 'pending' && state.commentPending !== null) {
        const convertComment: ICommentEntityCustom = {
          ...comment,
          id: comment.id,
          status: statusResponse,
        };

        const updateComments = [...state.comments, convertComment];

        return {
          comments: updateComments,
          commentPending: null,
          status: 'ide',
        };
      }

      return { ...state };
    }),
  removeComment: (commentId: string) =>
    set((state) => {
      if (state.comments.length === 0) {
        return { ...state };
      }
      return {
        comments: state.comments.filter((comment) => comment.id !== commentId),
      };
    }),
}));

export default useSelfCommentsStore;
