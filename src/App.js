import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { getItems } from "./actions/item";
import { useSelector } from "react-redux";

function App() {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);  // state.items is coming from reducers/item.js

  useEffect(() => {
    dispatch(getItems());
    console.log(dispatch(getItems()))
  }, [dispatch]);

  return (
    <div className="App">
      <h1>RENTY</h1>
      {items.map(item =>
        <div>
          Tags: {item.tags}
          <br></br>
          Title: {item.title}
          <br></br>
          Description: {item.description}
        </div>)
      }
    </div>
  );
}

export default App;
