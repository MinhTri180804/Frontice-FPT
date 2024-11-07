import { axiosClient } from '../axios';
import { paths } from '../constant';
import { IGetAllTaskParams } from '../types/request/task';
import { ITaskService } from '../types/services/task';

const URL_API = `${paths.API.root}${paths.API.task.root}`;
const taskService: ITaskService = {
  getAll: (params: IGetAllTaskParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get(`${URL_API}/get?page=${page}&per_page=${per_page}`);
  },
};

export default taskService;
