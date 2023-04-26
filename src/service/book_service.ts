import type { SaveCategoryBookResponse, CategoryBookRecord } from "@/model/category_book/category_book";
import { ApiClient } from ".";
import type { saveCategoryBookRequest } from "@/model/category_book/request";
import qs from 'qs';

class BookService extends ApiClient {

    // lấy 1 sách theo 1 thể loại
    public getBookId(bookId: number) {
        return this.$get<SaveCategoryBookResponse<CategoryBookRecord>>(bookId);
    }

    // lấy tất cả sách
    public getAllBook() {
        return this.$get<SaveCategoryBookResponse<CategoryBookRecord>>('all');
    }

    // tìm kiếm theo tên sách
    public getBookSearch(searchQuery?: string) {
        const config = {
            params: {},
            paramsSerializer: (params: any) => {
                return qs.stringify(params);
            },
        };

        if (searchQuery) {
            config.params = { name: searchQuery };
        }

        return this.$get<SaveCategoryBookResponse<CategoryBookRecord>>('search', config.params);
    }

}

export const bookService = new BookService("book");
