export interface ISolutionEntity {
  id: string;
  title: string;
  github: string;
  liveGithub: string;
  liked: number;
  disliked: number;
  isLike: boolean;
  isDislike: boolean;
  description: {
    title: string;
    answer: string;
  }[];
  submitedAt: string;
  comment: number;
  status: string;
  mentor_feedback: null | {
    feedback: string;
    admin_feedback: {
      id: string;
      username: string;
      email: string;
      role: string;
      fullname: string;
      firstLogin: boolean;
      image: string;
      adminRole: 'string';
      createdAt: number;
    };
    feedback_at: number;
  };
}
