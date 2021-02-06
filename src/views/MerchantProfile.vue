<template>
  <div class="container">
    <div class="card bg-light">
      <article class="card-body mx-auto" style="max-width: 400px">
        <h4 class="card-title mt-3 text-center">Profile</h4>
        <img
          :src="imageUrl"
          alt=""
          class="my-2"
          width="100"
          height="100"
          id="profilePic"
        />
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
        <div class="form-group input-group mb-3">
          <div class="custom-file">
            <input
              type="file"
              v-on:change="imageAdded($event)"
              class="custom-file-input"
              id="imgUpload"
            />
            <label
              class="custom-file-label text-left"
              for="imgUpload"
              id="imageUploadLabel"
              >Choose file</label
            >
          </div>

          <button class="btn btn-outline-dark" v-on:click="uploadImage" id="">
            Upload
          </button>
        </div>
        <div class="form-group">
          <button v-on:click="update" class="btn btn-dark btn-block">
            Update Details
          </button>
        </div>
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
  name: "MerchantProfile",
  data() {
    return {
      imageData: null,
      imageUrl: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      gst: "",
    };
  },
  mounted() {
    console.log("inside profile mounted");
    if (store.state.merchantDetails == null) {
      const url =
        store.state.API_LOCATION +
        `/api/merchant/${localStorage.getItem("merchantId")}`;
      axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          store.state.merchantDetails = data;
          this.imageUrl = store.state.merchantDetails.imageUrl;
          this.firstName = store.state.merchantDetails.firstName;
          this.lastName = store.state.merchantDetails.lastName;
          this.phoneNumber = store.state.merchantDetails.phoneNumber;
          this.email = store.state.merchantDetails.email;
          this.gst = store.state.merchantDetails.gst;
        });
    } else {
      this.imageUrl = store.state.merchantDetails.imageUrl;
      this.firstName = store.state.merchantDetails.firstName;
      this.lastName = store.state.merchantDetails.lastName;
      this.phoneNumber = store.state.merchantDetails.phoneNumber;
      this.email = store.state.merchantDetails.email;
      this.gst = store.state.merchantDetails.gst;
    }
    this.imageData = null;
  },
  methods: {
    imageAdded: function (event) {
      this.imageData = event.target.files[0];
      console.log(this.imageData);
      document.getElementById(
        "imageUploadLabel"
      ).innerHTML = this.imageData.name;
    },
    uploadImage: function () {
      if (this.imageData != null) {
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
              alert("Image Uploaded");
            });
          }
        );
      }
    },
    update: function () {
      console.log(this.imageData);
      const putUrl = store.state.API_LOCATION + "/api/merchant/";
      const data = {
        merchantId: localStorage.getItem("merchantId"),
        imageUrl: this.imgUrl,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        gst: this.gst,
        phoneNumber: this.phoneNumber,
      };
      console.log(data);
      axios
        .put(putUrl, data)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          store.state.merchantDetails = data;
          alert("Updated Profile Details");
        });
    },
  },
};
</script>