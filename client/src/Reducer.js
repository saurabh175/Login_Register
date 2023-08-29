import React, { useReducer } from "react";

// const InitialTodos = [
//   {
//     id: 1,
//     title: "todo 1",
//     complete: false,
//   },
//   {
//     id: 2,
//     title: "todo 2",
//     complete: false,
//   },
// ];

// const reducer = (state, action) => {
//   if (action.type === "INCREMENT") {
//     return state + 1;
//   }
//   if (action.type === "DECREMENT") {
//     return state - 1;
//   }
//   return state;
// };

const reducer = (state, action) => {
  if (action.type === "Dark") {
    return (state - 1) % 2;
  }
  if (action.type === "Day") {
    return (state + 1) % 2;
  }
  return state;
};

// const reducer = (state, action) => {
//   if (action.type === "Complete") {
//     return state.map((todo) => {
//       if (action.id === todo.id) {
//         return { ...todo, complete: !todo.complete };
//       } else {
//         return todo;
//       }
//     });
//   }
//   return state;
// };
export const Reducer = () => {
  //   const [Todos, dispatch] = useReducer(reducer, InitialTodos);
  //   const handelInput = (todo) => {
  //     dispatch({ type: "Complete", id: todo.id });

  const [state, dispatch] = useReducer(reducer, 0);
  const backgroundColor = !state ? "white" : "black";
  return (
    <>
      <div
        style={{
          backgroundColor,
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          transition: "background-color 0.5s",
          justifyContent:'center'
        }}
      >
        <button
          style={{  transition: "background-color 0.5s",  backgroundColor: "black", color: "white" }}
          onClick={() => dispatch({ type: "Day" })}
        >
          day
        </button>
        <button
          style={{  transition: "background-color 0.5s", backgroundColor: "white", color: "Black" }}
          onClick={() => dispatch({ type: "Dark" })}
        >
          dark
        </button>
      </div>
      {/* <button onClick={() => dispatch({ type: "INCREMENT" })}>INCREMENT</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>DECREMENT</button> */}
      {/* {Todos.map((todo) => (
        <div key={todo.id}>
          <lebel>
            <input
              type="checkbox"
              checked={todo.complete}
              onClick={()=>handelInput(todo)}
            ></input>
            {todo.title}
          </lebel>
        </div>
      ))} */}
    </>
  );
};
