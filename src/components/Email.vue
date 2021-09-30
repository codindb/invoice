<template>
   <div>
      <h2>Email {{ emailInfo.title }}</h2>
      <div class="details">
         <div class="flex">
            <p class="p5"><strong>Envoyer à</strong> : </p>
            <p class="input p5 address" v-if="record.fields" :contenteditable="editable">{{ record.fields.Email }}</p>
         </div>
         <div class="flex">
            <p class="p5"><strong>Objet</strong> : </p>
            <p class="input p5 subject" :contenteditable="editable">{{ emailInfo.subject }}</p>
         </div>
         <div class="flex">
            <p class="p5"><strong>Message</strong> : </p>
            <p class="input p5 body" :contenteditable="editable">{{ emailInfo.body }}</p>
         </div>
      </div>
   </div>
</template>

<script setup>

const props = defineProps({
  record: Object,
  editable: Boolean,
  emailInfo: Object,
})

</script>

<style lang="scss" scoped>

.details {
   text-align: left;
   width: 80%;
   margin: 50px auto;
}

.flex {
   display: flex;
   width: 100%;
}

.input {
   border: 1px solid;
   border-radius: 10px;
   color: grey;
}
.p5 {
   padding: 5px;
}

.address {
   min-width: 300px;
}

.subject {
   min-width: 350px;
}

.body {
   min-width: 700px;
   min-height: 500px;
}

</style>