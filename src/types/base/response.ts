export interface IBaseResponse<T> {
  code: number;
  message:
    | {
        error: {
          [key: string]: string[];
        };
      }
    | string;
  data: T;
}
