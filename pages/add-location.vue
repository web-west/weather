<template>
  <b-container>
    <b-row>
      <b-col>
        <app-sidebar />
      </b-col>
      <b-col cols="9">
        <h1>Add location</h1>
        <b-list-group>
          <b-list-group-item v-for="(location, index) in locations" :key="index">
            <b-input-group >
              <b-form-input :value="location.data.name + ' ' + location.data.sys.country" disabled></b-form-input>
              <b-input-group-append>
                <b-btn variant="danger" @click.prevent="onDel(location.slug)">-</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-list-group-item>
        </b-list-group>
        <no-ssr>
          <b-nav-form @submit.prevent="onSubmit">
            <b-input-group prepend="City">
              <vue-google-autocomplete
                id="map-2"
                classname="form-control"
                placeholder="Input loaction"
                types="(cities)"
                v-on:placechanged="getAddressData"
              >
              </vue-google-autocomplete>
              <b-input-group-append>
                <b-btn type="submit" variant="success" :disabled="coordinates ? false : true">+</b-btn>
              </b-input-group-append>
            </b-input-group>
          </b-nav-form>
        </no-ssr>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AppSidebar from '~/components/AppSidebar'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  data () {
    return {
      coordinates: null
    }
  },
  computed: {
    ...mapGetters({
      locations: 'weather/locations',
      locationsBySlug: 'weather/locationsBySlug'
    })
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      if (addressData.latitude && addressData.longitude) {
        this.coordinates = addressData.latitude + ',' + addressData.longitude
      }
    },
    setLocation (response) {
      this.$store.commit('weather/SET_LOCATION_WEATHLER', {
        slug: this.coordinates,
        data: response.data
      })
    },
    async onSubmit () {
      if (this.coordinates && !this.locationsBySlug(this.coordinates)) {
        let coordinates = this.coordinates.split(',')
        await axios.get(`http://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY_OPENWEATHERMAP}&lat=${coordinates[0]}&lon=${coordinates[1]}`)
          .then(this.setLocation)
          .catch(this.failReq)
        this.coordinates = null
      }
    },
    onDel (slug) {
      this.$store.commit('weather/DEL_LOCATION_WEATHLER', slug)
    },
    feilReq (error) {
      console.log(error)
    }
  },
  components: {
    AppSidebar
  }
}
</script>
