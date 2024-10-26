export interface IBaseResponse<T> {
  code: number;
  message:
    | {
        error: {
          [key: string]: string[];
        };
      }
    | string;
  isExpired?: boolean;
  data: T;
}
