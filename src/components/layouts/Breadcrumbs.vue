<template>
  <div>
    <v-breadcrumbs>
      <v-icon slot="divider">chevron_right</v-icon>
      <v-btn @click="increaseBreadcrumbs()">ทดลองเพิ่ม</v-btn>
      <v-breadcrumbs-item v-for="item in items" :disabled="item.disabled" :key="item.text" >
        {{ item.text }}
      </v-breadcrumbs-item>
      <v-btn v-if=" items.length > 1 " @click="decreaseBreadcrumbs()">ทดลองลบ</v-btn>
    </v-breadcrumbs>
  </div>
</template>
<script>
  export default {
    name: "Breadcrumbs",
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
      increaseBreadcrumbs(){
        this.items.push({
            text: 'Link ' + this.items.length,
            disabled: true
          });
      },
      decreaseBreadcrumbs(){
        this.items.splice(-1, 1);
      }
    }
  }
</script>
<style scope>

</style>
