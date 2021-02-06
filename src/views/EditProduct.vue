<template>
  <div class="EditProduct">
    <div class="container">
      <nav class="navbar navbar-light bg-light justify-content-between">
        <a class="navbar-brand">Edit product</a>
        <form class="form-inline">
          <router-link to="/">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
              Logout
            </button>
          </router-link>
        </form>
      </nav>
    </div>
    <div class="container">
      <table class="table table-borderless">
        <tr class="text-left">
          <th class="align-middle">Brand Name</th>
          <td>{{ object.brandName }}</td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Product Name</th>
          <td>{{ object.productName }}</td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Quantity</th>
          <td>
            <input
              type="number"
              id="quantity"
              name="quantity"
              :placeholder="object.quantity"
            />
          </td>
        </tr>
        <tr class="text-left">
          <th class="align-middle">Cost</th>
          <td>
            <input
              type="number"
              id="price"
              name="cost"
              :placeholder="object.price"
            />
          </td>
        </tr>
        <!--    <a href="/MerchantPortal" class="btn btn-primary btn-xs pull-right"><span class="glyphicon glyphicon-edit"></span>Edit</a>  -->
      </table>
      <input type="submit" value="Save" v-on:click="update(object)" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import store from "../store";

export default {
  name: "EditProduct",
  data() {
    return {
      object: store.state.inventoryObject,
    };
  },
  methods: {
    update: function (object) {
      object.quantity = document.getElementById("quantity").value;
      object.price = document.getElementById("price").value;
      console.log(object);
      const url = store.state.API_LOCATION + "/api/inventory/";
      axios
        .put(url, object)
        .then((res) => res.data)
        .then((data) => {
          console.log(data);
          this.$router.push("/MerchantPortal");
        });
    },
  },
};
</script>