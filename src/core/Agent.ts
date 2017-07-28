export class Agent {
  public creep: Creep;
  public memory = {
    preped: false
  };

  constructor(creep: Creep) {
    this.creep = creep;
    this.memory = _.defaultsDeep(creep.memory, this.memory);
  }
}
