//Step 1: Set up the Redux store


// Define the initial state
const initialState = {
  matches: [{
    id: 0,
    name: 'Match 1',
    score: 0
  }]
};

// Define the reducer function
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_MATCH':
      const { name } = action.payload;
      const newId = state.matches.length;
      return {
        ...state,
        matches: [...state.matches, { id: newId, name, score: 0 }]
      };
    case 'UPDATE_SCORE':
      const { matchId, value, isIncrement } = action.payload;
      const matches = state.matches.map(match => {
        if (match.id === matchId) {
          return {
            ...match,
            score: isIncrement ? match.score + value : match.score - value
          };
        }
        return match;
      });
      return {
        ...state,
        matches
      };
    case 'DELETE_MATCH':
      const { id } = action.payload;
      const updatedMatches = state.matches.filter(match => match.id !== id);
      return {
        ...state,
        matches: updatedMatches
      };
    default:
      return state;
  }
}

// Create the Redux store
const store = Redux.createStore(reducer);
//Step 2: Create the addMatch action
function addMatch(name) {
    return {
      type: 'ADD_MATCH',
      payload: {
        name
      }
    };
  }
//Step 3: Create the updateScore action
function updateScore(matchId, value, isIncrement) {
    return {
      type: 'UPDATE_SCORE',
      payload: {
        matchId,
        value,
        isIncrement
      }
    };
  }

  //Step 4: Create the deleteMatch action

  function deleteMatch(id) {
    return {
      type: 'DELETE_MATCH',
      payload: {
        id
      }
    };
  }
//Step 5: Create the event handlers for the add match button, score inputs, and delete buttons

const addMatchButton = document.getElementById('lws-addMatch');
addMatchButton.addEventListener('click', () => {
  const matchName = `Match ${store.getState().matches.length + 1}`;
  store.dispatch(addMatch(matchName));
});

const allMatchesContainer = document.querySelector('.all-matches');
allMatchesContainer.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('lws-increment')) {
    const matchId = parseInt(target.id);
    const value = parseInt(target.value);
    store.dispatch(updateScore(matchId, value, true));
  } else if (target.classList.contains('lws-decrement')) {
    const matchId = parseInt(target.id);
    const value = parseInt(target.value);
    store.dispatch(updateScore(matchId, value, false));
  } else if (target.classList.contains('lws-delete')) {
    const matchId = parseInt(target.closest('.match').getAttribute('data-match-id'));
    store.dispatch(deleteMatch(matchId));
  }
});

  