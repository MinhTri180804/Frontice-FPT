import { axiosClient } from '../axios';
import { paths } from '../constant';
import {
  IDownloadFigmaParams,
  IDownloadSourceParams,
  IGetAllTaskParams,
  IGetTaskDetailsParams,
  IJoinTaskParams,
  ISubmitSolutionTaskParams,
  ISubmitSolutionTaskRequest,
} from '../types/request/task';
import { ITaskService } from '../types/services/task';

const URL_API = `${paths.API.root}${paths.API.task.root}`;
const URL_API_2 = `${paths.API.root}/tasks`;
const URL_API_3 = `${paths.API.root}/solutions/tasks`;
const URL_API_4 = `${paths.API.root}/solutions/task`;
const taskService: ITaskService = {
  getAll: (params: IGetAllTaskParams) => {
    const { page = 1, per_page = 10 } = params;
    return axiosClient.get(`${URL_API}/get?page=${page}&per_page=${per_page}`);
  },

  getDetails: (params: IGetTaskDetailsParams) => {
    const { taskId } = params;
    return axiosClient.get(`${URL_API_2}/${taskId}`);
  },

  join: (params: IJoinTaskParams) => {
    const { taskId } = params;
    return axiosClient.post(`${URL_API}/join/${taskId}`);
  },

  downloadFigma: (params: IDownloadFigmaParams) => {
    const { taskId } = params;
    return axiosClient.get(
      `${URL_API}${paths.API.task.downloadFigma}/${taskId}`,
    );
  },

  downloadSource: (params: IDownloadSourceParams) => {
    const { taskId } = params;
    return axiosClient.get(
      `${URL_API}${paths.API.task.downloadSource}/${taskId}`,
    );
  },

  submitSolution: (
    params: ISubmitSolutionTaskParams,
    data: ISubmitSolutionTaskRequest,
  ) => {
    const { taskId } = params;
    return axiosClient.post(`${URL_API_4}/${taskId}/submit`, data);
  },

  getAllSolutionTaskOfMe: () => {
    return axiosClient.get(`${URL_API_3}/submitted`);
  },
};

export default taskService;
