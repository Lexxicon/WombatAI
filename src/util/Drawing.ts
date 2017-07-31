export class Drawing {
  public visual: RoomVisual;
  public mem = {
    paths: [] as Array<Array<{
      x: number,
      y: number,
      dx: number,
      dy: number,
      direction: number
    }>>,
  };

  constructor(room: Room) {
    this.visual = new RoomVisual(room.name);
    this.mem = (room.memory.viz = room.memory.viz || this.mem);
  }

  public draw() {
    for (const path of this.mem.paths) {
      if (path.length >= 2) {
        let p1 = path[0];
        for (let i = 1; i < path.length; i++) {
          const p2 = path[i];
          this.visual.line(p1.x, p1.y, p2.x, p2.y);
          p1 = p2;
        }
      }
    }
  }
}
