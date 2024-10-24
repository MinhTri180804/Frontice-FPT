export interface IChallengeEntity {
  id: string;
  title: string;
  technical: string[];
  image: string;
  level: string;
  requiredPoint: number;
  point: number;
  shortDes: string;
  longDes: {
    time: number;
    blocks: {
      type: string;
      data: {
        text: string;
        level: number;
      };
    }[];
  };
  premium: boolean;
  created_at: string;
  updated_at: string;
}
