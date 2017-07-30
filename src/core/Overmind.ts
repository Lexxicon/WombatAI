import { Hive } from "./hive";
export class Overmind {

  public mem = {

  };

  public hives: Hive[];

  constructor() {
    this.mem = (Memory.overmind = Memory.overmind || this.mem);
    this.hives = this.findHives();
  }

  private findHives(): Hive[] {
    return _.chain(Game.spawns)
      .map("room")
      .uniq()
      .map((r: Room) => new Hive(r))
      .value() as Hive[];
  }

  public run(): void {
    for (let i = 0; i < this.hives.length; i++) {
      try {
        this.hives[i].run();
      } catch (err) {
        console.log("error running hive ", this.hives[i].coreRoom, " : ", err);
      }
    }
  }
}
