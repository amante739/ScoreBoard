// Select the container where we want to add the dynamic divs
count = 0;
const INCREMENT = "increment";
const DECREMENT = "decrement";
// Create a function to generate the dynamic divs
function generateDynamicDiv() {
  // Create the main div with class "match"
  count++;
  const dynamicDiv = document.createElement("div");
  dynamicDiv.classList.add("match");
  //

  // Create the main div with class "wrapper"
  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("wrapper");

  // Create the button with class "lws-delete" and add an image
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("lws-delete");
  const deleteImage = document.createElement("img");
  deleteImage.setAttribute("src", "./image/delete.svg");
  deleteImage.setAttribute("alt", "");
  deleteButton.appendChild(deleteImage);

  // Create the heading with class "lws-matchName" and set its text content
  const matchNameHeading = document.createElement("h3");
  matchNameHeading.classList.add("lws-matchName");
  matchNameHeading.textContent = "Match 1";

  // Add the button and heading to the main div
  wrapperDiv.appendChild(deleteButton);
  wrapperDiv.appendChild(matchNameHeading);
  dynamicDiv.appendChild(wrapperDiv);
  /////////////////////

  // Create the div with class "inc-dec"
  const incDecDiv = document.createElement("div");
  incDecDiv.classList.add("inc-dec");

  // Create the form for increment
  const incrementForm = document.createElement("form");
  incrementForm.classList.add("incrementForm");
  incrementForm.setAttribute("onsubmit", "return false");
  const incrementLabel = document.createElement("h4");
  incrementLabel.textContent = "Increment";
  const incrementInput = document.createElement("input");
  incrementInput.setAttribute("type", "number");
  incrementInput.setAttribute("name", "increment");
  incrementInput.setAttribute("id", count);
  incrementInput.classList.add("lws-increment");
  incrementForm.appendChild(incrementLabel);
  incrementForm.appendChild(incrementInput);

  // Create the form for decrement
  const decrementForm = document.createElement("form");
  decrementForm.classList.add("decrementForm");
  decrementForm.setAttribute("onsubmit", "return false");
  const decrementLabel = document.createElement("h4");
  decrementLabel.textContent = "Decrement";
  const decrementInput = document.createElement("input");
  decrementInput.setAttribute("type", "number");
  decrementInput.setAttribute("name", "decrement");
  decrementInput.setAttribute("id", count);
  decrementInput.classList.add("lws-decrement");
  decrementForm.appendChild(decrementLabel);
  decrementForm.appendChild(decrementInput);

  // Add the forms to the "inc-dec" div
  incDecDiv.appendChild(incrementForm);
  incDecDiv.appendChild(decrementForm);

  // Create the div with class "numbers"
  const numbersDiv = document.createElement("div");
  numbersDiv.classList.add("numbers");
  const singleResult = document.createElement("h2");
  singleResult.classList.add("lws-singleResult");
  singleResult.setAttribute("id", count);
  singleResult.textContent = "120";
  numbersDiv.appendChild(singleResult);

  // Add the "inc-dec" and "numbers" divs to the main div
  dynamicDiv.appendChild(incDecDiv);
  dynamicDiv.appendChild(numbersDiv);

  // Add the dynamic div to the container
  //
  //console.log(container);
  container.appendChild(dynamicDiv);
}

// Select the button and add a click event listener to generate the dynamic div
const addMatch = document.querySelector("#lws-addMatch");
const container = document.querySelector(".all-matches");
addMatch.addEventListener("click", generateDynamicDiv);

// initial state
const initialState = {
  value: 0,
  increment: {},
  decrement: {}
};

// select dom elements
const result = document.querySelectorAll(".lws-singleResult");
const incrementEl = document.querySelectorAll(".lws-increment");
const decrementEl = document.querySelectorAll(".lws-decrement");

// create reducer function
function counterReducer(state = initialState, action) {
  if (action.type === INCREMENT) {
    const {  value,id } = action.payload;
    const newInputs = { ...state.increment, [id]: value };
    console.log(newInputs);
    const diff = value - (state.increment[id] || 0);
    const newSum = state.value + diff;
    return {
      ...state,
      value: newSum,
      increment:newInputs
    };
    // return {
    //     ...state,
    //     value: state.value + action.payload.value,
    //     inputs: {
    //       ...state.inputs,
    //       [action.payload.id]: action.payload.valk
    //     }
    //   };
   
    //const newInputs = { ...state.dynamicInputs, [id]: value };
    //const diff = value - (state.dynamicInputs[id] || 0);
    //const newSum = state.sum + diff;



  } else if (action.type === DECREMENT) {
    // return {
    //   ...state,
    //   value: state.value - action.payload,
    // };

    const {  value,id } = action.payload;
    const newInputs = { ...state.increment, [id]: value };
    console.log(newInputs);
    const diff = value - (state.increment[id] || 0);
    const newSum = state.value + diff;
    return {
      ...state,
      value: newSum,
      increment:newInputs
    };
  } else {
    return state;
  }
  //properties: {
//     ...state.properties,
//     b: state.properties.b + 1,
// },

}

// create store
const store = Redux.createStore(counterReducer);

const render = () => {
  const state = store.getState();
  console.log(state);
  result.innerText = state.value.toString();
};
//const value = store.getState().dynamicInputs[id];
// update UI initially
render();

store.subscribe(render);

// for (let i = 0; i < incrementEl.length; i++) {
//   incrementEl[i].addEventListener("keypress", function (event) {
//     alert("test");
//     if (event.key === "Enter") {
//       // code for enter
//       store.dispatch({
//         type: "increment",
//       });
//     }
//   });
// }
// for (let i = 0; i < decrementEl.length; i++) {
//   decrementEl[i].addEventListener("keypress", function (event) {
//     if (event.key === "Enter") {
//       // code for enter
//       store.dispatch({
//         type: "decrement",
//       });
//     }
//   });
// }
//  incrementEl.addEventListener("keypress", (event) => {
//     //event.preventDefault();
//     if (event.key === 'Enter') {
//         // code for enter
//         store.dispatch({
//             type: "increment",
//         });
//     }

// });
// decrementEl.addEventListener("keypress", (event) => {
//    // event.preventDefault();
//    // alert(test);
//     if (event.key === 'Enter') {
//         // code for enter
//         store.dispatch({
//             type: "decrement",
//         });
//       }

// });



// action creators
const increment = (value,id) => {
  return {
    type: INCREMENT,
    payload: {
        value:value,
        id:id
    }
  };
};

const decrement = (value,id) => {
  return {
    type: DECREMENT,
    payload: {
        value:value,
        id:id
    }
  };
};

document.addEventListener("keypress", function (e) {
   // console.log(e.target.getAttribute('id'));
    let inputValue = e.target.value;
    let elementID=e.target.getAttribute('id')
   
  const incrementEl = e.target.querySelectorAll(".lws-increment"); // Or any other selector.
  const decrementEl = e.target.querySelectorAll(".lws-decrement");
  if (e.key === "Enter") {
    //alert(inputValue);
    if (incrementEl) {
          store.dispatch(increment(inputValue,elementID));
        }
        if (decrementEl) {       
              store.dispatch(decrement(inputValue,elementID)); 
          }

  }
  
  

  
});
