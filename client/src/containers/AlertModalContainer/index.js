import ModalComponent from "../../components/ModalComponent";
import ButtonComponent from "../../components/ButtonComponent";

const AlertModalContainer = (props) => {
  return (
    <ModalComponent>
      <div>
        {props.alertText}
        <div>
          <ButtonComponent
            text="close"
            onClickHandler={() => props.toggleAlertModal(false)}
          />
        </div>
      </div>
    </ModalComponent>
  );
};

export default AlertModalContainer;
