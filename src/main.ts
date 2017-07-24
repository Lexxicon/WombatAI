import {StatsRunner} from "stats/statsRunner";
import { log } from "./lib/logger/log";

if (Memory.version !== __REVISION__) {
  Memory.version = __REVISION__;
  log.info(`loading revision: ${ __REVISION__ }`);
}

Memory.username = Memory.username
    || _.chain(Game.rooms).map("controller").flatten().filter("my").map("owner.username").first();

export const loop = () => {
  log.debug("starting");

  const stats = new StatsRunner();
  stats.init();
  stats.create();
  log.debug("ending");
};
