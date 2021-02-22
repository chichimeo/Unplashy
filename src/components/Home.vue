<template>
  <div id="app">
    <div
      v-if="loading"
      class="loading"
    >
      <i class="fas fa-spinner" />
    </div>
    <div
      v-if="loading===false"
      class="app"
    >
      <div
        v-if="lazyLoad"
        class="container"
      >
        <div class="wrap">
          <div class="search">
            <input
              v-model="keyword"
              type="text"
              class="searchTerm"
              placeholder="What are you looking for?"
            >
            <button
              type="submit"
              class="searchButton"
              @click="search()"
            >
              Search
            </button>
          </div>
        </div>

        <div class="data">
          <h1> Unplashy</h1>
          <div>The internet’s source of freely usable images. Powered by creators everywhere</div>
          <div>Trending: flower, wallpapers, backgrounds, happy, love</div>
        </div>

        <section
          v-if="photos.length > 1"
          class="grid"
        >
          <div class="grid__colum">
            <div
              v-for="(photo,index) in photos"
              v-if="index%3===0"
              :key="photo.id"
              class="grid__item card"
              :index="index"
            >
              <div class="card__body">
                <img
                  :src="photo.urls.small"
                  alt="img"
                  href=""
                  @click="modalAction(photo.user.name,photo.user.profile_image.small, photo.urls.small, photo.created_at, photo.user.location,photo.likes)"
                >
              </div>
              <div class="card__footer media">
                <img
                  :src="photo.user.profile_image.small"
                  alt="user"
                  class="media__obj"
                >
                <div class="media__body">
                  <router-link
                    tag="a"
                    :to="{ name: 'user', params: { username: photo.user.username }}"
                  >
                    {{ photo.user.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="grid__colum">
            <div
              v-for="(photo,index) in photos"
              v-if="index%3===1"
              :key="photo.id"
              class="grid__item card"
              :index="index"
            >
              <div class="card__body">
                <img
                  :src="photo.urls.small"
                  alt="img"
                  href=""
                  @click="modalAction(photo.user.name,photo.user.profile_image.small, photo.urls.small, photo.created_at, photo.user.location,photo.likes)"
                >
              </div>
              <div class="card__footer media">
                <img
                  :src="photo.user.profile_image.small"
                  alt="user"
                  class="media__obj"
                >
                <div class="media__body">
                  <router-link
                    tag="a"
                    :to="{ name: 'user', params: { username: photo.user.username }}"
                  >
                    {{ photo.user.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
          <div class="grid__colum">
            <div
              v-for="(photo,index) in photos"
              v-if="index%3===2"
              :key="photo.id"
              class="grid__item card"
              :index="index"
            >
              <div class="card__body">
                <img
                  :src="photo.urls.small"
                  alt="img"
                  href=""
                  @click="modalAction(photo.user.name,photo.user.profile_image.small, photo.urls.small, photo.created_at,photo.user.location, photo.likes)"
                >
              </div>
              <div class="card__footer media">
                <img
                  :src="photo.user.profile_image.small"
                  alt="user"
                  class="media__obj"
                >
                <div class="media__body">
                  <router-link
                    tag="a"
                    :to="{ name: 'user', params: { username: photo.user.username }}"
                  >
                    {{ photo.user.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <pagination
          :current="currentPage"
          :total="totalPhotos"
          :per-page="perPage"
          @page-changed="getData"
        />
      </div>
      <div
        v-if="showModal"
      >
        <div class="modal">
          <button
            class="modal-default-button"
            @click="showModal=false"
          >
            X
          </button>
          <user-info
            :user="dataModal"
            style="margin-bottom:50px"
            @close="modalAction"
          />
          <div />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination'
import api from '../api/config'
import UserInfo from '../components/UserInfo'

export default {
  name: 'Home',
  components: {
    Pagination,
    UserInfo
  },
  data () {
    return {
      photos: [],
      totalPhotos: 0,
      perPage: 12,
      currentPage: 1,
      keyword: '',
      searchMode: false,
      showModal: false,
      dataModal: {
        username: '',
        profile_image: '',
        url_photo: '',
        created_at: '',
        location,
        likes: 0
      },
      userinfo: {},
      loading: true
    }
  },
  created () {
    this.getData(this.currentPage)
    this.lazyLoad = true
  },
  methods: {
    fetchPhotosHome (page) {
      this.loading = true
      api.fetchPhotos(page, this.perPage, 'photos').then(res => {
        this.photos = res.data
        var myHeaders = new Headers(res.headers)
        this.totalPhotos = parseInt(myHeaders.get('x-total'))
        this.currentPage = page
        this.loading = false
      })
    },
    search (page) {
      this.searchMode = true
      api.search(page, this.keyword, this.perPage)
        .then(res => {
          this.photos = res.data.results
          this.totalPhotos = parseInt(res.data.total)
          this.currentPage = page
        })
        .catch(err => console.log(err))
    },
    getData (page) {
      if (this.searchMode) {
        this.search(page)
      } else {
        this.fetchPhotosHome(page)
      }
    },
    modalAction: function (username, profileImage, urlPhoto, createdAt, location, like) {
      if (this.showModal === false) {
        this.showModal = true
        this.dataModal.username = username
        this.dataModal.profile_image = profileImage
        this.dataModal.url_photo = urlPhoto
        this.dataModal.created_at = createdAt
        this.dataModal.location = location
        this.dataModal.likes = like
      } else {
        this.showModal = false
      }
    }
  }
}
</script>
<style lang='scss'>
.loading {
    text-align: center;
}

.data {
    text-align: center;
    margin: 3rem;
    line-height: 1.5;
    font-weight: 400;
}

.wrap {
  width: 30%;
  margin: 20px auto;
  padding-bottom: 20px;
  .search {
    width: 100%;
    position: relative;
    display: flex;
    top: 0px;
    .searchTerm {
      width: 100%;
      border: 2px solid #d4d6d6;
      border-right: none;
      padding: 5px;
      border-radius: 5px 0 0 5px;
      outline: none;
      color: #9dbfaf;
      &:focus{
        color: black;
      }
    }
    .searchButton {
      width: auto;
      height: 36px;
      border: 1px solid #d4d6d6;
      background: #dddfdf;
      text-align: center;
      color: #70757a;
      border-radius: 0 5px 5px 0;
      cursor: pointer;
      &:hover{
        color: black;
      }
    }

  }
  @media only screen and (max-width: 700px) {
    width: 70%;
  }
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: rgb(95, 93, 93);
    font-size: 16px;
    background-color: rgba(0, 0, 0, 0.5);
    .modal-default-button {
      width: 30px;
      height: 30px;
      margin: {
        top: 20px;
        right: 20px;
      }
      background-color: transparent;
      color: #fff;
      float: right;
      border: none;
    }
}


@import '../css/_colum_image.scss'
</style>