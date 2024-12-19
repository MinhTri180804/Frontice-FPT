export interface IGetAllTaskParams {
  page?: number | string;
  per_page?: number | string;
}

export interface IGetTaskDetailsParams {
  taskId: string;
}

export interface IDownloadFigmaTaskParams {
  taskId: string;
}

export interface IDownloadAssetsTaskParams {
  taskId: string;
}

export interface IJoinTaskParams {
  taskId: string;
}

export interface IDownloadFigmaParams {
  taskId: string;
}

export interface IDownloadSourceParams {
  taskId: string;
}

export interface ISubmitSolutionTaskRequest {
  title: string;
  github: string;
  live_github: string;
}

export interface ISubmitSolutionTaskParams {
  taskId: string;
}

export interface IGetAllTaskSolutionCommentParams {
  taskId: string;
}

export interface IReportTaskRequest {
  task_id: string;
  reason: string;
}
