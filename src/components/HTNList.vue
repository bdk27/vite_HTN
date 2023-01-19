<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import { nanoid } from 'nanoid'
  import HTNTable from './HTNTable.vue';

  let year = ref(2023);
  let month = ref(1);

  //新增accordions
  interface Acd {
    id: string,
    year: number,
    month: number,
  }
  const accordions: Acd[] = reactive([{id: nanoid(),year: year.value, month: month.value}]);
  function addAcc() {
    if (month.value < 12) {
      month.value ++;
    }else {
      month.value = 1;
      year.value ++;
    }
    const value = {id: nanoid(), year: year.value, month: month.value} as Acd;
    accordions.push(value);
  }

  //刪除accordions
  /* function deleteAcc(item: Acd) {
    if(confirm(`確定要刪除${item.year}年${item.month}月選單嗎?`)) {
      accordions.splice(accordions.findIndex(accordion => accordion.id === item.id), 1);
    }
  } */

</script>

<template>
    <div class="accordion" id="accordion">
      <div class="d-flex align-items-start justify-content-between" v-for="item in accordions" :key="item.id">
        <div class="accordion-item w-100">
          <h2 class="accordion-header" :id="'headingOne'+item.id">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne'+item.id" aria-expanded="true" :aria-controls="'collapseOne'+item.id">
                {{ item.year }}年{{ item.month }}月
              </button>
          </h2>

          <div :id="'collapseOne'+item.id" class="accordion-collapse collapse show" :aria-labelledby="'headingOne'+item.id" data-bs-parent="#accordion">
              <div class="accordion-body">
                <HTNTable :month="item.month"></HTNTable>
              </div>
          </div>
        </div>
        
        <!-- <i class="bi bi-trash3 ps-3" @click="deleteAcc(item)" style="font-size: 1.6rem; color: cornflowerblue; cursor: pointer;"></i> -->
      </div>
    </div>
    
    <div class="text-center p-3">
        <i class="bi bi-plus-circle" @click="addAcc" style="font-size: 2rem; color: cornflowerblue; cursor: pointer;"></i>
    </div>
</template>

<style lang="scss" scoped>

  button {
    input {
      width: 80px;
      padding: .5rem;
      border: none;
      margin-right: 1rem;
    }
  }
  
</style>
