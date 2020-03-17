<template>
        <section class="app-main">
                <transition name="fade-transform" mode="out-in">
             
                    <router-view :key="key"/>
                </transition>
        </section>
</template>
<script>
export default {
  name:'Appmain',
  computed:{
    key(){
      return this.$route.path
    }
  }
}
</script>
<style>
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 200px);
  width: 100%;
  position: relative;
/*   overflow: hidden; */
}

</style>