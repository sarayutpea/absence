<template>
    <div class="edit-employee">
        <v-card>
            <v-card-title>
            <span class="headline">แก้ไขข้อมูล {{ name }}</span>
            </v-card-title>
            <v-card-text>
            <v-container grid-list-md>
                <v-layout wrap>
                    <v-flex xs12 sm6 md6>
                        <v-text-field label="ชื่อ - นามสกุล" required v-model="newName"></v-text-field>
                    </v-flex>
                    <v-flex xs-12 sm6 md6>
                        <v-text-field label="เงินเดือน" required v-model="newSalary"></v-text-field>
                    </v-flex>
                </v-layout>
            </v-container>   
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click.native="$emit('close')">ยกเลิก</v-btn>
                <v-btn color="blue darken-1" flat @click.native="save()">บันทึก</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "EditEmployee",
    props: ['link', 'salary', 'name'],
    data: ()=>({
        newSalary: 0,
        newName: "Name",
        form: new FormData()
    }),
    methods:{
        save(){
            this.form.append('name', this.newName);
            this.form.append('salary', this.newSalary);
            this.form.append('_method', "put");
            this.$http.post(this.link,this.form).then((data)=>{
                this.$emit('close');
            });
            
        }
    },
    watch: {
        salary(newValue){
            this.newSalary = newValue;
        },
        name(newValue){
            this.newName = newValue;
        }
    }
}
</script>
