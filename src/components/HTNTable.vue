<script setup lang="ts">
    import { reactive } from 'vue';
    import { watch } from 'vue';

    interface FormProps {
        sys: number
        dia: number
        pulse: number
        note: string
        status: string
        isEdit: boolean
        editItnfo:() => void
        updateInfo:() => void
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

        editItnfo() {
            this.isEdit = true;
        }
        updateInfo() {
            this.isEdit = false;
        }
    }
    const morning = reactive(new Form(0, 0, 0, '', '' , true));
    const night = reactive(new Form(0, 0, 0, '', '', true));

    watch(morning, () => {
        if(morning.sys < 120 && morning.dia < 80) {
            morning.status = 'green';
        }else if((morning.sys >= 120 && morning.sys <= 139) || (morning.dia >= 80 && morning.dia <= 89)) {
            morning.status = 'yellow';
        }else if((morning.sys >= 140 && morning.sys <= 159) || (morning.dia >= 90 && morning.dia <= 99)) {
            morning.status = 'red';
        }else if(morning.sys >= 160 || morning.dia >= 100) {
            morning.status = 'd-red';
        }
    })
    watch(night, () => {
        if(night.sys < 120 && night.dia < 80) {
            night.status = 'green';
        }else if((night.sys >= 120 && night.sys <= 139) || (night.dia >= 80 && night.dia <= 89)) {
            night.status = 'yellow';
        }else if((night.sys >= 140 && night.sys <= 159) || (night.dia >= 90 && night.dia <= 99)) {
            night.status = 'red';
        }else if(night.sys >= 160 || night.dia >= 100) {
            night.status = 'd-red';
        }
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
        <tbody>
            <tr>
                <th scope="row" rowspan="2">1/1</th>
                <td>早上</td>
                <td><div class="circle" :class="morning.status"></div></td>
                <td v-show="morning.isEdit===false"><span >{{ morning.sys }}</span></td>
                <td v-show="morning.isEdit===true"><input type="number" v-model="morning.sys"></td>
                <td v-show="morning.isEdit===false"><span >{{ morning.dia }}</span></td>
                <td v-show="morning.isEdit===true"><input type="number" v-model="morning.dia"></td>
                <td v-show="morning.isEdit===false"><span >{{ morning.pulse }}</span></td>
                <td v-show="morning.isEdit===true"><input type="number" 
                v-model="morning.pulse"></td>
                <td v-show="morning.isEdit===false"><span >{{ morning.note }}</span></td>
                <td v-show="morning.isEdit===true"><input type="text" v-model="morning.note"></td>
                <td v-show="morning.isEdit===true"><i class="bi bi-check-square" @click="morning.updateInfo"></i></td>
                <td v-show="morning.isEdit===false"><i class="bi bi-pencil-square" @click="morning.editItnfo"></i></td>
            </tr>
            <tr>
                <td>晚上</td>
                <td><div class="circle" :class="night.status"></div></td>
                <td v-show="night.isEdit===false"><span>{{ night.sys }}</span></td>
                <td v-show="night.isEdit===true"><input type="number" v-model="night.sys"></td>
                <td v-show="night.isEdit===false"><span>{{ night.dia }}</span></td>
                <td v-show="night.isEdit===true"><input type="number" v-model="night.dia"></td>
                <td v-show="night.isEdit===false"><span>{{ night.pulse }}</span></td>
                <td v-show="night.isEdit===true"><input type="number" v-model="night.pulse"></td>
                <td v-show="night.isEdit===false"><span>{{ night.note }}</span></td>
                <td v-show="night.isEdit===true"><input type="text" v-model="night.note"></td>
                <!-- <td>Concor 2.5mg</td> -->
                <td v-show="night.isEdit===true"><i class="bi bi-check-square" @click="night.updateInfo"></i></td>
                <td v-show="night.isEdit===false"><i class="bi bi-pencil-square" @click="night.editItnfo"></i></td>
            </tr>
        </tbody>
    </table>
</template>

<style lang="scss" scoped>
    @import '../assets/scss/basic.scss';
   .table{
        tbody {
            vertical-align: middle;
            th,td {
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

  
</style>
