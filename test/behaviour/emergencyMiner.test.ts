import { EmergencyMiner, State } from "../../src/behaviour/emergencyMiner";

import { assert } from "chai";
import { CreepFactory } from "../mock/factory.creep";

describe("creep actions", () => {

  const creepFactory = new CreepFactory()
    .body([WORK, CARRY, MOVE])
    .carrying(RESOURCE_ENERGY, 50)
    .memory({ working: false });

  before(() => {
    // runs before all tests in this block
  });

  beforeEach(() => {
    // runs before each test in this block
  });

  it("can work when not working and at capacity", () => {
    const creep = creepFactory.build();
    const eMiner = new EmergencyMiner();
    eMiner.run(creep);
    assert.isTrue(creep.memory.state === State.DROP_OFF);
  });

  it("cannot work when working and at capacity", () => {
    // modify the creep factory to produce creeps carrying nothing, and a different memory
    const creep = creepFactory.carrying({}).memory({ working: true }).build();

    const eMiner = new EmergencyMiner();
    eMiner.run(creep);
    assert.isTrue(creep.memory.state === State.HARVEST);
  });
});
