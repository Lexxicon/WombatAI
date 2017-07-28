import { log } from "lib/logger/log";

export enum HiveState {
  /**
   * Newly respawned, partially sacked, etc.
   *
   * Focus is on getting harvesters, haulers, and workers online.
   */
  RECOVERY,
  /**
   * Stable rooms that are not yet RCL 8 and have no percived threats
   */
  GROWTH
}

export class Hive {
  public coreRoom: Room;
  public mem = {
    state: HiveState.RECOVERY,
    emergencyMiners: [] as string[],
  };

  constructor(room: Room) {
    this.coreRoom = room;
    this.mem = (room.memory.hive = room.memory.hive || this.mem);
  }

  public run(): void {
    switch (this.mem.state) {
      case HiveState.GROWTH:
        break;
      case HiveState.RECOVERY:
        this.recovery();
        break;
      default:
        log.error("unknown state ", this.mem.state);
    }
  }

  public recovery(): void {
    for (let i = this.mem.emergencyMiners.length - 1; i >= 0; i--) {
      const name = this.mem.emergencyMiners[i];
      if (!Game.creeps[name]) {
        this.mem.emergencyMiners.splice(i, 1);
        delete Memory.creeps[name];
      }
    }
    const spawns = this.coreRoom.find(FIND_MY_SPAWNS, { filter: { spawning: false } }) as Spawn[];
    if (spawns.length > 0) {

    }
  }
}
