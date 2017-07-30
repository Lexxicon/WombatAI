import { log } from "lib/logger/log";
import { } from "proto/*";
import { StatsRunner } from "stats/statsRunner";
import { Overmind } from "./core/Overmind";
import { Drawing } from "./util/Drawing";

if (Memory.version !== (__REVISION__ + __BUILD_TIME__)) {
  Memory.version = __REVISION__ + __BUILD_TIME__;
  log.info(`loading revision: ${__REVISION__} : ${__BUILD_TIME__}`);
}
Memory.username = Memory.username ||
  _.chain(Game.rooms)
    .map("controller")
    .flatten()
    .filter("my")
    .map("owner.username")
    .first();

const stats = new StatsRunner();

export const loop = () => {
  new Overmind().run();
  stats.postTickStats();

  for (const rname in Game.rooms) {
    new Drawing(Game.rooms[rname]).draw();
  }
};
