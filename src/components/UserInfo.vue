<template>
  <div id="user-photo">
    <div
      class="card__header"
    >
      <img
        class="media__obj"
        :src="profile_image"
        style="
                margin: auto .5rem"
      >
      <div>
        <div style="font-size: 18px;">
          {{ userName }}
        </div>
        <div class="created__at">
          Published on {{ created_at }}
        </div>
      </div>
    </div>

    <div class="card_body">
      <div class="image">
        <img :src="Image">
      </div>

      <div class="info">
        <p><i class="fas fa-map-marker-alt" /> {{ location }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {
    user: {
      Object,
      required: true
    }
  },
  computed: {
    userName () {
      return this.user.username ? this.user.username : 'unknown'
    },
    Image () {
      return this.user && this.user.url_photo ? this.user.url_photo : '@image/default.jpg'
    },
    like () {
      return this.user.likes ? this.user.likes : '100'
    },
    created_at () {
      return this.user.created_at ? moment(this.user.created_at).format('DD/MM/YYYY') : '...'
    },
    location () {
      return this.user.location ? this.user.location : 'unsplashy'
    },
    profile_image () {
      return this.user.profile_image ? this.user.profile_image : '@image/like.png'
    }
  }
}
</script>

<style lang='scss'>
#user-photo {
    background-color: #fff;
    width: 70%;
    height: 80%;
    margin: auto;
    margin-top: 40px;
    overflow: auto;
    border-radius: 4px;
    padding-bottom: 2rem;
    p {
      margin-left: .1rem;
      line-height: 1.5;
    }
    .card__header {
      display: inline-flex;
      margin: 1rem;
    }
    .card_body {
      .image{
        text-align: center;
      }
      img {
        min-width: 30%;
        max-width: 100%;
        max-height: 80%;
        object-fit: contain;
        margin: auto;
    }
    }
    .created__at {
      font-size: 13px;
    }
    .info {
      height: 10%;
      margin-left: .9rem;
    }
}

</style>

