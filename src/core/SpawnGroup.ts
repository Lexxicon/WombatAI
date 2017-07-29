import { BodyDef } from "./bodyDef";
export class SpawnGroup {
  private spawns: Spawn[];
  private availableSpawns: Spawn[];
  private room: Room;

  constructor(room: Room) {
    this.room = room;
    this.spawns = room.find(FIND_MY_SPAWNS) as Spawn[];
    this.availableSpawns = _.filter(this.spawns, { filter: { spawning: null } });
  }

  public create(def: BodyDef): number | string {
    if (this.availableSpawns.length > 0 && this.room.energyAvailable >= def.getCost()) {
      const result = this.availableSpawns[0].createCreep(def.parts, def.getSpawnName(), def.memory);
      if (_.isString(result)) {
        this.availableSpawns = this.availableSpawns.splice(0, 1);
      }
      return result;
    } else {
      return ERR_NOT_ENOUGH_ENERGY;
    }
  }
}
