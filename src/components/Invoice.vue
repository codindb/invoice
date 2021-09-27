<template>
   <div class="header">
      <h1 class="orange">Centre de loisirs de Chavanod</h1>
      <h2 class="orange">"Les Marmousets"</h2>
      <h2>Automne 2021 : 25 Octobre au 29 Octobre</h2>
   </div>
   <h3 class="highlight" v-if="!paid">Facture Provisoire</h3>
   <h3 class="highlight" v-else>Facture Acquitée</h3>
   <div class="info" :contenteditable="editable">
      <p v-if="record.fields"> ❖<strong> Nom</strong> : {{record.fields["Nom Enfant 1"]}}</p>
      <p v-if="record.fields"> ❖<strong> Prénom</strong> : {{ record.fields["Prénom Enfant 1"]}} {{record.fields["Prénom Enfant 2"] ? ` / ${record.fields["Prénom Enfant 2"]}` : ""}} {{record.fields["Prénom Enfant 3"] ? ` / ${record.fields["Prénom Enfant 3"]}` : ""}} {{record.fields["Prénom Enfant 4"] ? ` / ${record.fields["Prénom Enfant 4"]}` : ""}}</p>
      <p v-if="record.fields"> ❖<strong> Montant à régler par la famille</strong> : {{record.fields["Coût Total"]}} €</p>
   </div>
   <div class="amounts-table" :contenteditable="editable">
      <p v-if="record.fields"> Coût du séjour : {{record.fields["Cout avant reduc"]}} €</p>
      <p v-if="record.fields"> Aide Mairie : {{record.fields.Mairie}} €</p>
      <p v-if="record.fields"> Bons CAF : {{record.fields.CAF}} €</p>
      <p v-if="record.fields"> Adhésion AFR : {{record.fields["22€ - Adhésion"]? 22 : 0}} €</p>
      <p v-if="record.fields"> Total à régler : {{record.fields["Coût Total"]}} €</p>
   </div>
   <h3 class="highlight">Modes de Règlement</h3>
   <div class="info">
      <p>❖ Chèque à l'ordre de AFR CHAVANOD</p>
      <p>❖ Chèque ANCV : Merci de renseigner nom et adresse du parent</p>
      <p>❖ RIB – La Banque Postale</p>
      <p>IBAN : FR06 2004 1010 1702 1767 2H02 819</p>
      <p>BIC : PSSTFRPPGRE</p>
   </div>
   <p class="info" :contenteditable="editable">Fait à Chavanod le {{ date.getDate() + '/'+ (date.getMonth() + 1) + '/'+ date.getFullYear() }}</p>
</template>

<script setup>

const props = defineProps({
  record: Object,
  editable: Boolean,
  paid: Boolean,
})

const date = new Date()
</script>

<style lang="scss" scoped>

.header {
   text-align: center;
   .orange {
      color: orange;
   }
}

.highlight {
   text-align: center;
   background-color: orange;
   color: white;
   padding: 5px 60px;
   width: 300px;
   margin: 30px auto;
}
.info {
   text-align: left;
   margin: 40px 0;
}

</style>