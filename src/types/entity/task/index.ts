export interface ITaskEntity {
  id: string;
  title: string;
  owner: {
    username: string;
    firstname: string;
    lastname: string;
    image: string;
    url: string;
  };
  technical: string[];
  image: string;
  requiredPoint: number;
  enoughPoint: boolean;
  joinTotal: number;
  submittedTotal: number;
  isJoin: boolean;
  isSubmit: boolean;
  solutionSubmitId: boolean;
  shortDes: string;
  expiredAt: string;
  created_at: string;
  updated_at: string;
}
