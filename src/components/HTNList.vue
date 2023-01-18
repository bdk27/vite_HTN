<script setup lang="ts">
  import { reactive } from 'vue';
  import { nanoid } from 'nanoid'

  /* let accYear = ref(0);
  let accMonth = ref(0); */

  //新增accordions
  interface Acd {
    id: string,
    num: number
  }
  const accordions: Acd[] = reactive([]);
  function addAcc() {
    const value = {id: nanoid(), num: accordions.length + 1} as Acd;
    accordions.push(value);
  }

  //刪除accordions
  function deleteAcc(item: Acd) {
    if(confirm(`確定要刪除選單${item.num}嗎?`)) {
      accordions.splice(accordions.findIndex(accordion => accordion.id === item.id), 1);
    }
  }

  //修改年月
  /* function editYear(item: Acd) {
    item.year = accYear.value;
    item.isEditYear = false
  }
  function editMonth(item: Acd) {
    item.month = accMonth.value;
    item.isEditMonth = false
  }
  function editDate(item: Acd) {
    item.isEditYear = true;
    item.isEditMonth = true;
  } */

</script>

<template>
    <div class="accordion" id="accordion">
      <div class="d-flex align-items-start justify-content-between" v-for="item in accordions" :key="item.id">
        <div class="accordion-item w-100">
          <h2 class="accordion-header" :id="'headingOne'+item.id">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne'+item.id" aria-expanded="true" :aria-controls="'collapseOne'+item.id">
                選單{{ item.num }}
              </button>
          </h2>
          <div :id="'collapseOne'+item.id" class="accordion-collapse collapse show" :aria-labelledby="'headingOne'+item.id" data-bs-parent="#accordion">
              <div class="accordion-body">
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, nobis labore et voluptas laudantium, reprehenderit totam voluptatum neque, aspernatur corrupti nulla consequuntur doloribus voluptates. Aliquam voluptate porro voluptates iste sint.</p>
              </div>
          </div>
        </div>
        
        <div class="icons d-flex align-items-center justify-content-center">
          <i class="bi bi-pencil-square mx-3" style="font-size: 1.6rem; color: cornflowerblue; cursor: pointer;" ></i>
          <i class="bi bi-trash3" @click="deleteAcc(item)" style="font-size: 1.6rem; color: cornflowerblue; cursor: pointer;"></i>
        </div>
        
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
