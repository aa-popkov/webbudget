<script setup lang="ts">
const props = defineProps<{
  title: string,
  description?: string,
  data: {
    value: number
    name: string
  }[]
  colors?: string[]
}>()

const sumByName = (
  items: {
    value: number
    name: string
  }[]
) => {
  const sumMap = items.reduce((map, item) => {
    const currentSum = map.get(item.name) || 0
    map.set(item.name, currentSum + item.value)
    return map
  }, new Map<string, number>())

  return Array.from(sumMap.entries()).map(([name, value]) => ({
    name,
    value,
  }))
}

const option = ref<ECOption>({
  title: {
    text: props.title,
    subtext: props.description,
    left: "center",
  },
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: "50%",
      data: sumByName(props.data),
      label: {
        position: "inside",
        formatter: "{d}%",
        color: "black",
      },
      percentPrecision: 0,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
})

onMounted(() => {
  if (props.colors) {
    option.value.color = props.colors
  }
})
</script>

<template>
  <div class="w-full h-[600px]">
    <VChart :option="option" />
  </div>
</template>

<style></style>
