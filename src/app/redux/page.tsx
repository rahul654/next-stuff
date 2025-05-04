'use client'
import { Button } from "@/components/ui/button";
import { decrementAsyncAction, incrementAsyncAction } from "@/nihon/redux/counterAsyncAction";
import { StateInterface } from "@/nihon/redux/store";
import React from "react";
import { useSelector, useDispatch } from 'react-redux';

export default function Home() {
  const dispatch = useDispatch();
  const counterState = useSelector((state: StateInterface) => state.count);
  const loadingState = useSelector((state: StateInterface) => state.isLoading);
  return (
    loadingState ?
      <>loading</> :
      <>
        <div>
          hello rahul bhai <br />
          <Button onClick={() => { console.log('::: hello rahul'); }}>Button</Button>
          <div>{counterState}</div>
          <button onClick={() => dispatch({ type: "INCREMENT", payload: 1 })}>increment</button>
          <button onClick={() => dispatch({ type: "DECREMENT", payload: 2 })}>decrement</button>
          hello rahul bhai <br />
          <button onClick={() => incrementAsyncAction(1, dispatch)()}>increment async</button>
          <button onClick={() => decrementAsyncAction(1, dispatch)()}>decrement async</button>
        </div>
      </>
  );
}