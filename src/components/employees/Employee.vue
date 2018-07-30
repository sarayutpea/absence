<template>
    <div class="employee">
        <h3>Employee
            <v-btn small color="primary" @click="showAddEmployee()">
                <v-icon>add</v-icon>
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
                    <v-btn small dark fab color="red" @click="deleteEmployee(props.item.links.employee)">
                        <v-icon>close</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>

        <v-dialog
            v-model="dialog.status"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
        >
            <v-card tile>
                <v-toolbar card dark color="primary">
                    <v-btn icon dark @click.native="closeDialog()">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>{{ dialog.title }} - รายเดือน</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click.native="addTransection()">+ ADD</v-btn>
                    </v-toolbar-items>  
                    
                    </v-menu>
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

        <v-container>
            <v-dialog v-model="addEmployeeDialog.status">
                <AddEmployee @close="addEmployeeDialog.status = false" @save="employeeList()"/>
            </v-dialog>
        </v-container>
    </div>
</template>
<script>
import AddTransection from './AddTransection';
import AddEmployee from './AddEmployee';
    export default{
        name: "Employee",
        components:{
            AddTransection,
            AddEmployee
        },
        data: ()=>({
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
                this.$http.get('http://localhost:8000/api/employees').then((data)=>{
                    let d = JSON.parse(data.bodyText);
                    this.employees = d.data;
                });
                console.log('employee list');
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
                // console.log($event);
                this.showSalary($event, this.dialog.title);
                this.addDialog.status = false;
            },
            addTransection(){
                this.addDialog.status = true;
            },
            deleteEmployee(link){
                this.$http.post(link, {
                   '_method': "delete" 
                },{
                  'Accept': "application/json"  
                }).then(()=>{
                    this.employeeList();
                });
            }
        },
        mounted(){
            this.employeeList();
            this.$root.$emit('title', "รายการพนักงาน");
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