<template>
    <div class="Mask" v-show="maskShow" >
    </div>
</template>
<script>
    export default {
    name: 'ymask',
    data(){
        return{
        }
    },
    props:["maskShow"]
    }
</script>
<style lang="less" scoped>
.Mask{
    width:750px;
    height:100%;
    background:#f7faff;
    position: absolute;
    top: 0;
    background: black;
    z-index: 40000;
    opacity: 0.5;
}
</style>
