<template>
  <div class="all">
    <p  v-for="(item, index) in items" 
        v-bind:key="item.id" class="title">
        {{item.title}}
    </p>
  </div>
</template>

<script>
import { Group, Cell } from 'vux';
export default {
  name: 'all',
  data() {
    return {
      items: []
    }
  },
  components: {
    Group,
    Cell
  },
  mounted() {
    this.getAllInfo();
     console.info(this.$route);
  },
  methods: {
    getAllInfo() {
      let _this=this;
      this.get({
        url: '/topics',
        params: {
          page: 1,
          tab: "",
          limit: 20
        }, success: function(data) {
          _this.items = data;
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.title{
  width: 710px;
  font-size: 30px;
  color: #666666;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  margin: 0 auto;
  padding:20px 0 20px 0;
  border-bottom: 2px solid #e1e1e1;
}
</style>

