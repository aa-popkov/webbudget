<script setup lang="ts">
import type { BarSeriesOption, SeriesOption } from "echarts"

const props = defineProps<{
  range: string[]
  data: {
    value: number
    name: string
    date: string
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
  color: ["#ff6467", "#05df72"],
  yAxis: {
    type: "value",
    boundaryGap: [0, 0.01],
  },
  xAxis: {
    type: "category",
    data: props.range,
  },
})
type r = ECOption["series"] | undefined
onMounted(() => {
  const types = new Set<string>()
  for (const item of props.data) {
    types.add(item.name)
  }
  console.log(types)
  const series: r[] = []
  for (const item of types) {
    const seria = {
      name: item,
      type: "bar",
      data: new Array(props.range.length).fill(0) as number[],
    }
    for (const dat of props.data) {
      const date = dat.date.split("T")[0]
      const idx = props.range.findIndex((x) => x === date)
      if (idx > -1 && dat.name === item) {
        seria.data[idx] = dat.value
      }
    }
    series.push(seria)
  }
  option.value.series = series
})
</script>
<template>
  <div class="w-full h-[600px]">
    <VChart :option="option" />
  </div>
</template>
