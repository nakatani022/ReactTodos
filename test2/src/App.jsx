import React, { useState } from "react";
import { InputTodo } from "./components/InputTodo";
import { InCompleteTodos } from "./components/InCompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";
import "./index.css";


export const App = () => {
  const [todoText, setTodoText] = useState('');
  const [inCompleteTodos, setInCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  // インプット値、変更
  const onChangeTodoText = (event) => setTodoText(event.target.value);
  // インプット横追加ボタン
  const onClickAdd = ()=> {
    if(todoText === "") return;
    const newTodos = [...inCompleteTodos, todoText];
    setInCompleteTodos(newTodos);
    setTodoText("");
  }

  // 削除ボタン
  const onClickDelete = (index) => {
    const newTodos = [...inCompleteTodos];
    newTodos.splice(index, 1);
    setInCompleteTodos(newTodos);
  }

  //完了ボタン
  const onClickComplete = (index) => {
    const newInCompleteTodos = [...inCompleteTodos];
    newInCompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, inCompleteTodos[index]];
    setInCompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  }

  //戻すボタン
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newInCompleteTodos  = [...inCompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setInCompleteTodos(newInCompleteTodos);
  }

  return (
  <>
  <InputTodo
    todoText={todoText}
    onChange={onChangeTodoText}
    onClick={onClickAdd}
    disabled={inCompleteTodos.length >= 5}
  />
  {inCompleteTodos.length >= 5 && (
  <p style={{color: 'red'}}>
    登録できるtodo5個までだよ。消化しなさい
  </p>
  )}
  <InCompleteTodos todos={inCompleteTodos} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />

  <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
  </>
  );
};