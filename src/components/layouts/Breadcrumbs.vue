<template>
  <div>
    {{ title }}
  </div>
</template>
<script>
  export default {
    name: "Breadcrumbs",
    props:{
      title: String
    },
    data: ()=> {
      return {
        items: [
          {
            text: 'Dashboard',
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
