import { IBaseResponse } from '../base';
import { IGetAllTaskParams } from '../request/task';
import { IGetAllTaskResponse } from '../response/task';

export interface ITaskService {
  getAll: (
    params: IGetAllTaskParams,
  ) => Promise<IBaseResponse<IGetAllTaskResponse>>;
}
