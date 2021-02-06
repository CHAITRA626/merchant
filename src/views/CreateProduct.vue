<template>
  <div class="AddProduct">
    <div class="container">
      <nav class="navbar navbar-dark bg-secondary justify-content-between">
        <a class="navbar-brand">Add new product to catalog</a>
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
                v-model="categoryId"
              >
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
          <th class="align-middle">Product Brand</th>
          <td>
            <input
              type="text"
              id="product brand"
              name="product brand"
              placeholder="Product Brand"
              v-model="brandName"
            />
          </td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Product Name</th>
          <td>
            <input
              type="text"
              id="product name"
              name="product name"
              placeholder="Product Name"
              v-model="productName"
            />
          </td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Product Description</th>
          <td>
            <textarea
              v-model="productDescription"
              rows="2"
              cols="45"
            ></textarea>
          </td>
        </tr>

        <tr class="text-left">
          <th class="align-middle">Product Specification</th>
          <td>
            <div
              class="form-group"
              v-for="(specification, k) in specificationList"
              :key="k"
            >
              <input
                type="text"
                class="text-center"
                name="specificationKey"
                v-model="specification.key"
                placeholder="key"
              />
              :
              <input
                type="text"
                class="text-center"
                name="specificationValue"
                v-model="specification.value"
                placeholder="value"
              />
            </div>
            <input type="submit" value="Add More" v-on:click="addmore()" />
          </td>
        </tr>

        <tr class="text-left">
          <th class="align-middle">Product image</th>
          <td>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              v-on:change="imageAdded($event)"
            />
          </td>
        </tr>
      </table>
      <div class="form-group">
        <button v-on:click="add" class="btn btn-success btn-sm">
          Add product
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase/app";
import "firebase/storage";
import store from "../store";

export default {
  name: "CreareProduct",
  data() {
    return {
      imageData: null,
      imageUrl: null,
      productName: "",
      brandName: "",
      categoryId: "",
      productDescription: "",
      specificationList: [
        {
          key: "",
          value: "",
        },
      ],
    };
  },
  methods: {
    logout: function () {
      localStorage.removeItem("merchantId");
    },
    imageAdded: function (event) {
      this.imageData = event.target.files[0];
    },
    addmore: function () {
      this.specificationList.push({
        key: "",
        value: "",
      });
    },
    add: function () {
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
            const postUrl = store.state.API_LOCATION + "/api/products/";
            const data = {
              categoryId: this.categoryId,
              brandName: this.brandName,
              productName: this.productName,
              productDescription: this.productDescription,
              imageUrl: this.imgUrl,
              specificationList: this.specificationList,
            };
            console.log(data);
            axios
              .post(postUrl, data)
              .then((res) => res.data)
              .then((data) => {
                console.log(data);
                const postToSearchUrl =
                  store.state.API_LOCATION + "/api/search/save";
                axios
                  .post(postToSearchUrl, data)
                  .then((res) => res.data)
                  .then((data) => {
                    console.log(data);
                    this.$router.push("/AddProduct");
                  });
              });
          });
        }
      );
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