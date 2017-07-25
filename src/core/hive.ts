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

  constructor(room: Room) {
    this.coreRoom = room;
  }

  public run = (): void => {
    log.debug("doing things");
  }
}
