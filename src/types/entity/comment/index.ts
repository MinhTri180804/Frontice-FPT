import { ITaskeeEntity } from '../taskee';

export type ICommentEntity = {
  id: string;
  content: string;
  taskee: ITaskeeEntity;
  comment_id: string;
  parent_id: string | null;
  left: number;
  right: number;
  challenge_solution_id: string;
  is_edit: false;
  created_at: number;
  replies: number;
};
