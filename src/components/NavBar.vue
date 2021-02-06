<template>
<div class="navbar">
    <b-navbar toggleable="lg" type="dark" variant="success">
      <b-navbar-brand href="#" id="brand">WattShop</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav id="item">
          <b-nav-item href="#">Washing Machine</b-nav-item>
          <b-nav-item href="#">Refrigator</b-nav-item>
          <b-nav-item href="#">Vaccuum Cleaner</b-nav-item>
          <b-nav-item href="#">Oven</b-nav-item>
          <b-nav-item href="#">TV</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-button id="search" class="btn-info"
              >Search for Products</b-button
            >
            <b-button id="signup" class="btn-primary">Signup</b-button>
            <b-button class="btn-dark">Login</b-button>
            <!-- <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button> -->
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em class="user">User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Cart</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</div>
  <!-- Links -->

  <!-- Navbar -->
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style scoped>
/* #item{
  margin-left:6%;
  font-size: 1.5rem;
} */
#brand {
  font-size: 2.5rem;
}
#search {
  padding-right: 10px;
  margin-right: 10px;
}
#signup {
  margin-right: 10px;
}
.nav-item {
  padding-left: 15px;
  font-size: 1.5rem;
  color: gray;
}
.nav-item:hover {
  color: red;
}
.user {
  font-style: inherit;
}
</style>
