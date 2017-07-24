import { BodyDef } from "core/bodyDef";
export interface Behaviour {
  getBody: () => BodyDef;
  run: (creep: Creep) => void;
}
