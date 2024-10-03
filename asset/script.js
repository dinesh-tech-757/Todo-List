const setFood = document.querySelector(".input-order input");
const getFood = document.getElementById("get-food");
const setFoodList = document.getElementById("update-food");
const localStorageKey = "fooditems";
setFood.focus();

document.addEventListener("DOMContentLoaded", () => {
  // LocalStorage Fetch UI
  const fetchedFoodItems = [
    ...JSON.parse(localStorage.getItem(localStorageKey)),
  ];

  fetchedFoodItems.forEach((item) => {
    let li = document.createElement("li");
    setFoodList.appendChild(li);

    // assigning textContent & className to newFoodItemEl
    let div = document.createElement("div");
    div.innerText = item.fooditem;
    li.appendChild(div);

    let div2 = document.createElement("div");
    div2.setAttribute("onclick", "delt(event)");
    div2.innerHTML = `<i class="fa fa-xmark"></i>`;
    li.appendChild(div2);
  });
});

function addingFoodList() {
  let li = document.createElement("li");
  setFoodList.appendChild(li);

  let div = document.createElement("div");
  div.innerText = setFood.value;
  li.appendChild(div);

  let div2 = document.createElement("div");
  div2.setAttribute("onclick", "delt(event)");
  div2.innerHTML = `<i class="fa fa-xmark"></i>`;
  li.appendChild(div2);
  removeUi();

  // set local storage
  localStorage.setItem(
    localStorageKey,
    JSON.stringify([
      ...JSON.parse(localStorage.getItem(localStorageKey) || "[]"),
      { fooditem: setFood.value },
    ])
  );

  setFood.value = null;
}

// Adding food into FoodList
let newFood = (e) => {
  if (setFood.value === "" || !/^[A-Za-z\s]+$/.test(setFood.value)) {
    e.preventDefault();
    setFood.value = null;
  } else addingFoodList();
  setFood.value = null;
  removeUi();
};

getFood.addEventListener("click", newFood);

setFood.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    newFood();
  } else {
    event.preventDefault();
  }
});

function delt(event) {
  let rmv = event.target.parentNode.parentNode;
  rmv.remove();

  // Remove LocalStorage
  const fetchedFoodItems = [
    ...JSON.parse(localStorage.getItem(localStorageKey)),
  ];

  fetchedFoodItems.forEach((item) => {
    if (item.fooditem === rmv.innerText) {
      fetchedFoodItems.splice(fetchedFoodItems.indexOf(item), 1);
    }
  });

  localStorage.setItem(localStorageKey, JSON.stringify(fetchedFoodItems));

  removeUi();
}

const greetUser = document.getElementById("nameGreet");
const removeui = document.getElementById("remove-ui");

setFood.addEventListener("change", (e) => {
  greetUser.innerText = `Your Dish is Ordered
  Click ( X ) mark to remove dish`;
});

function removeUi() {
  if (setFoodList.children.length > 0) {
    removeui.hidden = false;
  } else {
    removeui.hidden = true;
  }
}
removeUi();
