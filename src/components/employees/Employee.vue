<template>
    <div class="employee">
        <h3>Employee</h3>
        <v-data-table :headers="headers" :items="employees" hide-actions class="elevation-1">
            <template slot="items" slot-scope="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-left">{{ props.item.salary }}</td>
                <td class="text-xs-left">
                    <v-btn small dark fab color="blue" @click="showSalary(props.item.links.salary)">
                        <v-icon>visibility</v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table>
    </div>
</template>
<script>
    export default{
        name: "Employee",
        data: ()=>({
                headers: [
                    { text: 'Name', value: 'name' },
                    { text: 'Salary', value: 'salary' },
                    { text: 'Control', value: 'control' , sortable: false}
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
            showSalary(link){
                console.log(link);
            }
        },
        mounted(){
            this.$http.get('http://localhost:8000/api/employees').then((data)=>{
                data = JSON.parse(data.bodyText);
                this.employees = data.data;
            });
        }


    }
</script>
<style scope>

</style>

