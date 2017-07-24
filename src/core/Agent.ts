export class Agent {
  public creep: Creep;
  public memory: any;

  constructor(creep: Creep) {
    this.creep = creep;
    this.memory = creep.memory;
  }
}
