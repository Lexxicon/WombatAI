export class StatsRunner {
  public constructor() {
    if (!Memory.stats) {
      Memory.stats = {};
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

  public create() {
    const roomsStat = Memory.stats[Memory.username].rooms;
    for (const id in Game.rooms) {
      _.defaultsDeep(roomsStat[id], {
        energy: {
          available: 0,
          capacity: 0,
          sources: 0,
          storage: 0,
        },
        controller: {
          progress: 0,
          progressTotal: 0,
          level: 0,
        },
      });
      const room = Game.rooms[id];
      const ctrl = roomsStat[id].controller;
      ctrl.progressTotal = _.get(room, "controller.progressTotal", 0);
      ctrl.progress = _.get(room, "controller.progress", 0);
      ctrl.level = _.get(room, "controller.level", 0);

      roomsStat[id].energy.available = room.energyAvailable;
      roomsStat[id].energy.capacity = room.energyCapacityAvailable;
      roomsStat[id].energy.sources = _.sum(_.map(room.find(FIND_SOURCES), "energy"));
      roomsStat[id].energy.capacity = _.get(room.storage, RESOURCE_ENERGY, 0);
    }

    Memory.stats[Memory.username].cpu.limit = Game.cpu.limit;
    Memory.stats[Memory.username].cpu.bucket = Game.cpu.bucket;
    Memory.stats[Memory.username].cpu.used = Game.cpu.getUsed;
    Memory.stats[Memory.username].cpu.tickLimit = Game.cpu.tickLimit;

    Memory.stats[Memory.username].gcl.progress = Game.gcl.progress;
    Memory.stats[Memory.username].gcl.progressTotal = Game.gcl.progressTotal;
    Memory.stats[Memory.username].gcl.level = Game.gcl.level;
  }
}
