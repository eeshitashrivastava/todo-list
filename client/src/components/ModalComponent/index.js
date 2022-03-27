import "./modalComponent.css";

const ModalComponent = (props) => {
    return (
      <div className="modal-container">
        {props.children}
      </div>
    );
  }
  
  export default ModalComponent;