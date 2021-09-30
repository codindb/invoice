<template>
   <el-tabs v-model="data.activeTab" @tab-click="resetEditable">
      <el-tab-pane label="Facture Provisoire" name="provisoire">
         <el-button @click="downloadTempInvoice" type="primary" plain round icon="el-icon-download">Facture Provisoire</el-button>
         <el-button @click="edit" type="warning" plain round icon="el-icon-edit">Modifier la facture</el-button>
         <div class="invoice" ref="tempInvoice" v-loading="data.loading">
            <Invoice :record="data.record" :editable="data.editable" :paid="false"/>
         </div>
      </el-tab-pane>
      <el-tab-pane label="Facture Acquitée" name="acquitee">
         <el-button @click="downloadPaidInvoice" type="primary" plain round icon="el-icon-download">Facture Acquitée</el-button>
         <el-button @click="edit" type="warning" plain round icon="el-icon-edit">Modifier la facture</el-button>
         <div v-if="data.record.fields && data.record.fields.Statut == 'Réglé'" class="invoice" ref="paidInvoice" v-loading="data.loading">
            <Invoice :record="data.record" :editable="data.editable" :paid="true"/>
         </div>
         <div class="no-invoice" v-else>
            <h2>🚧 La Facture n'est pas encore réglée 🚧</h2>
         </div>
      </el-tab-pane>
      <el-tab-pane label="E-mails" name="email">
         <el-tabs tab-position="left">
            <el-tab-pane label="Envoi facture provisoire">
               <Email :record="data.record" :editable="data.editable" :emailInfo="invoiceEmailInfo"/>
               <div class="buttons">
                  <el-button @click="edit" type="warning" plain round icon="el-icon-edit">Modifier e-mail</el-button>
                  <el-button @click="alert('message envoyé')" type="primary" plain round icon="el-icon-check">Envoyer e-mail</el-button>
               </div>
            </el-tab-pane>
            <el-tab-pane label="Confirmation inscription">
               <Email :record="data.record" :editable="data.editable" :emailInfo="invoiceEmailInfo"/>
               <div class="buttons">
                  <el-button @click="edit" type="warning" plain round icon="el-icon-edit">Modifier e-mail</el-button>
                  <el-button @click="alert('message envoyé')" type="primary" plain round icon="el-icon-check">Envoyer e-mail</el-button>
               </div>
            </el-tab-pane>
            <el-tab-pane label="Envoi facture acquitée">
               <Email :record="data.record" :editable="data.editable" :emailInfo="invoiceEmailInfo"/>
               <div class="buttons">
                  <el-button @click="edit" type="warning" plain round icon="el-icon-edit">Modifier e-mail</el-button>
                  <el-button @click="alert('message envoyé')" type="primary" plain round icon="el-icon-check">Envoyer e-mail</el-button>
               </div>
            </el-tab-pane>
         </el-tabs>
         
      </el-tab-pane>
   </el-tabs>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import * as AxiosService from '../services/AxiosService.js'
import html2pdf from 'html2pdf.js'

import Invoice from '../components/Invoice.vue'
import Email from '../components/Email.vue'

const route = useRoute()

const data = reactive({
    record: {},
    loading: false,
    editable : false,
    activeTab : 'provisoire'
})

const edit = () => {
   data.editable = !data.editable
}

const resetEditable = () => {
   data.editable = false
}

const loadData = async () => {
  data.loading = true
  try {
   data.record = await AxiosService.getRecord(route.query.id)
   data.loading = false
   console.log(data.record)
  } catch (e) {
    console.log(e)
  }
}
loadData()

const tempInvoice = ref("")
const downloadTempInvoice = () => {
   const opt = {
      margin: 0,
      filename: 'Facture' + data.record.fields.Nom + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
   }
   html2pdf().set(opt).from(tempInvoice.value).save()
}

const paidInvoice = ref("")
const downloadPaidInvoice = () => {
   const opt = {
      margin: 0,
      filename: 'FactureAcquitee' + data.record.fields.Nom + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
   }
   html2pdf().set(opt).from(paidInvoice.value).save()
}

const invoiceEmailInfo = {
   title: "d'envoi de facture provisoire",
   subject: "Facture provisoire Centre de loisirs Chavanod",
   body: "Ceci est un message,"
}

</script>

<style lang="scss" scoped>

.invoice {
   min-height: 200px;
   height: 1000px;
   width: 595px;
   margin: 0 auto;
}
.no-invoice {
   height: 200px;
   display: flex;
   justify-content: center;
   align-items: center;
}
.buttons {
   display: flex;
   justify-content: start;
   margin-bottom: 50px;
   margin-left: 17%;
}

</style>