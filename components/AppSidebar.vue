<template>
  <aside>
    <h2>Cityes</h2>
    <b-list-group>
      <b-list-group-item v-for="(location, index) in locations" :key="index">
        <nuxt-link :to="'/locations/' + location.slug" exact-active-class="active">
          {{ location.data.name }}
        </nuxt-link>
      </b-list-group-item>
    </b-list-group>
  </aside>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
   computed: {
    ...mapGetters({
      locations: 'weather/locations'
    })
  }
}
</script>
