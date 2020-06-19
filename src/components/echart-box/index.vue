<template>
    <div class="m-body">
      <title-bar class="title-bar" color="#ffffff">{{title}}</title-bar>
      <slot></slot>
    </div>
</template>
<script>

export default {
  name: 'EchartBox',
  data () {
    return {

    }
  },
  props: {
    title: {
      type: String,
      require: true
    }
  },
  mounted() {

  },
  methods: {

  },
  computed: {

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
.m-body{
    min-height: 280px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid transparent;
    overflow: hidden;
    border-radius: 5px;
    background: rgba(8, 8, 8, 0.7);
    .title-bar{
      border-bottom: 1px solid #009688;
      padding-left: 12px;
    }
  }
</style>