const ItemListComponent = (props) => {
  const {itemList} = props;
    return (
        <div>
          <ul>
            {itemList.map((item,i) => props.children(item, i) )}
          </ul>
        </div>
    );
  }
  
  export default ItemListComponent;