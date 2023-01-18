<script setup lang="ts">
</script>

<template>
    <div class="row row-cols-md-2 row-cols-lg-4 mx-0 mb-3">
        <div class="col-6">
            <div class="content">
                <div class="circle normal"></div>
                <div class="text">
                    <h5>正常血壓</h5>
                    <p>收縮壓 &lt; 120 且 舒張壓 &lt; 80</p>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="content">
                <div class="circle warning"></div>
                <div class="text">
                    <h5>高血壓前期</h5>
                    <p>收縮壓 120~139 或 舒張壓 80~89</p>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="content">
                <div class="circle danger"></div>
                <div class="text">
                    <h5>第一期高血壓</h5>
                    <p>收縮壓 140~159 或 舒張壓 90~99</p>
                </div>
            </div>
        </div>
        <div class="col-6">
            <div class="content">
                <div class="circle danger-emphasis"></div>
                <div class="text">
                    <h5>第二期高血壓</h5>
                    <p>收縮壓 &gt;= 160 或 舒張壓 &gt;= 100</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/basic.scss';

  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  .circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: .5rem;
  }
  .text {
    p {
        color: #6c6c6c;
    }
  }
  .normal {
    background: $green;
  }
  .warning {
    background: $yellow;
  }
  .danger {
    background: $red;
  }
  .danger-emphasis {
    background: $d-red;
  }
  
</style>
