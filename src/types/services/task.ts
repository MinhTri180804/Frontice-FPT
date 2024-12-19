import { IBaseResponse } from '../base';
import { ITaskEntity } from '../entity/task';
import {
  IDownloadFigmaParams,
  IDownloadSourceParams,
  IGetAllTaskParams,
  IGetTaskDetailsParams,
  IJoinTaskParams,
  IReportTaskRequest,
  ISubmitSolutionTaskParams,
  ISubmitSolutionTaskRequest,
} from '../request/task';
import {
  IDownloadFigmaResponse,
  IDownloadSourceResponse,
  IGetAllSolutionTaskOfMe,
  IGetAllTaskResponse,
} from '../response/task';

export interface ITaskService {
  getAll: (
    params: IGetAllTaskParams,
  ) => Promise<IBaseResponse<IGetAllTaskResponse>>;

  getDetails: (
    params: IGetTaskDetailsParams,
  ) => Promise<IBaseResponse<ITaskEntity>>;

  join: (params: IJoinTaskParams) => Promise<IBaseResponse<string>>;

  downloadFigma: (
    params: IDownloadFigmaParams,
  ) => Promise<IBaseResponse<IDownloadFigmaResponse>>;
  downloadSource: (
    params: IDownloadSourceParams,
  ) => Promise<IBaseResponse<IDownloadSourceResponse>>;

  submitSolution: (
    params: ISubmitSolutionTaskParams,
    data: ISubmitSolutionTaskRequest,
  ) => Promise<IBaseResponse<string>>;

  getAllSolutionTaskOfMe: () => Promise<IBaseResponse<IGetAllSolutionTaskOfMe>>;

  sendReportTask: (data: IReportTaskRequest) => Promise<IBaseResponse<null>>;
}
