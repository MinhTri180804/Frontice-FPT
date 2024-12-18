import { IBaseResponse } from '../base';
import { IGetInformationTaskeeParams } from '../request/taskee';
import { IGetInformationTaskeeResponse } from '../response/taskee';

export interface ITaskeeSerivce {
  getInformation: (
    params: IGetInformationTaskeeParams,
  ) => Promise<IBaseResponse<IGetInformationTaskeeResponse>>;
}
