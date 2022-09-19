import { MouseEventHandler } from "react";

export interface ButtonProps {
  class?: string;
  color?: string;
  background?: string;
  content: string;
  height?: string;
  width?: string;
  isDisable?: boolean;
  onclick?: MouseEventHandler<HTMLButtonElement>;
}
