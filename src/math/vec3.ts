export default class vec3 {
  public values: Float32Array;

  public constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.values = new Float32Array([x, y, z]);
  }

  public get x(): number {
    return this.values [0];
  }

  public set x(x: number) {
    this.values [0] = x;
  }

  public get y(): number {
    return this.values [1];
  }

  public set y(y: number) {
    this.values [1] = y;
  }

  public get z(): number {
    return this.values [2];
  }

  public set z(z: number) {
    this.values [2] = z;
  }

  public static cross(v1: vec3, v2: vec3, out: vec3 | null = null): vec3 {
    if (out === null) out = new vec3();
    out.x = v1.y * v2.z - v1.z * v2.y;
    out.y = v1.z * v2.x - v1.x * v2.z;
    out.z = v1.x * v2.y - v1.y * v2.x;
    return out;
  }

  public toString(): string {
    return " [ " + this.values [0] + " , " + this.values [1] + " , " + this.values [2] + " ] ";
  }
}