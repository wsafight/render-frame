import InputEvent, { InputEventProps } from "./InputEvent";
import { InputEventType, MouseButton } from "./InputEventType";

export interface MouseInputEventProps extends InputEventProps {
  pos: any
  button: MouseButton
}

export default class MouseInputEvent extends InputEvent implements MouseInputEventProps {
  public button: MouseButton

  public pos: any
  public localPos: any

  public constructor(props?: MouseInputEventProps) {
    super(props)
    const {pos, button} = props ?? {}
    this.pos = pos
    this.button = button

    // this.localPos = vec2.create()
  }

}