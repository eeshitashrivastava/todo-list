import "./itemContainer.css";
import { useState } from "react";

const ItemContainer = (props) => {
  let [isDone, setIsDone] = useState(false);
  const handleItemClick = (e) => {
    setIsDone((prevState) => !prevState);
  };

  return (
    <li
      key={props.index}
      style={{ textDecoration: isDone ? "line-through" : "" }}
    >
      <span onClick={handleItemClick}>{props.item}</span>
      <button onClick={props.deleteItemHandler} className="btn-close">
        X
      </button>
    </li>
  );
};

export default ItemContainer;
