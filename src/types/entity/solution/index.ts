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
}
