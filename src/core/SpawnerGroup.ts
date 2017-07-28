import { BodyDef } from "./bodyDef";
export class SpawnerGroup {
  private spawn: Spawn;
  constructor(spawn: Spawn) {
    this.spawn = spawn;
  }

  public create(def: BodyDef): number | string {
    return this.spawn.createCreep(def.parts, def.memory, def.name);
  }
}
