import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IBaseResponse } from '../types/base';
import { IGetAllTaskParams } from '../types/request/task';
import { IGetAllTaskResponse } from '../types/response/task';

const URL_API = `${paths.API.root}${paths.API.task.root}`;
const taskService = {
  getAll: (params: IGetAllTaskParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get<IBaseResponse<IGetAllTaskResponse>>(
      `${URL_API}/get?page=${page}&per_page=${per_page}`,
    );
  },
};

export default taskService;
