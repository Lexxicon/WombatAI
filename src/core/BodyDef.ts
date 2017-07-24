export class BodyDef {
  public parts: string[];
  public memory: any;
  public name: string;

  public constructor(parts: string[], memory: any, name: string) {
    const id = Memory.uuid || 0;
    Memory.uuid = ((Memory.uuid || 0) + 1) % 1000;

    this.parts = parts;
    this.memory = memory;
    this.name = name + "-" + id;
  }
}
