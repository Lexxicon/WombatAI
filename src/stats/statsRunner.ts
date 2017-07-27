import { StatsMemory } from "./coreStats";
import { RoomStat } from "./roomStats";

export class StatsRunner {
  private memory: StatsMemory;

  public constructor() {
    this.memory = (Memory.stats = Memory.stats || { [Memory.username]: new StatsMemory() })[Memory.username];
  }

  public postTickStats = () => {
    const mem = this.memory;
    mem.rooms = _.mapValues(Game.rooms, (r) => new RoomStat(r));

    mem.cpu.limit = Game.cpu.limit;
    mem.cpu.bucket = Game.cpu.bucket;
    mem.cpu.used = Game.cpu.getUsed();
    mem.cpu.tickLimit = Game.cpu.tickLimit;

    mem.gcl.progress = Game.gcl.progress;
    mem.gcl.progressTotal = Game.gcl.progressTotal;
    mem.gcl.level = Game.gcl.level;
  }
}
