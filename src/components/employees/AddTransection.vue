<template>
    <div class="add-transection">
        <v-card tile>
            <v-toolbar card dark color="primary">
                <v-toolbar-items>
                    <v-btn flat @click="save">SAVE</v-btn>
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
    data:()=>({
        monthSelection: { value: 1 },
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
            label: "Please choose...",
            required: false,
            disabled: false,
            multiple: false,
            filename: ""
        },
        form: new FormData()
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
            this.file.value = $event;
            this.file.value.append('month', this.monthSelection.value);
            this.form = this.file.value;
            // console.log(this.file.value.get('month'));
        });
    },
    methods:{
        save(){
            // form = new FormData();
            // form.append('')

            this.$emit('saveTransection', 'emit - saveTransection');
            console.log(this.form.get('file'));
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
        this.monthSelection.value = month.getMonth();
    }
}
</script>
<style scoped>
input[type=file] {
    position: absolute;
    left: -99999px;
}
</style>



