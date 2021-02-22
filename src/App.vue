<template>
<div class="app">
  <Header></Header>
  <router-view/>
</div>
</template>

<script>
import Header from './components/Header'
export default {
  name: 'App',
  components: {
    Header
  }
}
</script>

<style lang='scss'>
.app{
  width: 100%;
}
body {
    background-color: #f5f6f7;
    display: flex;
    justify-content: center;
    font-size: 1.3vw;
    @media only screen and (max-width: 700px) {
      font-size: 3vw;
    }
}

</style>
