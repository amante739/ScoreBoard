const initialState = {
  matches: [
    {
      matchName: "Match 1",
      score: 0,
      increment: 0,
      decrement: 0,
    },
  ],
};

const addMatchButton = document.getElementById("lws-addMatch");
addMatchButton.addEventListener("click", () => {
  store.dispatch(addMatch());
});

function reducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_MATCH":
      return {
        ...state,
        matches: [
          ...state.matches,
          {
            matchName: `Match ${state.matches.length + 1}`,
            score: 0,
            increment: 0,
            decrement: 0,
          },
        ],
      };
    case "DELETE_MATCH":
      const filteredMatches = state.matches.filter(
        (match, index) => index !== action.payload
      );
      return {
        ...state,
        matches: filteredMatches,
      };
    // case 'UPDATE_SCORE':
    //   const { matchIndex, value } = action.payload;
    //   const matches = [...state.matches];
    //   matches[matchIndex].score += value;
    //   return {
    //     ...state,
    //     matches
    //   };
    case 'UPDATE_INCREMENT':
      const { incrementIndex, incrementValue } = action.payload;
      const incrementMatches = [...state.matches];
      incrementMatches[incrementIndex].increment = incrementValue;
      incrementMatches[incrementIndex].score+=incrementValue;
      console.log(incrementMatches);
      return {
        ...state,
        matches: incrementMatches
      };
    case 'UPDATE_DECREMENT':
      const { decrementIndex, decrementValue } = action.payload;
      const decrementMatches = [...state.matches];
      decrementMatches[decrementIndex].decrement = decrementValue;
      decrementMatches[decrementIndex].score -= decrementValue;
      if(decrementMatches[decrementIndex].score<0){
        decrementMatches[decrementIndex].score=0;
      }
     
      return {
        ...state,
        matches: decrementMatches
      };
    case 'RESET_MATCH':
        const resetMatches = state.matches.map((match) => {
            return { ...match, score: 0 };
          });
          return { ...state, matches: resetMatches };
    default:
        return state;
    }
}
// Create the Redux store
const store = Redux.createStore(reducer);

//Step 2: Create the addMatch action
function addMatch() {
  return {
    type: "ADD_MATCH",
  };
}
function resetMatch() {
    return {
      type: "RESET_MATCH"
      
    };
  }
function deleteMatch(index) {
  return {
    type: "DELETE_MATCH",
    payload: index,
  };
}
function updateScore(matchIndex, value) {
    return {
      type: 'UPDATE_SCORE',
      payload: {
        matchIndex,
        value
      }
    };
  }
  
  function updateIncrement(incrementIndex, incrementValue) {
    return {
      type: 'UPDATE_INCREMENT',
      payload: {
        incrementIndex,
        incrementValue
      }
    };
  }

  
  function updateDecrement(decrementIndex, decrementValue) {
    return {
      type: 'UPDATE_DECREMENT',
      payload: {
        decrementIndex,
        decrementValue
      }
    };
  }
  



function render() {
  const state = store.getState();

 // console.log(state);
  //generateDynamicDiv();
  // Render the matches
  const matchesContainer = document.querySelector(".all-matches");
  matchesContainer.innerHTML = "";
  const matches = store.getState().matches;
  matches.forEach((match, index) => {
    const matchContainer = document.createElement("div");
    matchContainer.classList.add("match");
    matchContainer.innerHTML = `
      <div class="wrapper">
        <button class="lws-delete">
          <img src="./image/delete.svg" alt="" />
        </button>
        <h3 class="lws-matchName">Match ${index + 1}</h3>
      </div>
      <div class="inc-dec">
        <form class="incrementForm" onsubmit="return false">
          <h4>Increment</h4>
          <input type="number" name="increment" class="lws-increment" id="${index}" value="${
      match.increment
    }" />
        </form>
        <form class="decrementForm" onsubmit="return false">
          <h4>Decrement</h4>
          <input type="number" name="decrement" class="lws-decrement" id="${index}" value="${
      match.decrement
    }" />
        </form>
      </div>
      <div class="numbers">
        <h2 class="lws-singleResult" id="${index}">${match.score}</h2>
      </div>
    `;
    matchesContainer.appendChild(matchContainer);
  });

  // Add event listener to delete buttons
  const deleteButtons = document.querySelectorAll(".lws-delete");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      store.dispatch(deleteMatch(index));
    });
  });

  //   // Add event listener to increment inputs
   const incrementInputs = document.querySelectorAll('.lws-increment');
    incrementInputs.forEach((input, index) => {
      input.addEventListener('change', () => {
        const value = parseInt(input.value);
        store.dispatch(updateIncrement(index, value));
        const matchScore = document.getElementById(`${index}`);
        matchScore.textContent = `${store.getState().matches[index].score}`;
      });
    });

  //   // Add event listener to decrement inputs
    const decrementInputs = document.querySelectorAll('.lws-decrement');
    decrementInputs.forEach((input, index) => {
      input.addEventListener('change', () => {
        const value = parseInt(input.value);
        store.dispatch(updateDecrement(index, value));
        const matchScore = document.getElementById(`${index}`);
        matchScore.textContent = `${store.getState().matches[index].score}`;
      });
    });
    const resetButton = document.querySelector('.lws-reset');

    resetButton.addEventListener('click', () => {
    // Dispatch Redux action to reset the state
    store.dispatch(resetMatch());
    });

    
}


// Subscribe to changes in the Redux store and re-render the UI
store.subscribe(render);

// Render the initial UI
render();
