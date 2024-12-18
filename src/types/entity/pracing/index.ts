export type IPracingEntity = {
  id: string;
  name: string;
  type: string;
  price: number;
  created_at: string;
  updated_at: string;
};

export type IPracingResponse = {
  services: IPracingEntity[][];
};

export type IUploadImageResponse = {
  path: string;
  link: string;
};

export type IUpdateProfileRequest = {
  username?: string;
  phone?: string;
  firstname?: string;
  lastname?: string;
  bio?: string;
  github?: string;
  cv?: string;
  image?: string;
  // email?: string;
};
