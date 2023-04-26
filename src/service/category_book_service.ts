import type { SaveCategoryBookResponse, CategoryBookRecord } from "@/model/category_book/category_book";
import { ApiClient } from ".";
import type { saveCategoryBookRequest } from "@/model/category_book/request";

class CategoryService extends ApiClient {
  public saveCategoryBook(data: saveCategoryBookRequest) {
    return this.$post<SaveCategoryBookResponse<CategoryBookRecord>>('save', data);
  }

  //lấy toàn bộ thể loại
  public getAllCategoryBook() {
    return this.$get<SaveCategoryBookResponse<CategoryBookRecord>>('all');
  }

  // lấy toàn bộ sách thể 1 thể loại
  public getAllBookByCategoryId(categoryId: number) {
    return this.$get<SaveCategoryBookResponse<CategoryBookRecord>>(categoryId);
  }

}

export const categoryService = new CategoryService("category-book");
