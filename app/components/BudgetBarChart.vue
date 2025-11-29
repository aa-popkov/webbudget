<script setup lang="ts">
const props = defineProps<{
  data: {
    value: number
    name: string
    type: string
  }[]
}>()

const option = ref<ECOption>({
  title: {
    text: "World Population",
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  yAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
  },
  xAxis: {
    type: "category",
    data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
  },
  series: [
    {
      name: "2011",
      type: "bar",
      data: [18203, 23489, 29034, 104970, 131744, 630230],
    },
    {
      name: "2012",
      type: "bar",
      data: [19325, 23438, 31000, 121594, 134141, 681807],
    },
  ],
})
</script>
<template>
  <div class="w-full h-[600px]">
    <VChart :option="option" />
  </div>
</template>
