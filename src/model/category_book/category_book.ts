import type { CommonResponse } from "../xhr";
export interface SaveCategoryBookResponse<T extends CategoryBookRecord> extends CommonResponse {
  data: T;
  code: string;
  status: number;
}

export interface CategoryBookRecord {
  data: Category;
  success: boolean;
  message: string;
}
export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
} 
