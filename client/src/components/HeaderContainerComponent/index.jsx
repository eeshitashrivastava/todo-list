import "./headerContainerComponent.css";

const HeaderContainerComponent = (props) => {
    return (
        <div className="header">
            {props.children}
        </div>
    );
  }
  
  export default HeaderContainerComponent;