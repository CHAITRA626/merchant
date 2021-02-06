<template>
  <div class="container">
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px">
        <h3 class="card-title mt-3 text-center">Create Account</h3>
        <p>
          <a href="" class="btn btn-block btn-google">
            <i class="bi bi-google">Login via Google</i></a
          >
          <a href="" class="btn btn-block btn-github">
            <i class="fab fa-github">Login via Github</i></a
          >
        </p>
        <p class="divider-text">
          <span class="bg-light">OR</span>
        </p>

        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="First name"
            v-model="firstName"
            type="text"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-user"></i> </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Last name"
            v-model="lastName"
            type="text"
          />
        </div>
        <!-- form-group// -->
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
            <span class="input-group-text">
              <i class="fa fa-phone"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Phone number"
            v-model="phoneNumber"
            type="text"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <i class="fa fa-building"></i>
            </span>
          </div>
          <input
            name=""
            class="form-control"
            placeholder="Enter your GSTIN number"
            v-model="gst"
            type="text"
          />
        </div>
        <!-- form-group end.// -->
        <div class="form-group input-group">
          <p>Profile Pic:</p>
          <input
            type="file"
            accept="image/*"
            v-on:change="imageAdded($event)"
            id="profilePic"
          />
        </div>
        <!-- form-group end.// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Create password"
            v-model="password"
            type="password"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
          </div>
          <input
            class="form-control"
            placeholder="Repeat password"
            v-model="confirmPassword"
            type="password"
          />
        </div>
        <!-- form-group// -->
        <div class="form-group">
          <button v-on:click="register" class="btn btn-dark btn-block">
            Create Account
          </button>
        </div>
        <!-- form-group// -->
        <router-link to="/">
          <p class="text-center" style="color: black">Have an account? Login</p>
        </router-link>
      </article>
    </div>
    <!-- card.// -->
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";
import firebase from "firebase/app";
import "firebase/storage";

export default {
  name: "CreareProduct",
  data() {
    return {
      imageData: null,
      imageUrl: null,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gst: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    imageAdded: function (event) {
      this.imageData = event.target.files[0];
    },
    register: function () {
      console.log("inside register");
      if (this.password !== this.confirmPassword) {
        window.alert("Passwords didn't match");
      } else {
        console.log("passwords matched");

        console.log(this.imageData);
        this.imgUrl = null;
        const storageRef = firebase
          .storage()
          .ref(`${this.imageData.name}`)
          .put(this.imageData);
        storageRef.on(
          `state_changed`,
          (snapshot) => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          (error) => {
            console.log(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.imgUrl = url;
              console.log(this.imgUrl);
              const postUrl = store.state.API_LOCATION + "/api/merchant/";
              const data = {
                imageUrl: this.imgUrl,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                gst: this.gst,
                phoneNumber: this.phoneNumber,
              };
              console.log(data);
              axios
                .post(postUrl, data)
                .then((res) => res.data)
                .then((data) => {
                  console.log(data);
                  this.$router.push("/");
                });
            });
          }
        );
      }
    },
  },
};
</script>