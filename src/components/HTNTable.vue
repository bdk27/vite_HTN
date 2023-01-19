<script setup lang="ts">
    import {  watch, reactive } from 'vue';
    import  getData  from '../assets/ts/data';
    const props = defineProps({month: Number});
    //資料
    const HTNData = reactive(getData());

    //檢測狀態
    function checkStatus(period: any) {
        if(period.sys < 120 && period.dia < 80) {
            period.status = 'green';
        }else if((period.sys >= 120 && period.sys <= 139) || (period.dia >= 80 && period.dia <= 89)) {
            period.status = 'yellow';
        }else if((period.sys >= 140 && period.sys <= 159) || (period.dia >= 90 && period.dia <= 99)) {
            period.status = 'red';
        }else if(period.sys >= 160 || period.dia >= 100) {
            period.status = 'd-red';
        }
    }
    //進行監視
    HTNData.forEach(item => {
        watch(item.morning, () => {
            checkStatus(item.morning);
        });
        watch(item.night, () => {
            checkStatus(item.night);
        });
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
                <th scope="row" rowspan="2">{{ props.month }}/{{ item.day }}</th>
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
                <td v-show="item.morning.isEdit===true"><i class="bi bi-check-square" @click="item.morning.updateInfo()"></i></td>
                <td v-show="item.morning.isEdit===false"><i class="bi bi-pencil-square" @click="item.morning.editInfo()"></i></td>
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
                <td v-show="item.night.isEdit===true"><i class="bi bi-check-square" @click="item.night.updateInfo()"></i></td>
                <td v-show="item.night.isEdit===false"><i class="bi bi-pencil-square" @click="item.night.editInfo()"></i></td>
            </tr>
        </tbody>    
    </table>
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
            color: cornflowerblue; 
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
        background: #f0f0f0;
    }

  
</style>
