tick structure
  - setup room attributes
  - ??
  - attempt spawn
  - derive stats

room attributes
  - locations
    - harvest
    - road
    - tower
    - extension
    - stockpile
  - current energy income

creeps
  - harvester
    - work and move
    - extracts energy and drops it on the ground
  - hauler
    - carry and move
    - moves energy where it is needed
  - worker
    - work, move, and carry
    - upgrades, builds, repairs

controllers
  - hauling jobs
    - fill placed orders
      - orders have target and refill thresholds
        * fills to target
        * starts fill if reserve is below refill
    - pick up piles and move to storage
    - estimate travel times to sources
  - nurse
    - keep extensions full
  - harvest jobs
    - make sure each source is full extracted each cycle
    - spawn replacement harvester before existing one dies
    - make available how much energy per tick is available
  - upgrade
    - request energy be brought to it
    - upgrades room controller level
  - infrastructure
    - build walls / ramparts
    - build towers
    - spawn extension sites
    - build buckets
    - build roads
  - defense
    - towers shoot things

notes
  - 1 work = harvest 2 ep/tick
    - 5 work to fully harvest a source
  - 1 work = upgrade 1 ep/tick
  - 1 carry = 50 resource
  - 1:2 move parts on roads
  - 1:1 move parts off roads
  - max income per source = 10/eps
  - max speed = 1 tile/tick
  - piles lose 1 per 1000 units/tick
