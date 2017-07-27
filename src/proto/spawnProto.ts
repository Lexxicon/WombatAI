
import { BodyDef } from "core/bodyDef";

declare global {
  interface StructureSpawn {
    spawn(def: BodyDef): number | string;
  }
}

StructureSpawn.prototype.spawn = function(def: BodyDef) {
  return this.createCreep(def.parts, def.memory, def.name);
};
