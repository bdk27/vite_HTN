<script setup lang="ts">
    import {  ref, watch, reactive, onMounted } from 'vue';
    import { nanoid } from "nanoid";

    const lsData = localStorage.getItem('HTNTable');
    const HTNData = reactive(lsData ? JSON.parse(lsData) : []);
    let day = ref(1);
    let date = ref('');

    //class
    interface FormProps {
        sys: number
        dia: number
        pulse: number
        note: string
        status: string
        isEdit: boolean
    }
    class Form implements FormProps{
        sys: number
        dia: number
        pulse: number
        note: string
        status: string
        isEdit: boolean
    
        constructor(sys: number,dia: number,pulse: number,note: string, status: string, isEdit: boolean) {
            this.sys = sys
            this.dia = dia
            this.pulse = pulse
            this.note = note
            this.status = status
            this.isEdit = isEdit
        }
    }  

    //生成資料
    interface Data {
        id: string
        day: number
        editDate: boolean
        date: string
        morning: Form
        night: Form
    }
    function addData() {
        const data: Data = {
            id: nanoid(),
            day: day.value,
            editDate: true,
            date: date.value,
            morning: reactive(new Form(0, 0, 0, '', '', false)),
            night: reactive(new Form(0, 0, 0, '', '', false)),
        }
        day.value ++;
        HTNData.push(data);

        //進行狀態監視
        HTNData.forEach((item: Data) => {
            watch(item.morning, (n: Form) => {
                checkStatus(n);
            });
            watch(item.night, (n: Form) => {
                checkStatus(n);
            })
        })
    }

    //編輯與更新
    function editInfo(element: Form) {
        element.isEdit = true;
    }
    function updateInfo(element: Form) {
        element.isEdit = false;
    }
    
    //檢測狀態
    function checkStatus(period: FormProps) {
        if(period.sys >= 160 || period.dia >= 100) {
            period.status = 'd-red';
        }else if((period.sys >= 140 && period.sys <= 159) || (period.dia >= 90 && period.dia <= 99)) {
            period.status = 'red';
        }else if((period.sys >= 120 && period.sys <= 139) || (period.dia >= 80 && period.dia <= 89)) {
            period.status = 'yellow';
        }else if(period.sys < 120 && period.dia < 80) {
            period.status = 'green';
        }
    }

    //監視HTNData
    watch(HTNData, (value) => {
        localStorage.setItem('HTNTable', JSON.stringify(value));
    })

    //頁面自動到最底部
    onMounted(() => {
        window.scrollTo(0, document.body.scrollHeight);
    })
   
</script>

<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">日期</th>
                <th scope="col">時間</th>
                <th scope="col">狀態</th>
                <th scope="col">收縮壓</th>
                <th scope="col">舒張壓</th>
                <th scope="col">心率</th>
                <th scope="col">#備註</th>
                <th scope="col">編輯</th>
            </tr>
        </thead>
        <tbody v-for="item in HTNData" :key="item.id" :class="item.day%2===0 ? 'evenBg' : 'none'">
            <tr>
                <th scope="row" rowspan="2" v-show="item.morning.isEdit===false && item.night.isEdit===false"><span>{{ item.date }}</span></th>
                <th scope="row" rowspan="2" v-show="item.morning.isEdit===true || item.night.isEdit===true"><input type="date" v-model="item.date"></th>
                <td>早上</td>
                <td><div class="circle" :class="item.morning.status"></div></td>
                <td v-show="item.morning.isEdit===false"><span >{{ item.morning.sys }}</span></td>
                <td v-show="item.morning.isEdit===true"><input type="number" v-model="item.morning.sys"></td>
                <td v-show="item.morning.isEdit===false"><span >{{ item.morning.dia }}</span></td>
                <td v-show="item.morning.isEdit===true"><input type="number" v-model="item.morning.dia"></td>
                <td v-show="item.morning.isEdit===false"><span >{{ item.morning.pulse }}</span></td>
                <td v-show="item.morning.isEdit===true"><input type="number" 
                v-model="item.morning.pulse"></td>
                <td v-show="item.morning.isEdit===false"><span >{{ item.morning.note }}</span></td>
                <td v-show="item.morning.isEdit===true"><input type="text" v-model="item.morning.note"></td>
                <td v-show="item.morning.isEdit===true"><i class="bi bi-check-square" @click="updateInfo(item.morning)"></i></td>
                <td v-show="item.morning.isEdit===false"><i class="bi bi-pencil-square" @click="editInfo(item.morning)"></i></td>
            </tr>
            <tr>
                <td>晚上</td>
                <td><div class="circle" :class="item.night.status"></div></td>
                <td v-show="item.night.isEdit===false"><span>{{ item.night.sys }}</span></td>
                <td v-show="item.night.isEdit===true"><input type="number" v-model="item.night.sys"></td>
                <td v-show="item.night.isEdit===false"><span>{{ item.night.dia }}</span></td>
                <td v-show="item.night.isEdit===true"><input type="number" v-model="item.night.dia"></td>
                <td v-show="item.night.isEdit===false"><span>{{ item.night.pulse }}</span></td>
                <td v-show="item.night.isEdit===true"><input type="number" v-model="item.night.pulse"></td>
                <td v-show="item.night.isEdit===false"><span>{{ item.night.note }}</span></td>
                <td v-show="item.night.isEdit===true"><input type="text" v-model="item.night.note"></td>
                <td v-show="item.night.isEdit===true"><i class="bi bi-check-square" @click="updateInfo(item.night)"></i></td>
                <td v-show="item.night.isEdit===false"><i class="bi bi-pencil-square" @click="editInfo(item.night)"></i></td>
            </tr>
        </tbody>    
    </table>
    <div class="text-center p-3">
        <i class="bi bi-plus-circle" @click="addData" style="font-size: 2rem; color: cornflowerblue; cursor: pointer;"></i>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/basic.scss';
   .table{
        tbody {
            vertical-align: middle;
            th {
                width: 150px;
            }
            td {
                width: 150px;
            }
            input {
                width: 50%;
            }
        }
        .bi {
            font-size: 1.6rem; 
            color: $icon-blue; 
            cursor: pointer;
        }
    }
    .circle {
        width: 30px;
        height: 30px;
        background: none;
        border-radius: 50%;
    }
    
    .green {
        background: $green;
    }
    .yellow {
        background: $yellow;
    }
    .red {
        background: $red;
    }
    .d-red {
        background: $d-red;
    }
    .evenBg {
        background: $evenBg;
    }

  
</style>
