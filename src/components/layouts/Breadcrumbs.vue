<template>
  <div>
    {{ title }}
  </div>
</template>
<script>
  export default {
    name: "Breadcrumbs",
    props:{
      title: String,
      default: ""
    },
    data: ()=> {
      return {
        items: [
          {
            disabled: false
          }
        ],
        number: 1
      }
    },
    methods: {
      
    }
  }
</script>
<style scope>

</style>
