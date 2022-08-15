export interface IGenericResponse<T> {
  status: number;
  message: string;
  code: string;
  data: T;
}
