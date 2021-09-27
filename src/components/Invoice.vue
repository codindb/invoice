<template>
   <h1 v-if="record.fields" :contenteditable="editable">{{ record.fields.Nom }}</h1>
</template>

<script setup>

const props = defineProps({
  record: Object,
  editable: Boolean,
})

</script>

<style lang="scss" scoped>

</style>