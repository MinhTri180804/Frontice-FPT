export interface IBaseResponse<T> {
  code: number;
  message:
    | {
        error: {
          [key: string]: string[];
        };
      }
    | string;
  isExpires?: boolean;
  data: T;
}
