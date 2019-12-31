<template>
  <section class="container">
    <div>
      <app-logo />
      <ul>
        <li v-for="(item, index) in data.result" :key="index" @click="btn">
          <p>{{ item.title }}--{{ item.passtime }}</p>
          <img :src="item.image" alt="" />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import AppLogo from "~/components/AppLogo.vue";

export default {
  async asyncData({ $axios }) {
    const data = await $axios.$post("getWangYiNews");
    return { data };
  },
  components: {
    AppLogo
  },
  methods:{
    btn(){
      this.$toast("测试文字")
    }
  },
  created(){
    
  },
  mounted() {
    // console.log(this.$msg); // Hello World
  }
};
</script>
<style>
  .container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
