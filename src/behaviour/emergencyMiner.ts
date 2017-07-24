import { Behaviour } from "behaviour/behaviour";
import { BodyDef } from "core/bodyDef";
import { log } from "lib/logger/log";

enum State {
  HARVEST = 1,
  DROP_OFF,
}

export class EmergencyMiner implements Behaviour {
  public getBody = () => {
    return new BodyDef([WORK, MOVE, CARRY], { state: State.HARVEST }, "EmergencyMiner");
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

  private dropOff(creep: Creep): void {
    const target = creep.room.find(FIND_MY_SPAWNS)[0] as Spawn;
    if (!target) {
      log.warning("failed to find drop off spawn");
      return;
    }
    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }

  private harvest(creep: Creep): void {
    const target = creep.pos.findClosestByPath(FIND_SOURCES) as Source;
    if (creep.harvest(target) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }

  private updateState(creep: Creep): State {
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
