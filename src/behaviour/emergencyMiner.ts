import { Behaviour } from "behaviour/behaviour";
import { BodyDef } from "core/bodyDef";
import { log } from "lib/logger/log";

export enum State {
  /**
   * Find near by source, extract, or move closer. If full on energy, switch to DROP_OFF.
   */
  HARVEST,
  /**
   * Find spawner, transfer energy, or move closer. If empty, switch to HARVEST.
   */
  DROP_OFF,
}

export class EmergencyMiner implements Behaviour {
  public static body = new BodyDef(
    [WORK, CARRY, MOVE],
    { state: State.HARVEST },
    "EmergencyMiner");

  public getBody = () => {
    return EmergencyMiner.body;
  }

  public run = (creep: Creep) => {
    creep.memory.state = this.updateState(creep);
    switch (creep.memory.state) {
      case State.DROP_OFF:
        this.dropOff(creep);
        break;
      case State.HARVEST:
        this.harvest(creep);
        break;
    }
  }

  protected dropOff(creep: Creep): void {
    const target = creep.room.find(FIND_MY_SPAWNS)[0] as Spawn;
    if (!target) {
      log.warning("failed to find drop off spawn");
      return;
    }
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }

  protected harvest(creep: Creep): void {
    const target = creep.pos.findClosestByPath(FIND_SOURCES) as Source;
    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }

  protected updateState(creep: Creep): State {
    switch (creep.memory.state) {
      case State.DROP_OFF:
        if (_.sum(creep.carry) === 0) {
          return State.HARVEST;
        }
        break;
      case State.HARVEST:
        if (_.sum(creep.carry) === creep.carryCapacity) {
          return State.DROP_OFF;
        }
        break;
    }
    return creep.memory.state;
  }

}
