let pname = document.getElementById("pname");
let pmodel = document.getElementById("pmodel");
let prize = document.getElementById("prize");
let year = document.getElementById("year");
let delivery = document.getElementById("delivery");

let recod = document.getElementById("ViweData");
let cart = document.getElementById("cart");
let carts = document.getElementById("carts");
let addShow = document.getElementById("addShow");

// Error
let errname = document.getElementById("errname");
let errlname = document.getElementById("errlname");
let erremail = document.getElementById("erremail");
let errage = document.getElementById("errage");
let errCourse = document.getElementById("errCourse");

let isEdit = false;
let isIndex;

// getData
const getData = () => {
  let data = JSON.parse(localStorage.getItem("student_Data"));
  if (data) {
    return data;
  } else {
    return [];
  }
};
let Storage = getData();

// getCart
const getCart = () => {
  let cartData = JSON.parse(localStorage.getItem("cart_Item"));
  if (cartData) {
    return cartData;
  } else {
    return [];
  }
};
let Cart = getCart();

//count_Data
const addCount = () => {
  carts.innerHTML = Cart.length;
};
addCount();
Storage = getData();

//create Data
const DataFrom = () => {
  event.preventDefault();
  if (isEdit) {

    let data = [...Storage];
    let obj = {
      id: isIndex ? isIndex : Math.floor(Math.random() * 1000),
      name: pname.value,
      model: pmodel.value,
      prize: prize.value,
      year: year.value,
      delivery: delivery.value,
    };
    // updateData
    const updateData = data.map((recod) => {
      if (recod.id == isIndex) {
        return (recod = obj);
      } else {
        return recod;
      }
    });
                                                                                                                                                                                      
    console.log("update", updateData);
    Storage = updateData;

    isIndex = undefined;
    isEdit = false;
  } else {
    if (pname.value == "") {
      errname.innerHTML = "Plase Enter The Product name req...";
      return false;
    } else {
      errname.innerHTML = "";
    }
    if (pmodel.value == "") {
      errlname.innerHTML = "Enter The Product Model";
       return false;
    } else {
      errlname.innerHTML = "";
    }
    if (prize.value == "") {
      erremail.innerHTML = "Enter Product Prize";
       return false;
    } else {
      erremail.innerHTML = "";
    }
    if (year.value == "") {
      errage.innerHTML = "Enter Booking Date";
       return false;
    } else {
      errage.innerHTML = "";
    }
    if (delivery.value == "") {
      errCourse.innerHTML = "Enter the delivery Date";
       return false;
    } else {
      errCourse.innerHTML = "";
    }

    let obj = {
      id: isIndex ? isIndex : Math.floor(Math.random() * 1000),
      name: pname.value,
      model: pmodel.value,
      prize: prize.value,
      year: year.value,
      delivery: delivery.value,
    };

    Storage = [...Storage, obj];
  }
  displyData();
  localStorage.setItem("student_Data", JSON.stringify(Storage));
  
  // Clear form fields after submission
  pname.value = "";
  pmodel.value = "";
  prize.value = "";
  year.value = "";
  delivery.value = "";
};

// Edit
const singleRec = (id) => {
  let data = [...Storage];
  let singleRec = data.filter((d) => {
    return d.id == id;
  });
 
  id.value = singleRec[0].id;
  pname.value = singleRec[0].name;
  pmodel.value = singleRec[0].model;
  prize.value = singleRec[0].prize;
  year.value = singleRec[0].year;
  delivery.value = singleRec[0].delivery;
  localStorage.setItem("student_Data", JSON.stringify(data));
  isEdit = true;
  isIndex = id;
};

// getProduct
const getProduct = (id) => {  
  let data = [...Storage];
  let addCart = data.find((p) => p.id == id);

  // Check if the product already exists in the cart
  let existingItem = Cart.find((item) => item.id === addCart.id);
  if (existingItem) {
    existingItem.qty += 1; // Increment quantity if already in cart
  } else {
    addCart.qty = 1; // Set quantity to 1 for new item
    Cart.push(addCart); // Add product to the cart
  }

  localStorage.setItem("cart_Item", JSON.stringify(Cart));
  Cart = getCart();
  addCount();
  viewCart();
};

//total price
const totalPriceFun = () => {
  let totalPrice = Cart.reduce((sum, item) => {
    return sum + (parseFloat(item.prize) * item.qty); // Calculate total price for each item considering its quantity

  }, 0);
  return totalPrice.toFixed(2); // Ensure total price is formatted to 2 decimal places
};

//view cart
const viewCart = () => {
  addShow.innerHTML = "";
  if (Cart.length > 0) {
    Cart.forEach((pro) => {
      addShow.innerHTML += `<tr class="text-center">
                              <td>${pro.id}</td>
                              <td>${pro.name}</td>
                              <td>
                              <button type="button" class="btn btn-primary" onclick="return decrIment(${pro.id})">-</button>
                              <span>${pro.qty}</span>
                              <button type="button" class="btn btn-primary" onclick="return incrIment(${pro.id})">+</button>
                              </td>
                              <td>${pro.prize}</td>
                              <td>
                                <button type="button" class="btn btn-danger" onclick="return deleteFun(${pro.id})">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
                                  </svg>
                                </button>
                              </td>
                            </tr>`;
    });
    let totalPrice = totalPriceFun();
    addShow.innerHTML += `<tr class="text-center">
                            <td colspan="5" class="">Total Price: ${totalPrice}</td>
                          </tr>`;
  } else {
    addShow.innerHTML = "Choose your items";
  }
};
viewCart();

// displyDataFunftion
const displyData = () => {
  recod.innerHTML = "";

  Storage.forEach((rec) => {
    recod.innerHTML += `<tr class="text-center">
                            <td>${rec.id}</td>
                            <td>${rec.name}</td>
                            <td>${rec.model}</td>
                            <td>${rec.prize}</td>
                            <td>${rec.year}</td>
                            <td>${rec.delivery}</td>
                            <td>
                              <button class="btn btn-outline-primary" onclick = "return singleRec(${rec.id})">Edit</button>
                              <button class="btn btn-outline-danger inline" onclick ="return deleteRec(${rec.id})">Delete</button> 
                            </td>
                            <td>
                              <button class="btn btn-outline-primary inline" onclick ="return getProduct(${rec.id})">Add</button>
                            </td>
                         </tr>`;
  });
};
displyData();

//incriment
const incrIment = (id) => {
  let item = Cart.find((pro) => pro.id == id);
  if (item) {
    item.qty += 1;
    localStorage.setItem("cart_Item", JSON.stringify(Cart));
    viewCart();
  }
};

// decrIment
const decrIment = (id) => {
  let item = Cart.find((pro) => pro.id == id);
  if (item && item.qty > 1) {
    item.qty -= 1;
    localStorage.setItem("cart_Item", JSON.stringify(Cart));
    viewCart();
  }
};

// DeleteFunction
const deleteRec = (id) => {
  let data = [...Storage];
  let deleteItem = data.filter((delId) => {
    return delId.id != id;
  });
  localStorage.setItem("student_Data", JSON.stringify(deleteItem));
  Storage = getData();
  displyData();
};

//addCard in remove
const deleteFun = (id) =>{
  Cart = [...Cart];
  console.log("id",id);
  let deleteData = Cart.filter((delId) => {
    return delId.id != id;
})
console.log(deleteData);
  localStorage.setItem("cart_Item", JSON.stringify(deleteData));
  Cart = getCart();
  viewCart();
}


