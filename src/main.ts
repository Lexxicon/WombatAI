import { log } from "lib/logger/log";
import { StatsRunner } from "stats/statsRunner";

if (Memory.version !== __REVISION__) {
  Memory.version = __REVISION__;
  log.info(`loading revision: ${__REVISION__}`);
}
const stats = new StatsRunner();

Memory.username = Memory.username
  || _.chain(Game.rooms).map("controller").flatten().filter("my").map("owner.username").first();

export const loop = () => {

  stats.postTickStats();
};
