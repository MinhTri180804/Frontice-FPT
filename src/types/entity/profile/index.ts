export interface IProfileEntity {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  bio: string;
  goldExpires: string;
  gold_account: boolean;
  point: number;
  github: string | null;
  createAt: string;
  phone: string;
  cv: string | null;
  image: string;
  username: string;
  challengeJoined: number;
  pendingChallenges: number;
  submittedChallenges: number;
}
