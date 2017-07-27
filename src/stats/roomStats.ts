import { SourceStat } from "./sourceStats";

export class RoomStat {
  public energy = {
    available: 0,
    capacity: 0,
  };
  public controller = {
    progress: 0,
    progressTotal: 0,
    level: 0,
  };
  public storage: { [RESOURCE: string]: number };
  public sources: { [sourceID: string]: SourceStat };

  public constructor(room: Room) {
    const ctrl = room.controller || ({} as any);
    this.controller.progressTotal = ctrl.progressTotal || 0;
    this.controller.progress = ctrl.progress || 0;
    this.controller.level = ctrl.level || 0;

    this.energy.available = room.energyAvailable || 0;
    this.energy.capacity = room.energyCapacityAvailable || 0;
    this.sources = _.reduce(room.find(FIND_SOURCES), this.srcToStat, {});
    this.storage = room.storage || {};
  }

  private srcToStat: any = (acc: any, source: Source) => {
    acc[source.id] = new SourceStat(source);
    return acc;
  }
}
