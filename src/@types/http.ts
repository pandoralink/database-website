// POST 包含 post, delete, put
export interface PostResponse {
  status: number;
  statusText: string;
  data: Result;
}

// GET
export interface GetResponse {
  status: number;
  statusText: string;
  data: {
    data?: any;
  };
}

// 接口响应通过格式
export type HttpResponse = GetResponse | PostResponse;

export interface Result {
  code: number;
  msg: string;
  data?: any;
}
