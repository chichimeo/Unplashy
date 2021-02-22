<template>
  <div class="header">
    <div class="menu">
      <label for="toggle">&#9776;</label>
      <input
        id="toggle"
        type="checkbox"
      >
      <div class="menu_list">
        <ul class="menu__list">
          <li class="menu__item">
            <router-link
              tag="a"
              class="menu__link"
              to="/"
            >
              Home
            </router-link>
          </li>
          <li class="menu__item">
            <router-link
              tag="a"
              class="menu__link"
              to="/about"
            >
              About
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
  .header {
    background-color: #dddfdf;
    color: #70757a;
    font-size: 1.6vw;
    .menu {
      display: inline-block;
      ul {
        list-style-type: none;
        margin-right: 40px;
        li {
          display: inline-block;
          color: rgb(218, 218, 218);
          margin: 0 10px;
          cursor: pointer;
          a {
            text-decoration: none;
            color: #999;
            &:hover,&:active {
              color: black;
            }
          }
        }
      }
      label {
        font-size: 20px;
        line-height: 40px;
        margin-right: 40px;
        cursor: pointer;
        display: none;
        float: right;
      }
      #toggle {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 700px) {
    .header {
      font-size: 3.3vw;
      .menu {
        width: 100%;
        .menu_list {
          display: none;
          li {
          text-align: center;
          display: block;
          margin: 0;
          border-bottom: 1px solid white;
          }
        }
        label {
        display: block;
        cursor: pointer;
        }
        #toggle:checked+.menu_list {
          display: block;
        }
      }
    }
  }
</style>
<style lang='scss'>
  .header {
    background-color: #dddfdf;
    color: #70757a;
    font-size: 1.6vw;
    .menu {
      display: inline-block;
      ul {
        list-style-type: none;
        margin-right: 40px;
        li {
          display: inline-block;
          color: rgb(218, 218, 218);
          margin: 0 10px;
          cursor: pointer;
          a {
            text-decoration: none;
            color: #999;
            &:hover,&:active {
              color: black;
            }
          }
        }
      }
      label {
        font-size: 20px;
        line-height: 40px;
        margin-right: 40px;
        cursor: pointer;
        display: none;
        float: right;
      }
      #toggle {
        display: none;
      }
    }
  }
  @media only screen and (max-width: 700px) {
    .header {
      font-size: 3.3vw;
      .menu {
        width: 100%;
        .menu_list {
          display: none;
          li {
          text-align: center;
          display: block;
          margin: 0;
          border-bottom: 1px solid white;
          }
        }
        label {
        display: block;
        cursor: pointer;
        }
        #toggle:checked+.menu_list {
          display: block;
        }
      }
    }
  }
</style>
