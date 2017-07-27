import { log } from "lib/logger/log";
import { } from "proto/*";
import { StatsRunner } from "stats/statsRunner";
import { BodyDef } from "./core/bodyDef";
import { Hive } from "./core/hive";

if (Memory.version !== __REVISION__) {
  Memory.version = __REVISION__;
  log.info(`loading revision: ${__REVISION__}`);
}
Memory.username = Memory.username
  || _.chain(Game.rooms).map("controller").flatten().filter("my").map("owner.username").first();

const stats = new StatsRunner();

export const loop = () => {
  const body = new BodyDef([WORK, MOVE], { test: "t" }, "bob");
  Game.spawns.Spawn1.spawn(body);
  _.forEach(Game.rooms, (r) => new Hive(r).run());
  stats.postTickStats();
};
