export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'GET_TO_DOS':
      return { ...state, todos: action.payload };

    case 'ADD_TO_DO':
      return { ...state, todos: [...state.todos, action.payload] };

    case 'REMOVE_TO_DO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.payload),
      };

    case 'MARK_COMPLETE':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo._id === action.payload) {
            todo.completed = !todo.completed;
          }
          return todo;
        }),
      };
    case 'TODOS_ERROR':
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
