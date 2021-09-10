import { Command } from 'commander';

const program = new Command();

program.option('-s, --seed', 'seed all cohorts');

program.parse();


