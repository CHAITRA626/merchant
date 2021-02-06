<template>
  <div class="sales">
    <div class="merchantportal">
      <div class="container">
        <nav class="navbar navbar-dark bg-secondary justify-content-between">
          <a class="navbar-brand">Sales</a>
          <form class="form-inline">
            <router-link to="/MerchantPortal">
              <button class="btn btn-outline-light my-2 my-sm-0">Back</button>
            </router-link>
            <router-link to="/">
              <button
                class="btn btn-outline-light my-2 my-sm-0"
                v-on:click="logout"
              >
                Logout
              </button>
            </router-link>
          </form>
        </nav>
      </div>
    </div>
    <div class="container">
      <table class="table">
        <thead>
          <tr class="table-warning">
            <th>Brand Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Cost</th>
            <th>Purchased On</th>
          </tr>
        </thead>
        <tbody v-for="(item, k) in sales" :key="k">
          <tr>
            <td>{{ item.brandName }}</td>
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_LOCATION } from "../../vue.config";
import Vue from "vue";
import store from "../store";

export default {
  name: "Sales",
  data() {
    return {
      sales: [],
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("merchantId");
    },
  },
  mounted() {
    if (localStorage.getItem("merchantId") === null) {
      this.$router.push("/");
    } else {
      let url =
        store.state.API_LOCATION +
        `/api/sales/merchant/${localStorage.getItem("merchantId")}`;
      let tempSales = [];
      axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          tempSales = data;
          for (let i = 0; i < tempSales.length; i++) {
            axios
              .get(
                store.state.API_LOCATION +
                  `/api/products/${tempSales[i].productId}`
              )
              .then((res) => res.data)
              .then((data) => {
                tempSales[i].brandName = data.brandName;
                tempSales[i].productName = data.productName;
                this.sales.push(tempSales[i]);
              });
          }
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