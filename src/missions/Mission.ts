import { Agent } from "core/agent";
import { BodyDef } from "../core/bodyDef";
import { SpawnGroup } from "../core/SpawnGroup";

export interface HeadCountOptions {
  prespawn?: number;
  memory?: any;
  blindSpawn?: boolean;
  disableNotify?: boolean;
  skipMoveToRoom?: boolean;
  boosts?: string[];
  allowUnboosted?: boolean;
  altSpawnGroup?: SpawnGroup;
}

export abstract class Mission {
  public memory = {
    hc: {} as { [role: string]: string[] },
  };
  public missionName: string;
  public spawnGroup: SpawnGroup;

  protected constructor(missionName: string) {
    this.missionName = missionName;
  }

  /**
   * General purpose function for spawning creeps
   * @param roleName - Used to find creeps belonging to this role, examples: miner, energyCart
   * @param getBody - function that returns the body to be used if a new creep needs to be spawned
   * @param getMax - function that returns how many creeps are currently desired, pass 0 to halt spawning
   * @param options - Optional parameters like prespawn interval, whether to disable attack notifications, etc.
   * @returns {Agent[]}
   */
  protected headCount(
    body: BodyDef,
    getMax: () => number,
    options: HeadCountOptions = {}): Agent[] {

    const agentArray = [];
    if (!this.memory.hc[body.role]) {
      this.memory.hc[body.role] = this.findOrphans(body.role);
    }
    const creepNames = this.memory.hc[body.role] as string[];

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

    if (count < getMax()) {
      const outcome = spawnGroup.create(body);
      if (_.isString(outcome)) { creepNames.push(outcome); }
    }

    return agentArray;
  }
  protected abstract prepAgent(agent: Agent): boolean;

  private findOrphans(roleName: string) {
    const creepNames = [];
    for (const creepName in Game.creeps) {
      if (creepName.indexOf(roleName + "-") > -1) {
        creepNames.push(creepName);
      }
    }
    return creepNames;
  }

  private _prepAgent(agent: Agent): boolean {
    if (!agent.memory.preped) {
      agent.memory.preped = this.prepAgent(agent);
    }
    return agent.memory.preped;
  }
}
