import "./textboxComponent.css";

const TextboxComponent = (props) => {
    return (
        <input type="text" value={props.value} onChange={props.onChangeHandler} placeholder={props.placeholder} name={props.name} required/>
    );
  }
  
  export default TextboxComponent;