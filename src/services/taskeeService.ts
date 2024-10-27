import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { IGetInformationTaskeeParams } from '../types/request/taskee';
import { IGetInformationTaskeeResponse } from '../types/response/taskee';

const URL_API = `${paths.API.root}`;

const taskeeService = {
  getInformation: (params: IGetInformationTaskeeParams) => {
    return axiosClient.get<IBaseResponse<IGetInformationTaskeeResponse>>(
      `${URL_API}${paths.API.taskee.getInformation}/${params.username}`,
    );
  },
};

export default taskeeService;
