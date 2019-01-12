<template>
  <div class="container-fluid mt-4">
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col lg="3">
        <b-card :title="('Company:')">
          <form @submit.prevent="submitCompany">
            <b-form-group>
              <b-form-input type="text" v-model="model.company"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Submit</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
      <b-col>
        <h3>Cost</h3>
        <div id="cost">
          {{ cost }}
        </div>
      </b-col>
      <b-col>
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
      cost: {},
      company: '',
      model: {}
    }
  },
  async created () {
    this.refreshResults()
  },
  methods: {
    async refreshResults () {
      this.loading = true
      this.cost = await this.showCompanyCost()
      this.loading = false
    },
    async submitCompany () {
      if (this.model.company) {
        this.company = this.model.company
        await this.showCompanyCost(this.model.company)
      }
      this.model = {} // reset form
    },
    async showCompanyCost () {
      let personsFromCompany = await api.getPersons()
      let sum = 0

      if (personsFromCompany.length > 0 && this.company !== undefined) {
        personsFromCompany.forEach((person) => {
          if (person.company.toLowerCase() === this.company.toLowerCase()) {
            sum = person.salary + sum
          }
        })
      }

      if (sum > 0) { this.cost = sum }
    }
  }
}
</script>
