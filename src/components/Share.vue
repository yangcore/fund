<template>
  <div class="share">
    {{msg}}
  </div>
</template>

<script>
export default {
  name: 'share',
  data () {
    return {
      msg: '分享页面'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
