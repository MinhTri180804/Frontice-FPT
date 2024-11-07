import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IGetInformationTaskeeParams } from '../types/request/taskee';
import { ITaskeeSerivce } from '../types/services/taskee';

const URL_API = `${paths.API.root}`;

const taskeeService: ITaskeeSerivce = {
  getInformation: (params: IGetInformationTaskeeParams) => {
    return axiosClient.get(
      `${URL_API}${paths.API.taskee.getInformation}/${params.username}`,
    );
  },
};

export default taskeeService;
