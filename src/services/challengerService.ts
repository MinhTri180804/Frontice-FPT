import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { IProfileResponse } from '../types/response';

const BASE_URL = `${paths.API.root}${paths.API.CHALLENGER.root}`;
const challengerService = {
  profile: () => {
    return axiosClient.get<IBaseResponse<IProfileResponse>>(
      `${BASE_URL}${paths.API.CHALLENGER.profile}`,
    );
  },
};

export default challengerService;
