<template>
  <b-container>
    <b-row>
      <b-col>
        <app-sidebar />
      </b-col>
      <b-col cols="9">
        <no-ssr>
        <div v-if="weatherCurrentUser">
          <h1>Your weather</h1>
          <b-row>
            <b-col cols="5">
              <b-card bg-variant="warning"
                text-variant="white"
                :header="'Date: ' + weatherCurrentUser.name + ' ' + weatherCurrentUser.sys.country"
                class="text-center">
                  <b-row>
                    <b-col cols="6">
                      <div>
                        <img :src="`https://openweathermap.org/img/w/${weatherCurrentUser.weather[0].icon}.png`" width="100" height="100" alt="">
                        <div>{{ weatherCurrentUser.weather[0].main }} - {{ weatherCurrentUser.weather[0].description }}</div>
                      </div>
                    </b-col>
                    <b-col cols="6">
                      <div>Date: {{ weatherCurrentUser.dt | moment('DD.MM.YYYY') }}</div>
                      <div>Temp: {{ (weatherCurrentUser.main.temp - 273.15).toFixed() }}&nbsp;°C</div>
                      <div>Temp min: {{ (weatherCurrentUser.main.temp_max - 273.15).toFixed() }}&nbsp;°C</div>
                      <div>Temp max: {{ (weatherCurrentUser.main.temp_max - 273.15).toFixed() }}&nbsp;°C</div>
                      <div>Pressure: {{ weatherCurrentUser.main.pressure }}</div>
                      <div>Humidity: {{ weatherCurrentUser.main.humidity }}</div>
                    </b-col>
                  </b-row>
              </b-card>
            </b-col>
          </b-row>
        </div>
        </no-ssr>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import AppSidebar from '~/components/AppSidebar'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default {
  data () {
    return {
      coordinatesGurrentUser: null
    }
  },
  computed: {
    ...mapGetters({
      weatherCurrentUser: 'weather/weatherCurrentUser'
    })
  },
  mounted () {
    this.$getLocation({})
      .then(this.getCoordinates)
      .catch(this.feilReq)
  },
  methods: {
    ...mapActions({
      setWeatherCurrentUser: 'weather/setWeatherCurrentUser',
    }),
    getCoordinates (coordinates) {
      if (coordinates !== undefined) {
        this.coordinatesGurrentUser = coordinates
      }
    },
    getWeatherCurrentUser (coordinates) {
      if (!this.weatherCurrentUser) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?appid=${process.env.API_KEY_OPENWEATHERMAP}&lat=${coordinates.lat}&lon=${coordinates.lng}`)
          .then(this.setWeatherCurrentUser)
          .catch(this.failReq)
      }
    },
    feilReq (error) {
      console.log(error)
    }
  },
  components: {
    AppSidebar
  },
  watch: {
    coordinatesGurrentUser (val) {
      this.getWeatherCurrentUser(val)
    }
  }
}
</script>


