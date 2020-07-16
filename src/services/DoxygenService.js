import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.VUE_APP_DOXYGEN_BASE,
  // 'https://libcellml.github.io/data/doxygen',
  withCredentials: false,
  headers: {
    Accept: 'text/xml',
    'Content-Type': 'text/xml'
  },
  timeout: 10000
})

export default {
  getPage(page) {
    return apiClient.get(`/${page}.xml`)
  }
}
