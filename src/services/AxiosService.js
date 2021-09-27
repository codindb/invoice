import axios from "axios";

const AIRTABLEKEY = import.meta.env.VITE_AIRTABLEKEY

// axios instance definition
const instance = axios.create({
   baseURL: "https://api.airtable.com/v0/appN5GH2CalsuxEiS/Demande%20d'inscription/",
   headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + AIRTABLEKEY}
})

// Get record by id
export async function getRecord (id) {
   const res = await instance.get('/' + id)
   return res.data
}