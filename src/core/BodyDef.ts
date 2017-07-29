export class BodyDef {
  public parts: string[];
  public memory: any;
  public role: string;
  public cost: number;

  public constructor(parts: string[], memory: any, role: string) {
    this.parts = parts;
    this.memory = memory;
    this.role = role;
    this.cost = parts.map((s) => BODYPART_COST[s]).reduce((a, b) => a + b);
  }

  public getCost() {
    return this.cost;
  }

  public getSpawnName = () => {
    return this.role + "-" + (Memory.uuid = ((Memory.uuid || 0) + 1) % 1000);
  }
}
