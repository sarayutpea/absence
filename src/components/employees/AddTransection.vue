<template>
    <div class="add-transection">
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-toolbar-items>
                    <v-btn flat @click="save">บันทึก</v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
               <v-flex xs12 sm6 >
                    <v-select v-model="monthSelection" :items="items" box label="เลือกเดือนที่ต้องการบันทึก" ></v-select>
                </v-flex>
                <v-flex xs12 sm6 >
                    <v-text-field prepend-icon="attach_file" single-line
                                v-model="file.filename" :label="file.label" :required="file.required"
                                @click.native="onFocus"
                                :disabled="file.disabled" ref="fileTextField"></v-text-field>
                    <input type="file" :accept="file.accept" :multiple="false" :disabled="file.disabled"
                        ref="fileInput" @change="onFileChange">
                </v-flex>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    name:"AddTransection",
    props:{
        link:String
    },
    data:()=>({
        monthSelection: 0,
        items:[
            { value: 1, text: "มกราคม" },
            { value: 2, text: "กุมพาพันธ์" },
            { value: 3, text: "มีนาคม" },
            { value: 4, text: "เมษายน" },
            { value: 5, text: "พฤษภาคม" },
            { value: 6, text: "มิถุนายน" },
            { value: 7, text: "กรกฏาคม" },
            { value: 8, text: "สิงหาคม" },
            { value: 9, text: "กันยายน" },
            { value: 10, text: "ตุลาคม" },
            { value: 11, text: "พฤศจิกายน" },
            { value: 12, text: "ธันวาคม" },
        ],
        file:{
            value: [],
            accept: ".csv",
            label: "กรุณาเลือกไฟล์ .csv",
            required: false,
            disabled: false,
            multiple: false,
            filename: ""
        },
        form: new FormData(),
        auth: ""
    }),
    watch:{
        value(v){
            this.filename = v;
        }
    },
    mounted() {
        this.filename = this.value;
        this.$on('input', ($event)=>{
            this.file.label = $event;
        });

        this.$on('formData', ($event)=>{
            if(this.form.get('file') !== null){
                this.form.set('file', $event.get('file'));
            }else{
                this.form.append('file', $event.get('file'));
            }
        });
    },
    methods:{
        save(){
            if(this.form.get('month') !== null){
                this.form.set('month', this.monthSelection);
            }else{
                this.form.append('month', this.monthSelection);
            }

            if(this.form.get('month') !== null && this.form.get('file') !== null){
                this.$http.post(this.link, this.form).then((response)=>{
                    this.$emit('saveTransection', response.data.data.links);
                });
            }else{
                console.log("ไม่มีไฟล์ หรือ ไม่ได้เลือกเดือน");
            }
            
        },
        getFormData(files){
            const data = new FormData();
            [...files].forEach(file => {
                data.append('file', file, file.name); // currently only one file at a time
            });
            return data;
        },
        onFocus(){
            if (!this.disabled) {
                // debugger;
                this.$refs.fileInput.click();
            }
        },
        onFileChange($event){
            const files = $event.target.files || $event.dataTransfer.files;
            const form = this.getFormData(files);
            if (files) {
                if (files.length > 0) {
                    this.filename = [...files].map(file => file.name).join(', ');
                } else {
                    this.filename = null;
                }
            } else {
                this.filename = $event.target.value.split('\\').pop();
            }
            this.$emit('input', this.filename);
            this.$emit('formData', form);
        }
    },
    created(){
        let month = new Date();
        this.monthSelection = month.getMonth();
        this.auth = localStorage.getItem('auth');
    }
}
</script>
<style scoped>
input[type=file] {
    position: absolute;
    left: -99999px;
}
</style>



