import ListContainerComponent from "../../components/ListContainerComponent";
import HeaderContainerComponent from "../../components/HeaderContainerComponent";
import HeadingComponent from "../../components/HeadingComponent";
import FormComponent from "../../components/FormComponent";
import TextboxComponent from "../../components/TextboxComponent";
import ButtonComponent from "../../components/ButtonComponent";
import ItemListComponent from "../../components/ItemListComponent";
import ItemContainer from "../ItemContainer";
import PrintDialogComponent from "../../components/PrintDialogComponent";
import SearchModalContainer from "../SearchModalContainer";
import SaveModalContainer from "../SaveModalContainer";
import AlertModalContainer from "../AlertModalContainer";
import { putData } from "../../common/rest";
import { useState } from "react";

const MainContainer = () => {
  const [listName, setListName] = useState("");
  const [inputText, setInputText] = useState("");
  const [itemList, setItemList] = useState([]);
  const [alertText, setAlertText] = useState("");
  const [showSaveModal, toggleSaveModal] = useState(false);
  const [showSearchModal, toggleSearchModal] = useState(false);
  const [showAlertModal, toggleAlertModal] = useState(false);

  const addTextHandler = (e) => {
    const { value } = e.target;
    setInputText(value);
  };

  const addItemHandler = (e) => {
    let newItem = e.target.elements.newItem.value;
    setItemList((prevState) => {
      return [...prevState, newItem];
    });
    setInputText("");
    e.preventDefault();
  };

  const deleteItemHandler = (index) => {
    //creating a new reference for the array and assigning it to the array
    //if done otherwise or by prevState, the list changes, but ref remains same
    //the rerender is not triggered
    let arr = [...itemList];
    arr.splice(index, 1);
    setItemList(arr);
  };

  const saveitemHandler = (e) => {
    if (!showSaveModal && listName.length) {
      updateCurrentList(listName, itemList)
        .then(() => {
          setAlertText("List updated!");
          toggleAlertModal(true);
        })
        .catch((err) => {
          setAlertText("List Couldn't be updated!");
          toggleAlertModal(true);
        });
      e.preventDefault(e);
    } else {
      toggleSaveModal((prevState) => !prevState);
    }
  };

  const updateCurrentList = async (name, list) => {
    let data = {
      name,
      list,
    };
    putData(`/items`, data)
      .then((data) => console.log(data))
      .catch((err) => {
        setAlertText("Connection lost!");
        toggleAlertModal(true);
      });
  };

  return (
    <ListContainerComponent>
      <HeaderContainerComponent>
        <HeadingComponent
          title={listName.length ? listName + " List" : "To-do List"}
        />
      </HeaderContainerComponent>
      <FormComponent onSubmitHandler={addItemHandler}>
        <TextboxComponent
          value={inputText}
          onChangeHandler={addTextHandler}
          placeholder="Add Item"
          name="newItem"
        />
        <ButtonComponent text="Add" />
      </FormComponent>
      <ListContainerComponent>
        <ItemListComponent itemList={itemList}>
        {(item, i) => (
          <ItemContainer item={item} key={i} index={i} deleteItemHandler={() => deleteItemHandler(i)} />
        )}
        </ItemListComponent>
      </ListContainerComponent>
      <ButtonComponent text="Save List" onClickHandler={saveitemHandler} />
      <ButtonComponent
        text="Print List"
        onClickHandler={() => PrintDialogComponent(itemList)}
      />
      <ButtonComponent
        text="Find List"
        onClickHandler={() => toggleSearchModal((prevState) => !prevState)}
      />
      {showSearchModal && (
        <SearchModalContainer
          setListName={setListName}
          setItemList={setItemList}
          toggleSearchModal={toggleSearchModal}
          setAlertText={setAlertText}
          toggleAlertModal={toggleAlertModal}
        />
      )}
      {showSaveModal && (
        <SaveModalContainer
          setListName={setListName}
          itemList={itemList}
          toggleSaveModal={toggleSaveModal}
          setAlertText={setAlertText}
          toggleAlertModal={toggleAlertModal}
        />
      )}
      {showAlertModal && (
        <AlertModalContainer
          alertText={alertText}
          toggleAlertModal={toggleAlertModal}
        />
      )}
    </ListContainerComponent>
  );
};

export default MainContainer;
