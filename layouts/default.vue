<template>
  <div>
    <no-ssr>
      <app-nav />
    </no-ssr>
    <main class="bd-masthead">
      <nuxt/>
    </main>
  </div>
</template>
<script>
import AppNav from '~/components/AppNav'
export default {
  components: {
    AppNav
  }
}
</script>
<style lang="sass">
  .bd-masthead
    padding-top: 5rem
    padding-bottom: 5rem
</style>
