import { A } from "./classA";
export class B extends A {
  public blok = Object.assign(super.blok, { other: "mak" });

  constructor() {
    super();
    console.log("new b");
  }
}
