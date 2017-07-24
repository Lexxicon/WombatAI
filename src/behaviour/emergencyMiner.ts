import { Behaviour } from "behaviour/behaviour";

export enum State {
  HARVEST = 1,
  DROP_OFF,
}
export class EmergencyMiner implements Behaviour {

  private updateState(creep: Creep): State {
    switch (creep.state) {

    }
    return State.HARVEST;
  }

  public run(creep: Creep): void {
    creep.state = updateState(creep);
  }

}
