export enum Mood {
  IDLE,
  WORKING
}

export class Talker {
  private idle: string[] = [
    "I am a worm!",
    "SLUUURM"
  ];
  private work: string[] = [
    "Free me from my eternal agony"
  ];
  private sayings: { [k: number]: string[] } = {};

  constructor() {
    for (const m in Mood) {
      this.sayings[m] = [];
    }
    for (const s in this.idle) {
      this.sayings[Mood.IDLE].push(this.idle[s]);
    }
    for (const s in this.work) {
      this.sayings[Mood.WORKING].push(this.work[s]);
    }
  }

  public chat = (creep: Creep, mood: Mood) => {
    creep.say("" + mood);
  }
}
