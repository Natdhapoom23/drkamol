import * as migration_20261109_181649_initial from './20261109_181649_initial'
import * as migration_20261109_190000_seed_content from './20261109_190000_seed_content'

export const migrations = [
  {
    up: migration_20261109_181649_initial.up,
    down: migration_20261109_181649_initial.down,
    name: '20261109_181649_initial',
  },
  {
    up: migration_20261109_190000_seed_content.up,
    down: migration_20261109_190000_seed_content.down,
    name: '20261109_190000_seed_content',
  },
]
