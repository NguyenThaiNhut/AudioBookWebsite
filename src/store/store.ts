import { createStore } from 'vuex';
import type { Module } from 'vuex';
import { categoryService } from '../service/category_book_service'

const categoryModule = {
  state: () => ({
    categoryList: [],
    bookListByCategory: [],
  }),

  mutations: {
    setCategoryList(state, categoryList) {
      state.categoryList = categoryList;
    },

    setBookListByCategoryMut(state, bookList) {
      state.bookListByCategory = bookList;
    },

  },

  actions: {
    async getCategoryList({ commit }) {
      console.log("thiết lập các thể loại");

      try {
        const { data, status } = await categoryService.getAllCategoryBook();
        if (status == 200) {
          console.log("lấy thể loại thành công");
          commit('setCategoryList', data.Data);
          // console.log(state.categoryList);
        }
        else {
          alert("lấy thể loại thất bại")
        }

      } catch (error) {
        console.log(error);
      }
    },

    // gán id khi nhấp vào 1 thể loại bất kỳ
    setIndexCategoryAct({ commit }, id: number) {
      commit('setIndexCategoryMut', id);
    },

    //lấy toàn bộ sách theo id thể loại
    async getAllBookByCategoryId({ commit }, id: number) {
      try {
        const { data, status } = await categoryService.getAllBookByCategoryId(id);
        if (status == 200) {
          console.log("lấy tất cả sách theo 1 thể loại thành công");
          console.log(data.Data);
          commit('setBookListByCategoryMut', data.Data.Book);
        }
        else {
          console.log("Lấy toàn bộ sách theo 1 thể loại thất bại");
        }
      } catch (error) {
        console.log(error);
      }
    }
  },

  getters: {
    gettersCategoryList: state => state.categoryList,
    allBookbyCategoryGet: state => state.bookListByCategory,
  }
};

interface RootState {
  globalOnLogged: boolean;
  globalUserName: string;
}

//store chính
const store = createStore<RootState>({
  modules: {
    categoryModule,
  },

  state() {
    return {
      globalOnLogged: false, //kiểm tra người dùng đã đăng nhập thành công hay chưa, nếu thành công: true
      globalUserName: "", //tên người dùng khi đăng nhâp thành công
    }
  },

  mutations: {
    //thiết lập giá trị true/false cho biến kiểm tra người dùng đã đăng nhập hay chưa
    setGlobalBooleanTrue(state) {
      state.globalOnLogged = true;
    },
    setGlobalBooleanFalse(state) {
      state.globalOnLogged = false;
    },

    //thiết lập tên người dùng đã đăng nhập
    setglobalUserName(state, userName) {
      state.globalUserName = userName;
    },
  },
  actions: {
    setglobalUserNameAc({ commit }, userName) {
      commit('setglobalUserName', userName);
    },
  },

  getters: {
    globalOnLoggedFunc: state => state.globalOnLogged,
    globalUserNameFunc: state => state.globalUserName,
  },
});

export default store;