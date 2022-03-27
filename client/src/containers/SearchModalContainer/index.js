import FormComponent from "../../components/FormComponent";
import TextboxComponent from "../../components/TextboxComponent";
import ButtonComponent from "../../components/ButtonComponent";
import ModalComponent from "../../components/ModalComponent";
import { getData } from "../../common/rest";
import { useState } from "react";

const SearchModalContainer = (props) => {
  const [name, setName] = useState("");
  const handleChange = (e) => {
    const { value } = e.target;
    setName(value);
  };

  const FindList = async (e) => {
    getCurrentList(name)
      .then((data) => {
        if (data.list) {
          props.setItemList(data.list);
          props.setListName(name);
        } else {
          props.setAlertText("List Not Found!");
          props.toggleAlertModal(true);
        }
      })
      .catch((err) => {
        props.setAlertText("List couldn't be fetched!");
        props.toggleAlertModal(true);
      });
    props.toggleSearchModal(false);
    e.preventDefault(e);
  };

  const getCurrentList = async (listName) => {
    if (listName.length) {
      let currentList = getData(`/items?name=${listName}`)
        .then((data) => {
          return data;
        })
        .catch((err) => {
          props.setAlertText("Connection lost!");
          props.toggleAlertModal(true);
        });
      return currentList;
    } else {
      props.setAlertText("No Name for List!");
      props.toggleAlertModal(true);
    }
  };

  return (
    <ModalComponent>
      <FormComponent onSubmitHandler={FindList}>
        <TextboxComponent
          value={name}
          onChangeHandler={handleChange}
          placeholder="Search Name"
          name="search"
        />
        <div>
          <ButtonComponent type="submit" text="Search" />
          <ButtonComponent
            text="close"
            onClickHandler={() => props.toggleSearchModal(false)}
          />
        </div>
      </FormComponent>
    </ModalComponent>
  );
};

export default SearchModalContainer;
