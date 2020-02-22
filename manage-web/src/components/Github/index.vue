<template>
  <div>
    <svg-icon icon-class="github" @click="click" />
  </div>
</template>

<script>
export default {
  name: 'Github',
  methods: {
    click() {
      window.open('https://github.com/maokofan/portalSite_UI_vue/tree/master/manage-web', '_blank')
    }
  }
}
</script>
