import React from "react";
const Like = (props) => {
  let className = "fa fa-heart";
  if (!props.liked) className += "-o";
  return (
    <i
      onClick={props.onClick}
      style={{ cursor: "pointer" }}
      className={className}
      aria-hidden="true"
    ></i>
  );
};

export default Like;
