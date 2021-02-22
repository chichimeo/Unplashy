<template>
  <div class="pagination">
    <div class="pagination__left">
      <a
        v-if="hasPrev()"
        href="#"
        @click="changePage(prevPage)"
      >Prev</a>
    </div>
    <div class="pagination__mid">
      <ul>
        <li v-if="hasFirst()">
          <a
            href="#"
            @click="changePage(1)"
          >1</a>
        </li>
        <li v-if="hasFirst()">
          ...
        </li>
        <li
          v-for="page in pages"
          :key="page.id"
        >
          <a
            href="#"
            :class="{ current: current == page}"
            @click="changePage(page)"
          >
            {{ page }}
          </a>
        </li>
        <li v-if="hasLast()">
          ...
        </li>
        <li v-if="hasLast()">
          <a
            href="#"
            @click="changePage(totalPages)"
          >{{ totalPages }}</a>
        </li>
      </ul>
    </div>
    <div class="pagination__right">
      <a
        v-if="hasNext()"
        href="#"
        @click="changePage(nextPage)"
      >Next</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 9
    },
    pageRange: {
      type: Number,
      default: 2

    }
  },
  computed: {
    pages: function () {
      let pages = []

      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i)
      }

      return pages
    },
    rangeStart: function () {
      let start = this.current - this.pageRange

      return (start > 0) ? start : 1
    },
    rangeEnd: function () {
      let end = this.current + this.pageRange

      return (end < this.totalPages) ? end : this.totalPages
    },
    totalPages: function () {
      return Math.ceil(this.total / this.perPage)
    },
    nextPage: function () {
      return this.current + 1
    },
    prevPage: function () {
      return this.current - 1
    }
  },
  methods: {
    hasFirst: function () {
      return this.rangeStart !== 1
    },
    hasLast: function () {
      return this.rangeEnd < this.totalPages
    },
    hasPrev: function () {
      return this.current > 1
    },
    hasNext: function () {
      return this.current < this.totalPages
    },
    changePage: function (page) {
      this.$emit('page-changed', page)
    }
  }
}
</script>

<style lang='scss'>
@mixin pagination_left_right($float){
    widows: 20%;
    float:$float;
}
.pagination {
    height: 44px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto 60px;
    padding: 30px 15px;
    .pagination__left {
        @include pagination_left_right(left);
    }
    .pagination__right {
        @include pagination_left_right(right);
    }
    span {
        display: block;
        text-align: center;
        font: {
            family:Helvetica, Arial, sans-serif;
            weight: 300;
        }
        line-height: 42px;
        height: 44px;
        color: #70757a;
    }
    a{
        @extend span;
        padding: 0 20px;
        max-width: 160px;
        background-color: transparent;
        border-radius: 5px;
        text-decoration: none;
        margin: 0 6px;
        transition: all .2s ease-in-out;
        &:hover,&.current{
            color: black;
        }
    }
    .pagination__mid {
        display: flex;
        justify-content: center;
        width: 60%;
        ul {
            list-style: none;
            padding: 0;
            margin: 0;
            li {
                display: inline-block;
            }
        }

    }
}
</style>
