import { TODOACTIONTYPES } from "../constants";

function todoReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case TODOACTIONTYPES.LOADING: {
      return { ...state, isLoading: true };
    }
    case TODOACTIONTYPES.NOT_LOADING: {
      return { ...state, isLoading: false };
    }

    case TODOACTIONTYPES.GET_TODOS: {
      return { ...state, todos: payload };
    }

    case TODOACTIONTYPES.GET_TODOONPAGE: {
      return { ...state, todoOnPage: payload };
    }

    case TODOACTIONTYPES.ADD_TODO: {
      return { ...state, todos: payload };
    }
    case TODOACTIONTYPES.EDIT_TODO: {
      return { ...state, todos: payload };
    }
    case TODOACTIONTYPES.DELETE_TODO: {
      return { ...state, todos: payload };
    }
    default: {
      return state;
    }
  }
}

export default todoReducer;
