<template>
  <b-navbar id="header" toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">IFBRa</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Home</b-nav-item>
        <b-nav-item to="/legenda">Legenda</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style language="scss" scoped>
#nav a.router-link-exact-active {
  color: white;
}
#header {
  position: sticky;
}
</style>
