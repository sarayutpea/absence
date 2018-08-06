<template>
    <div class="employee">
        <h3>รายการพนักงาน
            <v-btn small flat color="primary" @click="showAddEmployee()">
                <v-icon>add</v-icon> เพิ่ม
            </v-btn>
        </h3>
        <v-data-table :headers="headers" :items="employees" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.salary }}</td>
                <td class="text-xs-left">
                    <v-btn small dark fab color="blue" @click="showSalary(props.item.links.salary, props.item.name)">
                        <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn small dark fab color="primary" @click="editDialog.status = true, 
                                                                  editDialog.link = props.item.links.employee,
                                                                  editDialog.name = props.item.name,
                                                                  editDialog.salary = props.item.salary">
                        <v-icon>
                            edit
                        </v-icon>
                    </v-btn>
                    <v-btn small dark fab color="red" @click="deleteConfirm.status = true, deleteConfirm.link = props.item.links.employee, deleteConfirm.name = props.item.name">
                        <v-icon>close</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

        <v-dialog v-model="dialog.status" fullscreen hide-overlay transition="dialog-bottom-transition" scrollable>
            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon dark @click.native="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ dialog.title }} - รายเดือน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="addTransection()">+ เพิ่ม</v-btn>
                    </v-toolbar-items>  
                </v-toolbar>
                <v-card-text>
                    <v-list>
                        <v-data-table :headers="dialog.dataTable.headers" :items="dialog.dataTable.months">
                            <template slot="items" slot-scope="props">
                                <td>{{ props.item.date }}</td>
                                <td>{{ props.item.all_late }}</td>
                                <td>{{ props.item.all_absence }}</td>
                                <td>{{ props.item.all_lost_money }}</td>
                                <td>{{ props.item.all_extend_money }}</td>
                                <td>{{ props.item.net }}</td>
                                <td>
                                    <v-btn small dark fab color="blue" @click="showWorktimes(props.item.links.worktimes, dialog.title)">
                                        <v-icon>list</v-icon>
                                    </v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </v-list>
                </v-card-text>

                <div style="flex: 1 1 auto;"></div>
            </v-card>
        </v-dialog>

        <v-dialog v-model="worktimeDialog.status" transition="dialog-bottom-transition" scrollable >
            <v-card  tile>
                <v-toolbar card dark color="gray">
                    <v-btn icon dark @click.native="closeWorktimeDialog()">
                        <v-icon>close</v-icon>
                        </v-btn>
                        <v-toolbar-title>{{ worktimeDialog.title }} - รายวัน</v-toolbar-title>
                    
                </v-toolbar>
                <v-card-text>
                    <v-data-table :headers="worktimeDialog.dataTable.headers" :items="worktimeDialog.dataTable.days">
                        <template slot="items" slot-scope="props">
                            <td>{{ props.item.work_date }}</td>
                            <td>{{ props.item.checked_in }}</td>
                            <td>{{ props.item.checked_out }}</td>
                            <td>{{ props.item.late_minutes }}</td>
                            <td>{{ props.item.late_over_15_minutes }}</td>
                            <td>{{ props.item.lost_money }}</td>
                            <td>{{ props.item.work_over }}</td>
                            <td>{{ props.item.extend_money }}</td>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-dialog v-model="addDialog.status" transition="dialog-bottom-transition">
            <AddTransection :link="worktimeDialog.link" @saveTransection="updateDialog($event)" />
        </v-dialog>

        <v-dialog v-model="addEmployeeDialog.status" max-width="500">
            <AddEmployee :link="employeeUrl" @close="addEmployeeDialog.status = false" @save="employeeList()"/>
        </v-dialog>
        <v-dialog v-model="editDialog.status" max-width="500">
            <EditEmployee :show="editDialog.status" :link="editDialog.link"
                          :name="editDialog.name"
                          :salary="editDialog.salary"
                          @close="editDialog.status = false, employeeList()"/>
        </v-dialog>

        <v-dialog v-model="deleteConfirm.status" max-width="500">
            <v-card>
                <v-card-title class="headline">ลบพนักงาน</v-card-title>

                <v-card-text>
                    ต้องการลบพนักงาน {{ deleteConfirm.name }} หรือไม่
                </v-card-text>

                <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="deleteConfirm.status = false"
                >
                    ยกเลิก
                </v-btn>

                <v-btn
                    color="green darken-1"
                    flat="flat"
                    @click="deleteEmployee(deleteConfirm.link)"
                >
                    ยืนยัน
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import AddTransection from './AddTransection';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
    export default{
        name: "Employee",
        components:{
            AddTransection,
            AddEmployee,
            EditEmployee
        },
        data: ()=>({
                employeeUrl: "https://tumabsence.crispyrices.com/api/employees",
                dialog: {
                    status: false,
                    title: "Salaries",
                    menus:[
                        {
                            title: "1",
                            link: "#"
                        }
                    ],
                    dataTable:{
                        
                        headers:[
                            { text: "เดือน/ปี", value: "date" },
                            { text: "มาสาย", value: "all_late" },
                            { text: "ขาดงาน", value: "all_absence" },
                            { text: "หักเงิน", value: "all_lost_money" },
                            { text: "เงินOT", value: "all_extend_money" },
                            { text: "เงินได้สุทธิ", value: "net" },
                            { text: "", value: "control" , sortable: false},
                        ],
                        months:[
                            { 
                                value: false,
                                date: "1/1/1999",
                                all_late: "0",
                                all_absence: "0",
                                all_lost_money: "0",
                                all_extend_money: "0",
                                net: "0"
                            }
                        ]
                    }
                },
                worktimeDialog:{
                    status: false,
                    title: "Worktimes",
                    dataTable:{
                        headers:[
                            { text: "วันที่", value: "work_date" },
                            { text: "เข้างาน", value: "checked_in" },
                            { text: "เลิกงาน", value: "checked_out" },
                            { text: "สาย", value: "late_minutes" },
                            { text: "สายเกิน 15 นาที", value: "late_over_15_minutes" },
                            { text: "หักเงิน", value: "lost_money" },
                            { text: "OT", value: "work_over" },
                            { text: "เงิน OT", value: "extend_money" }
                        ],
                        days:[
                            {   
                                employee: "",
                                work_date: "",
                                checked_in: "",
                                checked_out: "",
                                late_minutes: "",
                                late_over_15_minutes: "",
                                lost_money: "",
                                work_over: "",
                                extend_money: ""
                            }
                        ]

                    },
                    link:""
                },
                addDialog:{
                    status: false

                },
                addEmployeeDialog:{
                    status: false
                },
                deleteConfirm:{
                  status: false,
                  links: "",
                  name: "",
                  form: new FormData()
                },
                editDialog:{
                    status: false,
                    name: "",
                    salary: 0,
                    links: ""
                },
                headers: [
                    { text: 'ชื่อ', value: 'name' },
                    { text: 'ฐานเงินเดือน', value: 'salary' },
                    { text: '', value: 'control' , sortable: false}
                ],
                employees: [
                    {
                        value: false,
                        name: 'name',
                        salary: 'salary',
                    }
                ]
            }),
        methods:{
            employeeList(){
                console.log(sessionStorage.getItem('auth'));
                this.$http.get(this.employeeUrl,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': sessionStorage.getItem('auth')
                    }
                }).then((data)=>{
                    let d = JSON.parse(data.bodyText);
                    this.employees = d.data;
                });
            },
            showAddEmployee(){
                this.addEmployeeDialog.status = true;
            },
            showSalary(link, name){
                this.worktimeDialog.link = link;
                this.$http.get(link).then((data)=>{
                    this.dialog.dataTable.months = JSON.parse(data.bodyText).data;
                    this.dialog.title = name;
                });
                this.dialog.status = true;
            },
            showWorktimes(link, name){
                this.$http.get(link).then((data)=>{
                    let d = JSON.parse(data.bodyText);
                    this.worktimeDialog.dataTable.days = d.data;
                    this.worktimeDialog.title = name;
                });
                this.worktimeDialog.status = true;

                
            },
            closeWorktimeDialog(){
                this.worktimeDialog.status = false;
            },
            closeDialog(){
                this.dialog.status = false;
                this.dialog.dataTable.months = [];
            },
            updateDialog($event){
                this.showSalary($event, this.dialog.title);
                this.addDialog.status = false;
            },
            addTransection(){
                this.addDialog.status = true;
            },
            deleteEmployee(link){
                this.deleteConfirm.form.append('_method', "delete");
                this.$http.post(link, this.deleteConfirm.form).then((data)=>{
                    this.employeeList();
                    this.deleteConfirm.status = false;
                })
            }
        },
        mounted(){
            this.employeeList();
            this.$root.$emit('title', "รายการพนักงาน");
            this.$root.$on('auth', (event)=>{
                this.employeeList();
            });
        }


    }
</script>
<style scope>
.list-animation-enter-active{
    animation: list-in;
    animation-duration: 1s;
}
.list-animation-leave-active{
    animation: list-out;
    animation-duration: 1s;
}

@keyframes list-in {
    0%{
        opacity: 0;
        height: 0px;
    }
    100%{
        opacity: 1;
        height: auto;
    }
}

@keyframes list-out {
    0%{
        opacity: 1;
        height: auto;
    }
    100%{
        opacity: 0;
        height: 0px;
    }
}
</style>