import { IBezierEnumerator } from "./BezierEnumerator";
import vec2 from "../vec2";
import { transform } from "../util2d";
import Mat2d from "../Mat2d";

export default class QuadraticBezierEnumerator implements IBezierEnumerator {
  private _steps: number;
  private _i !: number;
  private _startAnchorPoint: vec2;
  private _endAnchorPoint: vec2;
  private _controlPoint0: vec2;
  private _currentIdx: number;

  public constructor(start: vec2, end: vec2, control0: vec2, steps: number = 30) {
    this._startAnchorPoint = start;
    this._endAnchorPoint = end;
    this._controlPoint0 = control0;
    this._steps = steps;
    this._i = 1.0 / (this._steps);
    this._currentIdx = -1;
  }

  public reset(): void {
    this._currentIdx = -1;
  }

  public get current(): vec2 {
    let t: number = this._currentIdx * this._i;
    let ret: vec2 = vec2.create(t * t, t);
    transform(Mat2d.quadBezierBasicMatrix, ret, ret);
    ret.x = this._startAnchorPoint.x * ret.x + this._controlPoint0.x * ret.y + this._endAnchorPoint.x;
    ret.y = this._startAnchorPoint.y * ret.x + this._controlPoint0.y * ret.y + this._endAnchorPoint.y;
    return ret;
  }

  public moveNext(): boolean {
    this._currentIdx++;
    return this._currentIdx < this._steps;
  }

  public get steps(): number {
    this._i = 1.0 / (this._steps);
    return this._steps;
  }

  public set steps(steps: number) {
    this._steps = steps;
    this.reset();
  }

}