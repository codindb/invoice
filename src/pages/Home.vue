<template>
   <el-tabs v-model="route.query.tab" @tab-click="resetEditable">
      <el-tab-pane label="Facture Provisoire" name="provisoire">
         <el-button @click="downloadTempInvoice" type="primary" plain round icon="el-icon-download">Facture Provisoire</el-button>
         <el-button @click="edit" type="warning" plain round icon="el-icon-edit">Modifier la facture</el-button>
         <div class="invoice" ref="tempInvoice" v-loading="data.loading">
            <Invoice :record="data.record" :editable="data.editable" :paid="false"/>
         </div>
      </el-tab-pane>
      <el-tab-pane label="Facture Acquitée" name="acquittee">
         <el-button @click="downloadPaidInvoice" :disabled="data.record.fields && data.record.fields.Statut !== 'Réglé'" type="primary" plain round icon="el-icon-download">Facture Acquitée</el-button>
         <el-button @click="edit" :disabled="data.record.fields && data.record.fields.Statut !== 'Réglé'" type="warning" plain round icon="el-icon-edit">Modifier la facture</el-button>
         <div v-if="data.record.fields && data.record.fields.Statut === 'Réglé'" class="invoice" ref="paidInvoice" v-loading="data.loading">
            <Invoice :record="data.record" :editable="data.editable" :paid="true"/>
         </div>
         <div class="no-invoice" v-else>
            <h2>🚧 La Facture n'est pas encore réglée 🚧</h2>
         </div>
      </el-tab-pane>
      <el-tab-pane label="E-mails" name="email">
         <h2 v-if="data.record.fields">💌 Envoyé à : {{ data.record.fields['Prénom'] }} {{ data.record.fields.Nom }} / {{ data.record.fields.Email }} 💌</h2>
         <div class="email-button">
            <h3 v-if="data.record.fields && !data.record.fields.Facture">❌ La facture n'est pas créée et/ou uploadée sur Airtable 🥺</h3>
            <h3 v-else>✅ C'est bon tu peux cliquer 🤙🏻</h3>
            <p class="look-up" v-if="data.record.fields && !data.record.fields.Facture">👆🏻 🤯 👆🏻</p>
            <p class="look-up" v-else>👇🏻 😎 👇🏻</p>
            <el-button @click="sendInvoiceEmail()" :disabled="data.record.fields && !data.record.fields.Facture" type="primary" plain round icon="el-icon-check">Envoyer e-mail Facture</el-button>
         </div>
         <div class="email-button">
            <h3 v-if="data.record.fields && data.record.fields.Statut !== 'Réglé'">❌ Le statut du dossier ne permet pas encore d'envoyer l'e-mail de confirmation 😫</h3>
            <h3 v-else>✅ C'est bon tu peux cliquer 🎊</h3>
            <p class="look-up" v-if="data.record.fields && data.record.fields.Statut !== 'Réglé'">👆🏻 😵‍💫 👆🏻</p>
            <p class="look-up" v-else>👇🏻 🤓 👇🏻</p>
            <el-button @click="sendConfirmationEmail()" :disabled="data.record.fields && data.record.fields.Statut !== 'Réglé'" type="success" plain round icon="el-icon-check">Envoyer e-mail Confirmation d'Inscription</el-button>
         </div>
         <div class="email-button">
            <h3 v-if="data.record.fields && !data.record.fields.Facture_acquittee">❌ La facture acquitée n'est pas créée et/ou uploadée sur Airtable 🥺</h3>
            <h3 v-else>✅ C'est bon tu peux cliquer 🏆</h3>
            <p class="look-up" v-if="data.record.fields && !data.record.fields.Facture_acquittee">👆🏻 🤬 👆🏻</p>
            <p class="look-up" v-else>👇🏻 💗 👇🏻</p>
            <el-button @click="sendPaidInvoiceEmail()" :disabled="data.record.fields && !data.record.fields.Facture_acquittee" type="warning" plain round icon="el-icon-check">Envoyer e-mail Facture Acquitée</el-button>
         </div>
      </el-tab-pane>
   </el-tabs>
</template>

<script setup>

import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import * as AxiosService from '../services/AxiosService.js'
import html2pdf from 'html2pdf.js'
import { ElNotification } from 'element-plus'

import Invoice from '../components/Invoice.vue'

const route = useRoute()

const data = reactive({
    record: {},
    loading: false,
    editable : false,
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
   invoiceEmailBody = `Bonjour ${data.record.fields['Prénom']},<br/>
   <br/>
   Ci-joint votre facture à régler pour validation définitive.<br/>
   Pour un règlement par chèque, merci de l'adresser à notre trésorière, Mme Aline GENOUD PRACHEX, 95 route de Corbier - 74650 Chavanod<br/>
   <br/>
   Belle journée,<br/>
   <br/>
   L'équipe du Centre de loisirs`

   confirmationEmailBody = `Bonjour ${data.record.fields['Prénom']},<br/>
   <br/>
   Nous avons le plaisir de vous confirmer la réception de votre règlement pour le Centre de loisirs de Chavanod.<br/>
   Votre inscription est définitive sous réserve des conditions sanitaires.<br/>
   <br/>
   Belle journée,<br/>
   <br/>
   L'équipe du Centre de loisirs`

   paidInvoiceEmailBody = `Bonjour ${data.record.fields['Prénom']},<br/>
   <br/>
   Ci-joint votre facture acquittée.<br/>
   Merci de votre confiance et fidélité.<br/>
   <br/>
   Belle journée,<br/>
   <br/>
   L'équipe du Centre de loisirs`

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
      filename: 'FactureAcquittee' + data.record.fields.Nom + '.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
   }
   html2pdf().set(opt).from(paidInvoice.value).save()
}

let invoiceEmailBody = ""

let confirmationEmailBody = ""

let paidInvoiceEmailBody = ""


const GMAILUSER = import.meta.env.VITE_GMAILUSER
const GMAILPW = import.meta.env.VITE_GMAILPW

const sendInvoiceEmail = () => {
   window.Email.send({
    Host : "smtp.gmail.com",
    Username : GMAILUSER,
    Password : GMAILPW,
    To : data.record.fields.Email,
    From : GMAILUSER,
    Subject : "Facture - Centre de loisirs Chavanod",
    Body : invoiceEmailBody,
    Attachments : [
      {
         name : data.record.fields.Facture[0].filename,
         path : data.record.fields.Facture[0].url
      }
   ],
   }).then(
      message => {
         if (message == "OK") {
            ElNotification({
               title: 'Email Envoyé 🤘🏻',
               message: `${data.record.fields['Prénom']}  ${data.record.fields.Nom} à bien reçu sa facture 🧾
               🚀`,
               duration: 0,
               type: 'success',
            })
         } else {
            ElNotification({
               title: 'ERREUR 😱',
               message: message,
               duration: 0,
               type: 'error',
            })
            console.log(message);
         }
      }
   )
}

const sendConfirmationEmail = () => {
   window.Email.send({
    Host : "smtp.gmail.com",
    Username : GMAILUSER,
    Password : GMAILPW,
    To : data.record.fields.Email,
    From : GMAILUSER,
    Subject : "Confirmation inscription - Centre de loisirs Chavanod" ,
    Body : confirmationEmailBody,
   }).then(
      message => {
         if (message == "OK") {
            ElNotification({
               title: 'Email Envoyé 🤘🏻',
               message: `${data.record.fields['Prénom']}  ${data.record.fields.Nom} à bien reçu la confirmation de son inscription ✔
               🥳`,
               duration: 0,
               type: 'success',
            })
         } else {
            ElNotification({
               title: 'ERREUR 😱',
               message: message,
               duration: 0,
               type: 'error',
            })
            console.log(message);
         }
      }
   )
}

const sendPaidInvoiceEmail = () => {
   window.Email.send({
    Host : "smtp.gmail.com",
    Username : GMAILUSER,
    Password : GMAILPW,
    To : data.record.fields.Email,
    From : GMAILUSER,
    Subject : "Facture Acquitée - Centre de loisirs Chavanod",
    Body : paidInvoiceEmailBody,
    Attachments : [
      {
         name : data.record.fields.Facture_acquittee[0].filename,
         path : data.record.fields.Facture_acquittee[0].url
      }
   ],
   }).then(
      message => {
         if (message == "OK") {
            ElNotification({
               title: 'Email Envoyé 🤘🏻',
               message: `${data.record.fields['Prénom']}  ${data.record.fields.Nom} à bien reçu sa facture acquittée 🧾
               🎉`,
               duration: 0,
               type: 'success',
            })
         } else {
            ElNotification({
               title: 'ERREUR 😱',
               message: message,
               duration: 0,
               type: 'error',
            })
            console.log(message);
         }
      }
   )
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
.email-button {
   margin: 30px;
}
.look-up {
   font-size: 30px;
   margin: 0;
   margin-top: -20px;
   animation: blinker 1s linear 5;
}
@keyframes blinker {  
  50% { opacity: 0; }
}

</style>