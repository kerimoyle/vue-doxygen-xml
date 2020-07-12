import axios from 'axios'

const apiClient = axios.create({
  baseURL:
    process.env.NODE_ENV !== 'production'
      ? `${process.env.BASE_URL}v0.1.0`
      : 'https://libcellml.github.io/data/doxygen',
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
