import ModalComponent from "../../components/ModalComponent";
import FormComponent from "../../components/FormComponent";
import TextboxComponent from "../../components/TextboxComponent";
import ButtonComponent from "../../components/ButtonComponent";
import { postData } from "../../common/rest";
import { useState } from "react";

const SaveModalContainer = (props) => {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const SaveList = (e) => {
    saveCurrentList(name, props.itemList)
      .catch((err) => console.error(err));

    e.preventDefault(e);
  };

  const saveCurrentList = async (name, itemList) => {
    let data = {
      name: name,
      list: itemList,
    };
    postData(`/items`, data)
      .then((res) => {
        console.log(res);
        if (res.error && res.error.code === 11000) {
          const err = new Error("List already Present!");
          err.res = res;
          throw err;
        } else {
          props.setListName(name);
        props.toggleSaveModal(false);
        }
      })
      .catch((err) => {
        props.setAlertText("List already Present!");
        props.toggleAlertModal(true);
      });
  };

  return (
    <ModalComponent>
      <FormComponent onSubmitHandler={SaveList}>
        <TextboxComponent
          value={name}
          onChangeHandler={handleChange}
          placeholder="List Name"
          name="save"
        />
        <div>
          <ButtonComponent type="submit" text="Save" />
          <ButtonComponent
            text="close"
            onClickHandler={() => props.toggleSaveModal(false)}
          />
        </div>
      </FormComponent>
    </ModalComponent>
  );
};

export default SaveModalContainer;
