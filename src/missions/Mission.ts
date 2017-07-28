import { Agent } from "core/agent";

export abstract class Mission {
  public memory = {
    hc: {} as { [role: string]: string[] },
  };

  /**
   * General purpose function for spawning creeps
   * @param roleName - Used to find creeps belonging to this role, examples: miner, energyCart
   * @param getBody - function that returns the body to be used if a new creep needs to be spawned
   * @param getMax - function that returns how many creeps are currently desired, pass 0 to halt spawning
   * @param options - Optional parameters like prespawn interval, whether to disable attack notifications, etc.
   * @returns {Agent[]}
   */
  protected headCount(
    roleName: string,
    getBody: () => string[],
    getMax: () => number,
    options: HeadCountOptions = {}): Agent[] {

    const agentArray = [];
    if (!this.memory.hc[roleName]) {
      this.memory.hc[roleName] = this.findOrphans(roleName);
    }
    const creepNames = this.memory.hc[roleName] as string[];

    let count = 0;
    for (let i = 0; i < creepNames.length; i++) {
      const creepName = creepNames[i];
      const creep = Game.creeps[creepName];
      if (creep) {
        const agent = new Agent(creep);
        const prepared = this._prepAgent(agent);
        if (prepared) { agentArray.push(agent); }
        let ticksNeeded = 0;
        if (options.prespawn !== undefined) {
          ticksNeeded += creep.body.length * 3;
          ticksNeeded += options.prespawn;
        }
        if (!creep.ticksToLive || creep.ticksToLive > ticksNeeded) { count++; }
      } else {
        creepNames.splice(i, 1);
        delete Memory.creeps[creepName];
        i--;
      }
    }

    let spawnGroup = this.spawnGroup;
    if (options.altSpawnGroup) {
      spawnGroup = options.altSpawnGroup;
    }

    const allowSpawn = spawnGroup.isAvailable && this.allowSpawn && (this.hasVision || options.blindSpawn);
    if (allowSpawn && count < getMax()) {
      const creepName = `${this.operation.name}_${roleName}_${Math.floor(Math.random() * 100)}`;
      const outcome = spawnGroup.spawn(getBody(), creepName, options.memory, options.reservation);
      if (_.isString(outcome)) { creepNames.push(creepName); }
    }

    return agentArray;
  }

  protected abstract prepAgent(agent: Agent): boolean;

  private _prepAgent(agent: Agent): boolean {
    if (!agent.memory.preped) {
      agent.memory.preped = this.prepAgent(agent);
    }
    return agent.memory.preped;
  }
}
