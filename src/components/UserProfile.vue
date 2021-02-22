<template>
  <div id="user">
    <div
      v-if="loading"
      class="loading"
    >
      <i class="fas fa-spinner" />
    </div>
    <div
      v-if="loading==false"
      class="user"
    >
      <div class="info__user">
        <img
          :src="Image"
          class="media__user"
        >
        <div class="user__info">
          <div class="user__name">
            {{ userName }}
          </div>
          <p>{{ portfolio_url }}</p>
          <p>{{ bio }}</p>
        </div>
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
  </div>
</template>
<script>
import Pagination from './Pagination'
import api from '../api/config'

export default {
  name: 'User',
  components: {
    pagination: Pagination
  },
  data () {
    return {
      photos: [],
      totalPhotos: 0,
      perPage: 12,
      currentPage: 1,
      keyword: '',
      searchMode: false,
      userinfo: {},
      username: this.$route.params.username,
      loading: true
    }
  },
  computed: {
    hasImage () {
      return this.userinfo && this.userinfo.urls && this.userinfo.urls.small
    },
    Image () {
      return this.hasImage ? this.userinfo.urls.small : '../image/default.jpg'
    },
    userName () {
      return this.userinfo && this.userinfo.user && this.userinfo.user.name ? this.userinfo.user.name : 'unknown'
    },
    portfolio_url () {
      return this.userinfo && this.userinfo.user && this.userinfo.user.portfolio_url ? this.userinfo.user.portfolio_url : ''
    },
    bio () {
      return this.userinfo && this.userinfo.user && this.userinfo.user.bio ? this.userinfo.user.bio : ''
    }
  },
  created () {
    this.getData(this.currentPage)
  },
  methods: {
    fetchPhotosUser (page) {
      this.loading = true
      api.fetchPhotos(page, this.perPage, `users/${this.username}/photos`)
        .then(res => {
          this.photos = res.data
          if (this.photos.length > 0) {
            this.userinfo = this.photos[0]
          }
          var myHeaders = new Headers(res.headers)
          this.totalPhotos = parseInt(myHeaders.get('x-total'))
          this.currentPage = page
          this.loading = false
        })
    },
    getData (page) {
      this.fetchPhotosUser(page)
    }
  }
}
</script>
<style lang='scss'>
.info__user {
    padding: {
      top: 20px;
      bottom: 60px
    }
    text-align: center;
    img {
      -webkit-border-radius: 50%;
      width: 20rem;
      height: 20rem;
    }
    .user__info {
      width: 60%;
      margin: auto;
      .user__name {
          padding-top: 10px;
          font-family: bold;
          text-transform: uppercase;
      }
    }
}
</style>
