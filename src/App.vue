<template>
  <div class="app">
    <Master />
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import Master from './components/layouts/Master'

export default {
  name: 'App',
  components: {
    Master
  },
  data () {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>
