export class SourceStat {
  public energy: number;
  public ttl: number;

  constructor(source: Source) {
    this.energy = source.energy;
    this.ttl = source.ticksToRegeneration;
  }
}
