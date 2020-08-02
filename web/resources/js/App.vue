<template>
  <div>
    <header>
      <Navbar />
    </header>
    <main>
      <div class="container">
        <RouterView />
      </div>
    </main>
    <Footer />
  </div>
</template>

<script>
import Navbar from "./components/Layouts/Navbar.vue";
import Footer from "./components/Layouts/Footer.vue";

export default {
  components: {
    Navbar,
    Footer
  }
};
</script>
