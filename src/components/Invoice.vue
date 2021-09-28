<template>
   <div class="header">
      <h1 class="orange">Centre de loisirs de Chavanod</h1>
      <h2 class="orange">"Les Marmousets"</h2>
      <h2>Automne 2021 : 25 au 29 Octobre</h2>
   </div>
   <h2 class="highlight">Facture</h2>
   <div class="info" :contenteditable="editable">
      <img class="paid" v-if="paid" src="../assets/paid.png"/>
      <p v-if="record.fields"> ❖<strong> Nom</strong> : {{ record.fields.Nom }}</p>
      <p v-if="record.fields"> ❖<strong> Prénom</strong> : {{ record.fields["Prénom"] }}</p>
   </div>
   <div class="info">
      <h3 class="frame">Détail Facture</h3>
      <p v-if="record.fields && record.fields['22€ - Adhésion']"> Adhésion AFR : 22 €</p>
      <div class="amounts-table" :contenteditable="editable">
         <table style="width:100%">
            <tr>
               <th class="left">Enfant</th>
               <th>Coût séjour</th>
               <th>Aide Mairie</th>
               <th>Bons CAF</th>
               <th>Total Enfant</th>
            </tr>
            <tr v-if="record.fields">
               <td class="left">{{ record.fields["Nom Enfant 1"] + ' ' + record.fields["Prénom Enfant 1"] }}</td>
               <td>{{ (record.fields["Cout avant reduc"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
               <td>{{ - record.fields.Mairie / record.fields["Nb Enfants"] }} €</td>
               <td>{{ record.fields.CAF ? - record.fields.CAF / record.fields["Nb Enfants"] : 0 }} €</td>
               <td>{{ (record.fields["Coût Total"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
            </tr>
            <tr v-if="record.fields && record.fields['Nb Enfants'] >= 2">
               <td class="left">{{ record.fields["Nom Enfant 2"] + ' ' + record.fields["Prénom Enfant 2"] }}</td>
               <td>{{ (record.fields["Cout avant reduc"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
               <td>{{ - record.fields.Mairie / record.fields["Nb Enfants"] }} €</td>
               <td>{{ record.fields.CAF ? - record.fields.CAF / record.fields["Nb Enfants"] : 0 }} €</td>
               <td>{{ (record.fields["Coût Total"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
            </tr>
            <tr v-if="record.fields && record.fields['Nb Enfants'] >= 3">
               <td class="left">{{ record.fields["Nom Enfant 3"] + ' ' + record.fields["Prénom Enfant 3"] }}</td>
               <td>{{ (record.fields["Cout avant reduc"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
               <td>{{ - record.fields.Mairie / record.fields["Nb Enfants"] }} €</td>
               <td>{{ record.fields.CAF ? - record.fields.CAF / record.fields["Nb Enfants"] : 0 }} €</td>
               <td>{{ (record.fields["Coût Total"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
            </tr>
            <tr v-if="record.fields && record.fields['Nb Enfants'] >= 4">
               <td class="left">{{ record.fields["Nom Enfant 4"] + ' ' + record.fields["Prénom Enfant 4"] }}</td>
               <td>{{ (record.fields["Cout avant reduc"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
               <td>{{ - record.fields.Mairie / record.fields["Nb Enfants"] }} €</td>
               <td>{{ record.fields.CAF ? - record.fields.CAF / record.fields["Nb Enfants"] : 0 }} €</td>
               <td>{{ (record.fields["Coût Total"] - (record.fields["22€ - Adhésion"]? 22 : 0)) / record.fields["Nb Enfants"] }} €</td>
            </tr>
            <tr v-if="record.fields">
               <td class="frame left"><strong>Total</strong></td>
               <td class="frame">{{ (record.fields["Cout avant reduc"] - (record.fields["22€ - Adhésion"]? 22 : 0)) }} €</td>
               <td class="frame"> {{ - record.fields.Mairie }} €</td>
               <td class="frame">{{ record.fields.CAF ? - record.fields.CAF : 0 }} €</td>
               <td class="frame">{{ (record.fields["Coût Total"] - (record.fields["22€ - Adhésion"]? 22 : 0)) }} €</td>
            </tr>
         </table>
         <h3 class="grand-total" v-if="record.fields"> Total à régler : {{record.fields["Coût Total"]}} €</h3>
      </div>
   </div>
   <div class="temp-invoice" v-if="!paid">
      <h2 class="highlight">Modes de Règlement</h2>
      <div class="info">
         <p>❖ Chèque à l'ordre de AFR CHAVANOD</p>
         <p>❖ Chèque ANCV : Merci de renseigner nom et adresse du parent</p>
         <p>❖ RIB – La Banque Postale</p>
         <p>IBAN : FR06 2004 1010 1702 1767 2H02 819</p>
         <p>BIC : PSSTFRPPGRE</p>
      </div>
   </div>
   <div class="paid-invoice" v-else>
      <h2 class="highlight">Récépissé de déclaration</h2>
      <div class="info">
         <p>❖ N° 0740161CL000120 </p>
      </div>
   </div>
   <p class="info" :contenteditable="editable">Fait à Chavanod le {{ date.getDate() + '/'+ (date.getMonth() + 1) + '/'+ date.getFullYear() }}</p>
</template>

<script setup>

import { reactive } from 'vue';

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
   margin: 20px auto;
}
.info {
   text-align: left;
   margin: 20px 0;
}
td {
   padding: 10px 0;
   text-align: center;
}
th {
   border-bottom: 1px solid;
   text-align: center;
}
.left {
   text-align: left;
}
.frame {
   border-top: 1px solid;
   border-bottom: 1px solid;
}
.grand-total {
   border-bottom: 1px solid;
   padding: 10px 0;
   text-transform: uppercase;
}
.paid {
   width: 330px;
   position: absolute;
   top: 150px;
   right: 100px;
}
</style>