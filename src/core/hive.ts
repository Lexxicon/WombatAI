import { log } from "lib/logger/log";
import { Behaviour } from "../behaviour/behaviour";
import { EmergencyMiner } from "../behaviour/emergencyMiner";
import { SpawnGroup } from "./SpawnGroup";

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

  public static behaviours: Behaviour[] = [
    new EmergencyMiner()
  ];

  public coreRoom: Room;
  public spawnGroup: SpawnGroup;
  public mem = {
    state: HiveState.RECOVERY,
    emergencyMiners: [] as string[],
  };

  constructor(room: Room) {
    this.coreRoom = room;
    this.spawnGroup = new SpawnGroup(room);
    this.mem = (room.memory.hive = room.memory.hive || this.mem);
  }

  public run(): void {
    this.recovery();
    switch (this.mem.state) {
      case HiveState.GROWTH:
        break;
      case HiveState.RECOVERY:
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
    const result = this.spawnGroup.create(Hive.behaviours[0].getBody());
    if (_.isString(result)) {
      this.mem.emergencyMiners.push(result);
    }

    for (const i in this.mem.emergencyMiners) {
      const name = this.mem.emergencyMiners[i];
      Hive.behaviours[0].run(Game.creeps[name]);
    }
  }
}
