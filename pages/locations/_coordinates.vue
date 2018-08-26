<template>
  <b-container>
    <b-row>
      <b-col>
        <app-sidebar />
      </b-col>
      <b-col cols="9" v-if="locationsBySlug($route.params.coordinates) !== undefined">
        <h1>City: {{ locationsBySlug($route.params.coordinates).data.name + ' ' + locationsBySlug($route.params.coordinates).data.sys.country }}</h1>
        <b-row>
          <b-col cols="5">
            <b-card bg-variant="warning"
              text-variant="white"
              :header="'Date: ' + locationsBySlug($route.params.coordinates).data.name + ' ' + locationsBySlug($route.params.coordinates).data.sys.country"
              class="text-center">
                <b-row>
                  <b-col cols="6">
                    <div>
                      <img :src="`https://openweathermap.org/img/w/${locationsBySlug($route.params.coordinates).data.weather[0].icon}.png`" width="100" height="100" alt="">
                      <div>{{ locationsBySlug($route.params.coordinates).data.weather[0].main }} - {{ locationsBySlug($route.params.coordinates).data.weather[0].description }}</div>
                    </div>
                  </b-col>
                  <b-col cols="6">
                    <div>Date: {{ locationsBySlug($route.params.coordinates).data.dt | moment('DD.MM.YYYY') }}</div>
                    <div>Temp: {{ (locationsBySlug($route.params.coordinates).data.main.temp - 273.15).toFixed() }}&nbsp;°C</div>
                    <div>Temp min: {{ (locationsBySlug($route.params.coordinates).data.main.temp_max - 273.15).toFixed() }}&nbsp;°C</div>
                    <div>Temp max: {{ (locationsBySlug($route.params.coordinates).data.main.temp_max - 273.15).toFixed() }}&nbsp;°C</div>
                    <div>Pressure: {{ locationsBySlug($route.params.coordinates).data.main.pressure }}</div>
                    <div>Humidity: {{ locationsBySlug($route.params.coordinates).data.main.humidity }}</div>
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
  computed: {
    ...mapGetters({
      locationsBySlug: 'weather/locationsBySlug'
    })
  },
  components: {
    AppSidebar
  }
}
</script>
