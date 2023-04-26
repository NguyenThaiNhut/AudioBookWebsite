import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import HowItWorksView from '../views/howitworks/HowItWorks.vue'

import LoginView from '../views/account/Login.vue'
import SignUpView from '../views/account/SignUp.vue'
import InfoAccountView from '../views/account/info/InfoAccount.vue'
import EditInfoAccountView from '../views/account/info/edit/Edit.vue'
import WaitNotifyView from '../views/account/notify/WaitNotify.vue'
import AvailableNotifyView from '../views/account/notify/AvailableNotify.vue'

import GenresView from '../views/genres/Genres.vue'
import DetailGenresView from '../views/genres/detail_genres/DetailGenres.vue'
import DetailBookView from '../views/genres/detail_genres/detail_book/DetailBook.vue'

import AudioBookPlayerView from '../views/audio_book/AudioBookPlayer.vue'

import CartView from '../views/cart/Cart.vue'

import SearchView from '../views/search/Search.vue'

import BestsellerView from '../views/bestseller/Bestseller.vue'
import NewReleasesView from '../views/new_releases/NewReleases.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/how-it-works',
      name: 'how_it_works',
      component: HowItWorksView
    },

    //quản lý user
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/sign-up',
      name: 'sign_up',
      component: SignUpView
    },
    {
      path: '/info-account/:id',
      name: 'info_account',
      component: InfoAccountView
    },
    {
      path: '/info-account/:id/edit',
      name: 'edit',
      component: EditInfoAccountView
    },
    {
      path: '/notify/wait',
      name: 'wait_notify',
      component: WaitNotifyView
    },
    {
      path: '/notify/available',
      name: 'available_notify',
      component: AvailableNotifyView
    },

    // quản lý thể loại
    {
      path: '/genres',
      name: 'genres',
      component: GenresView
    },
    {
      path: '/genres/:id',
      name: 'detail_genres',
      component: DetailGenresView
    },
    {
      path: '/genres/:id/book/:idBook',
      name: 'detail_book',
      component: DetailBookView
    },
    {
      path: '/audio-book-player',
      name: 'audio_book_player',
      component: AudioBookPlayerView
    },

    //giỏ hàng
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },

    // tìm kiếm theo tên sách
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      props: (route) => ({ searchQuery: route.query.q })
    },

    // bán chạy nhất
    {
      path: '/bestseller',
      name: 'bestseller',
      component: BestsellerView
    },
    // mới phát hành
    {
      path: '/new-releases',
      name: 'new_releases',
      component: NewReleasesView
    },

    /*  {
       path: '/about',
       name: 'about',
       // route level code-splitting
       // this generates a separate chunk (About.[hash].js) for this route
       // which is lazy-loaded when the route is visited.
       component: () => import('../views/AboutView.vue')
     } */
  ]
})

export default router
