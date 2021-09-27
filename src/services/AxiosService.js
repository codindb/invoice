import axios from "axios";

const APIKEY = import.meta.env.VITE_APIKEY

// axios instance definition
const instance = axios.create({
   baseURL: "https://api.airtable.com/v0/appN5GH2CalsuxEiS/Demande%20d'inscription/",
   headers: { 'Content-Type': 'application/json; charset=utf-8', 'Authorization': 'Bearer ' + APIKEY}
})

// Get record by id
export async function getRecord (id) {
   const res = await instance.get('/' + id)
   console.log(`API KEY: ${APIKEY}`);
   return res.data
}