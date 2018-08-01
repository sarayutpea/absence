<template>
    <v-card>
        <v-card-title>
          <span class="headline">พนักงานใหม่</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
                <v-flex xs12 sm6 md6>
                    <v-text-field label="ชื่อ - นามสกุล" required v-model="fullname"></v-text-field>
                </v-flex>
                <v-flex xs-12 sm6 md6>
                    <v-text-field label="เงินเดือน" required v-model="salary"></v-text-field>
                </v-flex>
            </v-layout>
          </v-container>   
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close()">ยกเลิก</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save()">บันทึก</v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {
  name: "AddEmployee",
  data: ()=>({
      fullname: "",
      salary: 0
  }),
  methods:{
      close(){
          this.$emit('close', 'close');
      },
      save(){
          this.$http.post('http://localhost:8000/api/employees',{
              name: this.fullname,
              salary: this.salary
          }).then(()=>{
            this.$emit('save', 'save');
            this.$emit('close', 'close');
          });
          
      }
  },
  mounted(){
  }
}
</script>
<style>
</style>


