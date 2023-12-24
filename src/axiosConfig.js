import axios from 'axios';
const airtableToken = process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;

const airtableBaseUrl = `https://api.airtable.com/v0/${baseId}`;

const axiosInstance = axios.create({
  baseURL: airtableBaseUrl,
  headers: {
    Authorization: `Bearer ${airtableToken}`,
  },
});

export default axiosInstance;
