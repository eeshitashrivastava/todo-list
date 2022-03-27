import "./listContainerComponent.css";

const ListContainerComponent = (props) => {
    return (
      <div className="container">
        {props.children}
      </div>
    );
  }
  
  export default ListContainerComponent;