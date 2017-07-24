export class StatsRunner {
  public constructor() {
    if (!Memory.stats) {
      Memory.stats = {};
    }
    if (!Memory.stats[Memory.username]) {
      Memory.stats[Memory.username] = {};
    }
    _.defaultsDeep(Memory.stats[Memory.username], {
      rooms: [],
      cpu: {
        bucket: 0,
        limit: 0,
        tickLimit: 0,
        used: 0,
      },
      gcl: {
        progress: 0,
        progressTotal: 0,
        level: 0,
      },
      memory: {
        size: 0,
      },
    });
  }

  public postTickStats() {
    const mem = Memory.stats[Memory.username];
    mem.rooms = _.mapValues(Game.rooms, this.toRoomStats);

    mem.cpu.limit = Game.cpu.limit;
    mem.cpu.bucket = Game.cpu.bucket;
    mem.cpu.used = Game.cpu.getUsed;
    mem.cpu.tickLimit = Game.cpu.tickLimit;

    mem.gcl.progress = Game.gcl.progress;
    mem.gcl.progressTotal = Game.gcl.progressTotal;
    mem.gcl.level = Game.gcl.level;
  }

  private toRoomStats: any = (room: Room) => {
    const stat = {
      energy: {
        available: 0,
        capacity: 0,
        sources: {},
        storage: 0,
      },
      controller: {
        progress: 0,
        progressTotal: 0,
        level: 0,
      },
    };
    const ctrl = stat.controller;
    ctrl.progressTotal = _.get(room, "controller.progressTotal", 0);
    ctrl.progress = _.get(room, "controller.progress", 0);
    ctrl.level = _.get(room, "controller.level", 0);

    const engy = stat.energy;
    engy.available = room.energyAvailable;
    engy.capacity = room.energyCapacityAvailable;
    engy.sources = _.reduce(room.find(FIND_SOURCES), this.sourceToStat, {});
    engy.capacity = _.get(room.storage, RESOURCE_ENERGY, 0);

    return stat;
  }

  private sourceToStat: any = (acc: any, source: Source) => {
    acc[source.id] = { energy: source.energy, ttl: source.ticksToRegeneration };
    return acc;
  }
}
