import "./buttonComponent.css";

const ButtonComponent = (props) => {
    return (
        <button onClick={props.onClickHandler} type={props.type}>
            <span>{props.text}</span>
        </button>
    );
  }
  
  export default ButtonComponent;