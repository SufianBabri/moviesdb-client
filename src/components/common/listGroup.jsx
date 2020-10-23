import React from "react";
// import PropTypes from "prop-types";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
}) => {
  return items.map((item) => {
    const className =
      item === selectedItem ? "list-group-item active" : "list-group-item";
    return (
      <ul key={item[valueProperty]} className="list-group">
        <li className={className} onClick={() => onItemSelect(item)}>
          {item[textProperty]}
        </li>
      </ul>
    );
  });
};

// ListGroup.propTypes = {
//   items: PropTypes.object.isRequired,
//   currentItemId: PropTypes.string.isRequired,
//   onItemSelect: PropTypes.func.isRequired,
// };

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};
export default ListGroup;
