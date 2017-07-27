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
  };

  constructor(room: Room) {
    this.coreRoom = room;
    this.mem = (room.memory.hive = room.memory.hive || this.mem);
  }

  public run = (): void => {
    switch (this.mem.state) {
      case HiveState.GROWTH:
        this.mem.state = HiveState.RECOVERY;
        break;
      case HiveState.RECOVERY:
        this.mem.state = HiveState.GROWTH;
        break;
      default:
        log.error("unknown state ", this.mem.state);
    }
    console.log(this.mem.state);
  }
}
