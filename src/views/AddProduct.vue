/* eslint-disable */

<template>
  <div class="AddProduct">
    <div class="container">
      <nav class="navbar navbar-dark bg-secondary justify-content-between">
        <a class="navbar-brand">Add new product to inventory</a>
        <form class="form-inline">
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

    <div class="container">
      <div class="col-12">
        <router-link to="/CreateProduct" class="btn btn-success btn-xs"
          ><b>+</b> Add a new product to catalog</router-link
        >
      </div>
    </div>

    <div class="container">
      <table class="table table-striped">
        <tr class="text-left">
          <th class="align-middle">Category</th>
          <td>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="categories">Options</label>
              </div>
              <select
                class="custom-select"
                id="categories"
                v-on:change="retrieveBrands($event)"
              >
                <option selected disabled>Choose one category</option>
                <option value="1">Television</option>
                <option value="2">Refrigerator</option>
                <option value="3">Oven</option>
                <option value="4">Washing Machine</option>
                <option value="5">Vacuum Cleaner</option>
              </select>
            </div>
          </td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Brand</th>
          <td>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="brands">Options</label>
              </div>
              <div>
                <select
                  class="custom-select"
                  id="brands"
                  v-on:change="retrieveProducts($event)"
                >
                  <option default>Choose a brand name</option>
                  <option
                    v-for="product in brandList"
                    :key="product.id"
                    :value="product.brandName"
                  >
                    {{ product.brandName }}
                  </option>
                </select>
              </div>
            </div>
          </td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Product</th>
          <td>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <label class="input-group-text" for="products">Options</label>
              </div>
              <select class="custom-select" id="products">
                <option
                  v-for="product in products"
                  :key="product.id"
                  :value="product.Name"
                >
                  {{ product.productName }}
                </option>
              </select>
            </div>
          </td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Quantity</th>
          <td>
            <input
              type="number"
              id="quantity"
              name="quantity"
              placeholder="Quantity"
            />
          </td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Cost</th>
          <td>
            <input type="number" id="cost" name="cost" placeholder="Price" />
          </td>
        </tr>
        <!-- <a href="/MerchantPortal" class="btn btn-primary btn-xs pull-right"><b>+</b> Add</a> -->
      </table>
      <div class="form-group">
        <button v-on:click="add" class="btn btn-primary btn-sm">
          Add product
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
</style>

<script>
import axios from "axios";
import store from "../store";
export default {
  name: "AddProduct",
  data() {
    return {
      products: [],
      brandList: [],
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("merchantId");
    },
    retrieveBrands: function (event) {
      console.log("in the categories listener");
      let url =
        store.state.API_LOCATION +
        `/api/products/getbrandname/${event.target.value}`;
      store.state.category = event.target.value;
      axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.brandList = data;
        });
    },

    retrieveProducts: function (event) {
      console.log("in the brands listener");
      let url =
        store.state.API_LOCATION +
        `/api/products/${store.state.category}/${event.target.value}`;
      axios
        .get(url)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.products = data;
        });
    },

    add: function (event) {
      console.log("in the add button listener");
      const url = store.state.API_LOCATION + `/api/inventory/`;

      const sel = document.getElementById("products");
      let data = {
        merchantId: localStorage.getItem("merchantId"),
        productId: this.products[sel.selectedIndex].id,
        productName: sel.options[sel.selectedIndex].text,
        brandName: document.getElementById("brands").value,
        price: document.getElementById("cost").value,
        quantity: document.getElementById("quantity").value,
      };
      console.log(data);
      axios
        .post(url, data)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.$router.push("/MerchantPortal");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    if (localStorage.getItem("merchantId") === null) {
      this.$router.push("/");
    }
  },
};
</script>
<style>
table > tr > :nth-child(odd) {
  background-color: lightpink;
}
table > tr > :nth-child(even) {
  background-color: lightblue;
}
</style>