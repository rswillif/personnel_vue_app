import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getPersons () {
    return this.execute('get', '/persons')
  },
  getPerson (id) {
    return this.execute('get', `/persons/${id}`)
  },
  createPerson (data) {
    return this.execute('post', '/persons', data)
  },
  updatePerson (id, data) {
    return this.execute('put', `/persons/${id}`, data)
  },
  deletePerson (id) {
    return this.execute('delete', `/persons/${id}`)
  }
}
