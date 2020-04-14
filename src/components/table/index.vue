<template>
  <el-table
    v-bind="tableProp"
  >
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: 'ElTableSelf',
  data () {
    return {
      
    }
  },
  methods: {
    
  },
  mounted() {
    
  },
  created () {
    
  },
  components: {
    
  },
  computed: {
    tableProp(){
      return Object.assign(
        {
          'header-cell-style': { 
            background: '#F2F2F2', 
            color: '#000000', 
            fontSize: '14px', 
            fontWeight: '400', 
            borderRight: '1px solid #E6E6E6',
            height: '40px',
            padding: '4px 0',
          },
          stripe: true,
          size: "medium",
          'cell-style': { 
            height: '40px',
            padding: '4px 0',
          }
        },
        this.$attrs
      )
    }

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss' scoped>
  
</style>
