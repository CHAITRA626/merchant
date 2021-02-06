<template>
  <div class="UserProfile">
    <h1>PROFILE</h1>
    <div style="float:right">
          <router-link to="/"><input type="submit" value="LOGOUT"></router-link><br>
</div>
      <div class="container">
          <table class="table table-striped custab">
            <tr>
            <th><label>First Name</label></th>
            <td><input type="text" value="John"></td>
            </tr>
            <tr>
            <th><label>Last Name</label></th>
            <td><input type="text" value="Smith"></td>
            </tr>
            <tr>
            <th><label>Email</label></th>
            <td><input type="text" value="jsmith@yourcompany.com" ></td>
            </tr>
            <tr>
            <th><label>Address</label></th>
            <td><textarea value="Smith" rows="3">2817 S 49th Apt 314 San Jose, CA 95101></textarea></td>
            </tr>
            <tr>
            <th><label>Phone Number</label></th>
            <td><input type="tel" value="9999999999"></td>
            </tr>
            <tr>
                <th><label>Order History</label></th>
                <td><table>
                    <thead><tr><th>Category ID</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Cost</th></tr></thead>
          <tr>
                <td>2</td>
                <td>1</td>
                <td>one plus tv</td>
                <td>4</td>
                <td>40000</td>
            </tr></table></td></tr>
            </table>
            <div>
            <router-link to="/"><input type="submit" value="Update"></router-link>
            <router-link to="/Home"><input type="submit" value="Back"></router-link><br/>
            </div>
      </div>

  </div>
</template>
<style scoped>
input[type=button], input[type=submit], input[type=reset]  {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}
h1{
    color: mediumspringgreen;
    text-shadow: 0px 2px 2px black;
}
</style>
