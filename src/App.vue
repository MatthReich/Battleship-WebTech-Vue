<template>
  <v-app class="grey lighten-4">
    <navbar />
    <v-main>
      <router-view></router-view>
    </v-main>
    <myfooter />
  </v-app>
</template>

<script>
import navbar from "@/components/main/navbar";
import myfooter from "@/components/main/footer";
export default {
  name: "App",
  components: { navbar, myfooter }
};
</script>
