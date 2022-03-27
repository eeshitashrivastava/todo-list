const FormComponent = (props) => {
    return (
        <form onSubmit={props.onSubmitHandler}>
            {props.children}
        </form>
    );
  }
  
  export default FormComponent;