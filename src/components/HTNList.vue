<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue';
  import { nanoid } from 'nanoid'

  //西元&民國
  let ADyear = ref(0);
  let RCyear = ref(0);
  function showDate() {
    let today = new Date();
    ADyear.value = today.getFullYear();
    RCyear.value = ADyear.value - 1911;
  }

  //新增accordions
  interface Acd {
    id: string
  }
  const accordions: Acd[] = reactive([{id: nanoid()}]);
  function addAcc() {
    const value = {id: nanoid()} as Acd;
    accordions.push(value);
  }

  //刪除accordions
  function deleteAcc(item: Acd) {
    if(confirm('確定要刪除此項目嗎?')) {
      accordions.splice(accordions.findIndex(accordion => accordion.id === item.id), 1);
    }
  }

  onMounted(() => {
    showDate()
  })
</script>

<template>
    <div class="accordion" id="accordion">
        <div class="d-flex align-items-start justify-content-between" v-for="item in accordions" :key="item.id">
            <div class="accordion-item w-100">
            <h2 class="accordion-header" :id="'headingOne'+item.id">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseOne'+item.id" aria-expanded="true" :aria-controls="'collapseOne'+item.id">
                {{ ADyear }}年 / {{ RCyear }}年
                </button>
            </h2>
            <div :id="'collapseOne'+item.id" class="accordion-collapse collapse show" :aria-labelledby="'headingOne'+item.id" data-bs-parent="#accordion">
                <div class="accordion-body">
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam, nobis labore et voluptas laudantium, reprehenderit totam voluptatum neque, aspernatur corrupti nulla consequuntur doloribus voluptates. Aliquam voluptate porro voluptates iste sint.</p>
                </div>
            </div>
            </div>
            
            <i class="bi bi-trash3 ms-3" @click="deleteAcc(item)" style="font-size: 1.6rem; color: cornflowerblue; cursor: pointer;"></i>
        </div>
    </div>
    
    <div class="icon text-center p-3">
        <i class="bi bi-plus-circle" @click="addAcc" style="font-size: 2rem; color: cornflowerblue; cursor: pointer;"></i>
    </div>
</template>

<style lang="scss" scoped> 
</style>
