<template>
  <div class="merchantportal">
    <div class="container">
      <nav class="navbar navbar-dark bg-secondary justify-content-between">
        <a class="navbar-brand">Merchant Portal</a>

        <router-link to="/">
          <button
            class="btn btn-outline-light my-2 my-sm-0"
            v-on:click="logout"
          >
            Logout
          </button>
        </router-link>
      </nav>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-12">
          <router-link to="/AddProduct" class="btn btn-success btn-xs mr-sm-2"
            ><b>+</b> Add a product to inventory</router-link
          >
        </div>
      </div>
    </div>

    <div class="container">
      <table class="table">
        <thead>
          <tr class="table-warning">
            <th>Brand Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody v-for="item in inventory" :key="item.inventoryId">
          <tr>
            <td>{{ item.brandName }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>
              <button
                type="button"
                class="btn btn-sm btn-outline-dark"
                v-on:click="editInventory($event, item)"
              >
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <div>
        <router-link class="btn btn-primary btn-xs mr-sm-2 col-xs-6" to="/Sales"
          >Go to Sales</router-link
        >
        <router-link
          class="btn btn-primary btn-xs mr-sm-2 col-xs-6"
          to="/MerchantProfile"
          >Go to Profile page</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../vue.config";
import Vue from "vue";
import store from "../store";

export default {
  name: "MerchantPortal",
  data() {
    return {
      isLoaded: false,
      inventory: [],
    };
  },
  methods: {
    editInventory: function (event, item) {
      store.state.inventoryObject = item;
      this.$router.push("/EditProduct");
    },
    logout: function () {
      localStorage.removeItem("merchantId");
    },
  },
  mounted() {
    if (localStorage.getItem("merchantId") === null) {
      this.$router.push("/");
    } else {
      const merchantUrl =
        store.state.API_LOCATION +
        `/api/merchant/${localStorage.getItem("merchantId")}`;
      if (store.state.merchantDetails == null) {
        axios
          .get(merchantUrl)
          .then((res) => res.data)
          .then((data) => {
            store.state.merchantDetails = data;
          });
      }
      let url =
        store.state.API_LOCATION +
        `/api/inventory/merchant/${localStorage.getItem("merchantId")}`;
      axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          this.isLoaded = true;
          this.inventory = data;
        });
    }
  },
};
</script>
<style>
tbody > tr > :nth-child(odd) {
  background-color: lightpink;
}
tbody > tr > :nth-child(even) {
  background-color: lightblue;
}
</style>