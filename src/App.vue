<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view></router-view>
    <div class="box">

    </div>

    <div class="grid2">
      <div class="col-4"></div>
      <div class="col-4"></div>
      <div class="col-4"></div>
    </div>

    <div class="grid2">
      <div class="col-6"></div>
      <div class="col-6"></div>
    </div>

    <div class="grid">
      <div class="col-2"></div>
      <div class="col-4"></div>
      <div class="col-5"></div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      parems: {
        designWidth: 750,
        designUnit: 6,
        columnCount: 12,
        columnXUnit: 7,
        gutterXUnit: 3,
        edgeXUnit: 4,
        className: 'grid'
      }
    }
  },
  mounted() {
    lib.flexible.makeGrid(this.parems)
    // lib.flexible.makeGridMode("750-12");只能用于预设
},
methods: {

}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.box {
  width: 750px;
  height: 100px;
  background: red
}

.grid {
  margin-bottom: 20px
}

.grid div {
  background: gray;
  height: 100px;
}
</style>
