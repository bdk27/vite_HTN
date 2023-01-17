<script setup lang="ts">
  import HTNList from '../components/HTNList.vue'
  import HTNRules from '../components/HTNRules.vue'
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <div class="item">
          <h1 class="text-center p-3 text-primary">血壓紀錄表</h1>
          <HTNRules></HTNRules>
          <HTNList></HTNList>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped> 
</style>
