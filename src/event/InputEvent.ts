import { InputEventType } from "./InputEventType";

export interface InputEventProps {
  altKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  type: InputEventType
}

export default class InputEvent implements InputEventProps {
  public altKey: boolean;
  public ctrlKey: boolean;
  public shiftKey: boolean;
  public type: InputEventType | -1

  public constructor(props?: InputEventProps) {
    const {altKey, ctrlKey, shiftKey, type} = props ?? {}
    this.altKey = altKey ?? false
    this.ctrlKey = ctrlKey ?? false
    this.shiftKey = shiftKey ?? false
    this.type = type ?? -1
  }

}