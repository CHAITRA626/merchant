<template>
  <div class="container">
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 600px">
        <h3 class="card-title mt-3 text-center">LOGIN</h3>
        <p>
          <a href="" class="btn btn-block btn-google">
            <i class="bi bi-google">Login via Google</i></a
          >
          <a
            href=""
            style="backgroundcolor: lightgreen"
            class="btn btn-block btn-github"
          >
            <i class="fab fa-github">Login via Github</i></a
          >
        </p>

        <p class="divider-text">
          <span class="bg-active">OR</span>
        </p>
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Email address"
            v-model="email"
            type="email"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Enter password"
            v-model="password"
            type="password"
          />
        </div>

        <div class="form-group">
          <button v-on:click="login" class="btn btn-dark btn-block">
            Login
          </button>
        </div>
        <!-- form-group// -->
        <router-link to="/Register">
          <p class="text-center" style="color: black">
            Don't have an account? Register
          </p>
        </router-link>
      </article>
    </div>
    <!-- card.// -->
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login: function () {
      const getUrl =
        store.state.API_LOCATION + `/api/merchant/email/${this.email}`;

      axios
        .get(getUrl)
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .then((data) => {
          console.log(data);
          if (data === "") {
            alert("user doesn't exist");
          } else {
            console.log(data);
            store.state.merchantDetails = data;
            localStorage.setItem("merchantId", data.merchantId);
            this.$router.push("/MerchantPortal");
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
