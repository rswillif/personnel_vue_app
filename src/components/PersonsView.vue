<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">People</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Company</th>
              <th>Salary</th>
              <th>Last Updated</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in persons" :key="person.id">
              <td>{{ person.id }}</td>
              <td>{{ person.first_name }}</td>
              <td>{{ person.last_name }}</td>
              <td>{{ person.address }}</td>
              <td>{{ person.company }}</td>
              <td>{{ person.salary }}</td>
              <td>{{ person.updatedAt }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populatePersonToEdit(person)">Edit</a> -
                <a href="#" @click.prevent="deletePerson(person.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Person ID#' + model.id : 'New Person')">
          <form @submit.prevent="savePerson">
            <b-form-group label="First Name">
              <b-form-input type="text" v-model="model.first_name"></b-form-input>
            </b-form-group>
            <b-form-group label="Last Name">
              <b-form-input type="text" v-model="model.last_name"></b-form-input>
            </b-form-group>
            <b-form-group label="Address">
              <b-form-input type="text" v-model="model.address"></b-form-input>
            </b-form-group>
            <b-form-group label="Company">
              <b-form-input type="text" v-model="model.company"></b-form-input>
            </b-form-group>
            <b-form-group label="Salary">
              <b-form-input type="text" v-model="model.salary"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      persons: [],
      model: {}
    }
  },
  async created () {
    this.refreshPersons()
  },
  methods: {
    async refreshPersons () {
      this.loading = true
      this.persons = await api.getPersons()
      this.loading = false
    },
    async populatePersonToEdit (person) {
      this.model = Object.assign({}, person)
    },
    async savePerson () {
      if (this.model.id) {
        await api.updatePerson(this.model.id, this.model)
      } else {
        await api.createPerson(this.model)
      }
      this.model = {} // reset form
      await this.refreshPersons()
    },
    async deletePerson (id) {
      if (confirm('Are you sure you want to delete this person?')) {
        // if we are editing a person we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deletePerson(id)
        await this.refreshPersons()
      }
    }
  }
}
</script>
