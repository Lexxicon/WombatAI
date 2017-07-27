import { RoomStat } from "./roomStats";
export class StatsMemory {
  public rooms: {
    [room: string]: RoomStat;
  } = {};
  public cpu = {
    bucket: 0,
    limit: 0,
    tickLimit: 0,
    used: 0
  };
  public gcl = {
    progress: 0,
    progressTotal: 0,
    level: 0
  };
  public memory = {
    size: 0
  };
}
