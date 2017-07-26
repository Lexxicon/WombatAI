/**
 *
 * generate meta data about room
 * -harvest locations
 * --loading zones
 *
 * -spawn placement
 * --hatchery location
 * --graveyard
 *
 * -towers
 * -roads
 * --priority
 *
 * -walls
 * -gates
 *
 * controllers
 * -energy
 * --> manage assigning extractors to sources and where to store, retrieve and
 *    move energy.
 *    can request haulers and extractors
 *
 * -towers
 * --> coordinate towers in room to attack, repair, and heal.
 *    can request haulers
 *
 * -combat
 * --> directs squads to secure rooms.
 *    can request all sorts of combat creeps
 *
 * -architect
 * --> places buildings and roads as needed.
 *    can request builders and pioneers
 *
 * determine room type
 * -central hive
 * -hive
 * -remote harvesting
 * -scout
 *
 * +----+-----+-----+
 * |hive|r_har|scout|
 * +----+-----+-----+
 *
 * site design
 * -nursery
 *
 * creep roles
 * -nurse
 * --> feeds the spawner and extensions
 *
 * -extractor
 * --> pulls energy out of sources
 *
 * -hauler
 * --> redistribute energy to destinations
 *
 * -scout
 * --> watch rooms for hostiles and gather information about nearby rooms
 *
 * -remote harvester
 * --> extracts energy from sources in non hive rooms
 *
 * -pioneer
 * --> builds and maintains infrastructure in non spawn rooms
 *
 * -builder
 * --> builds and maintains infrastructure in hives
 *
 * -upgrader
 * --> feeds energy into room controller
 *
 * -combat
 * --healer
 *
 * --ranger
 *
 * --melee
 *
 * room tiers
 * -self hauling -> ghetto jet can -> storage mining
 * -max wall health
 **/
