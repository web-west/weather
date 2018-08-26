<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#">Weather</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="/">Home</b-nav-item>
        <b-nav-item href="/add-location">Add location</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-form @submit.prevent="onSubmit">
          <vue-google-autocomplete
            id="map"
            classname="mr-sm-2 form-control form-control-sm"
            placeholder="Input loaction"
            types="(cities)"
            v-on:placechanged="getAddressData"
          >
          </vue-google-autocomplete>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  data () {
    return {
      coordinates: null
    }
  },
  methods: {
    getAddressData: function (addressData, placeResultData, id) {
      if (addressData.latitude && addressData.longitude) {
        this.coordinates = addressData.latitude + ',' + addressData.longitude
      }
    },
    onSubmit () {
      if (this.coordinates) {
        this.$router.push('/q/' + this.coordinates)
      }
    }
  }
}
</script>
