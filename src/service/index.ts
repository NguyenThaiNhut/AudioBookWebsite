import type { PlainObject } from "@/model/base";
import type { CommonResponse } from "@/model/xhr";
import { requestParamsFilter } from "@/utils/helper";
import axios from "axios";
import { useCookies } from "vue3-cookies";
import { mapGetters } from 'vuex';

const api = axios.create({
  baseURL: "http://207.148.89.111:3001/api/v1/",
  timeout: 20000,
});

api.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
api.interceptors.request.use((config) => {
  return config;
});

// export async function getFileLength(url: string): Promise<number> {
//   try {
//     const response = await api.head(url);
//     const contentLength = response.headers['content-length'];
//     return parseInt(contentLength, 10);
//   } catch (error) {
//     console.error(error);
//     return 0;
//   }
// }

export class ApiClient {
  private feature: string;

  constructor(feature: string) {
    this.feature = feature;
  }

  // get
  protected $get<T extends CommonResponse>(
    action: string,
    params: PlainObject = {},
    config: PlainObject = {}
  ): Promise<T> {
    return api.get(`/${this.feature}/${action}`, {
      ...config,
      params: requestParamsFilter(params, true),
    });
  }

  //delete
  protected $delete<T extends CommonResponse>(
    action: string,
    params: PlainObject = {},
    config: PlainObject = {}
  ): Promise<T> {
    return api.delete(`/${this.feature}/${action}`, {
      ...config,
      params: requestParamsFilter(params, true),
    });
  }

  //post
  protected $post<T extends CommonResponse>(
    action: string,
    body: Object,
    config: PlainObject = {}
  ): Promise<T> {
    console.log(body);
    return api.post(`/${this.feature}/${action}`, body, {
      ...config,
    });
  }
}
