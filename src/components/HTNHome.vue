<script setup lang="ts">
  import HTNList from '../components/HTNList.vue'
  import HTNRules from '../components/HTNRules.vue'
  import { ref, onMounted } from 'vue';

  let yearsOld = ref(0);
  function showDate() {
    let thisYear = new Date().getFullYear();
    yearsOld.value = thisYear - 2000;
  }
  onMounted(() => {
    showDate()
  })

</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="item">
          <div class="bg mb-4">
            <h1><i class="bi bi-droplet-fill"></i>血壓紀錄表</h1>
            <div class="info">
              <h5>姓名: 顏永程</h5>
              <h5>年齡: {{ yearsOld }}</h5>
            </div>
          </div>
          <HTNRules></HTNRules>
          <HTNList></HTNList>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped> 
  .bg {
    width: 100%;
    height: 20vh;
    background: url('../assets/img/home-background.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    h1 {
      color: #fff;
      letter-spacing: 1px;
    }
    .info {
      h5 {
        color: #fff;
        display: inline-block;
        padding: 0 .5rem;
        color: #ccc;
      }
    }
  }
</style>
