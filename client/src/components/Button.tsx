import { FunctionComponent } from "react";
import { ButtonProps } from "../types";

const Button: FunctionComponent<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className={props.class || ""}
      style={{
        background: props.background || "",
        color: props.color || "",
        height: props.height || "",
        width: props.width || "",
      }}
      onClick={props.onclick}
    >
      {props.content}
    </button>
  );
};

export default Button;
