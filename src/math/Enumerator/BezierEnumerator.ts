import { IEnumerator } from "./IEnumerator";
import vec2 from "../vec2";
import { getCubicBezierVector, getQuadraticBezierVector } from "../util2d";

export interface IBezierEnumerator extends IEnumerator <vec2> {
  steps: number;
}

export default class BezierEnumerator implements IBezierEnumerator {
  private _steps: number;
  private _i: number;
  private _startAnchorPoint: vec2;
  private _endAnchorPoint: vec2;
  private _controlPoint0: vec2;
  private _controlPoint1: vec2 | null;
  private _currentIdx: number;

  public constructor(start: vec2, end: vec2, control0: vec2, control1: vec2 | null = null, steps: number = 30) {
    this._startAnchorPoint = start;
    this._endAnchorPoint = end;
    this._controlPoint0 = control0;
    if (control1 !== null) {
      this._controlPoint1 = control1;
    } else {
      this._controlPoint1 = null;
    }
    this._steps = steps;
    this._i = 1.0 / (this._steps);
    this._currentIdx = -1;
  }

  public reset(): void {
    this._currentIdx = -1;
  }

  public get current(): vec2 {
    if (this._controlPoint1 !== null) {
      return getCubicBezierVector(this._startAnchorPoint, this._controlPoint0, this._controlPoint1, this._endAnchorPoint, this._currentIdx * this._i);
    } else {
      return getQuadraticBezierVector(this._startAnchorPoint, this._controlPoint0, this._endAnchorPoint, this._currentIdx * this._i);
    }
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