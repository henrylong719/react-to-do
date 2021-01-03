export const AppReducer = (state, action) => {
  switch (action.type) {
    /****** to do cases ********/
    case 'GET_TO_DOS':
      return { ...state, todos: action.payload };

    case 'ADD_TO_DO':
      return {
        ...state,
        todos: [...state.todos, action.payload.data],
        success: true,
      };

    case 'REMOVE_TO_DO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
        success: true,
      };

    case 'REMOVE_TO_DO_ACK':
      return {
        ...state,
        success: false,
      };

    case 'MARK_COMPLETE':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload._id) {
            todo.completed = action.payload.completed;
          }
          return todo;
        }),
      };
    case 'TODOS_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    /******** user cases *******/

    // case 'SUCCESS_RESET': {
    //   return { ...state, success: false };
    // }

    // user login
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };

    case 'USER_LOGIN_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'USER_LOGOUT':
      return {};

    // user register
    case 'USER_REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };
    case 'USER_REGISTER_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    case 'GET_USER_PROFILE':
      return {
        ...state,
        userProfile: action.payload,
      };

    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: action.payload,
        userProfile: action.payload,
      };

    case 'GET_ALL_USERS':
      return {
        ...state,
        allUsers: action.payload,
      };

    case 'GET_ALL_TODOS':
      return {
        ...state,
        allTodos: action.payload.todos,
        listToDoPage: action.payload.page,
        listToDoPages: action.payload.pages,
      };

    case 'UPDATE_USER':
      return {
        ...state,
        success: true,
        updateSuccess: true,
      };

    case 'DELETE_USER':
      return {
        ...state,
        success: true,
      };

    case 'SUCCESS_ACK':
      return {
        ...state,
        success: false,
      };

    case 'UPDATE_SUCCESS_ACK':
      return {
        ...state,
        updateSuccess: false,
      };

    default:
      return state;
  }
};
