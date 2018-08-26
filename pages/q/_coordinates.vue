<template>
  <b-container>
    <b-row>
      <b-col>
        <app-sidebar />
      </b-col>
      <b-col cols="9">
        <h1>Search: {{ qBySlug($route.params.coordinates).data.name + ' ' + qBySlug($route.params.coordinates).data.sys.country }}</h1>
        <b-row>
          <b-col cols="5">
            <b-card bg-variant="warning"
              text-variant="white"
              :header="'Date: ' + qBySlug($route.params.coordinates).data.name + ' ' + qBySlug($route.params.coordinates).data.sys.country"
              class="text-center">
                <b-row>
                  <b-col cols="6">
                    <div>
                      <img :src="`https://openweathermap.org/img/w/${qBySlug($route.params.coordinates).data.weather[0].icon}.png`" width="100" height="100" alt="">
                      <div>{{ qBySlug($route.params.coordinates).data.weather[0].main }} - {{ qBySlug($route.params.coordinates).data.weather[0].description }}</div>
                    </div>
                  </b-col>
                  <b-col cols="6">
                    <div>Date: {{ qBySlug($route.params.coordinates).data.dt | moment('DD.MM.YYYY') }}</div>
                    <div>Temp: {{ (qBySlug($route.params.coordinates).data.main.temp - 273.15).toFixed() }}&nbsp;°C</div>
                    <div>Temp min: {{ (qBySlug($route.params.coordinates).data.main.temp_max - 273.15).toFixed() }}&nbsp;°C</div>
                    <div>Temp max: {{ (qBySlug($route.params.coordinates).data.main.temp_max - 273.15).toFixed() }}&nbsp;°C</div>
                    <div>Pressure: {{ qBySlug($route.params.coordinates).data.main.pressure }}</div>
                    <div>Humidity: {{ qBySlug($route.params.coordinates).data.main.humidity }}</div>
                  </b-col>
                </b-row>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import AppSidebar from '~/components/AppSidebar'
export default {
  async fetch ({ store, params }) {
    let coordinates = params.coordinates.split(',')
    let { data } = await axios.get(`http://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY_OPENWEATHERMAP}&lat=${coordinates[0]}&lon=${coordinates[1]}`)
    store.commit('weather/SET_SEARCH_LOCATION_WEATHER',
    {
      slug: params.coordinates,
      data: data
    })
  },
  computed: {
    ...mapGetters({
      qBySlug: 'weather/qBySlug'
    })
  },
  components: {
    AppSidebar
  }
}
</script>
