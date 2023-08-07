#!/usr/bin/env node

import { Command } from 'commander';
import dirDiff from '../index.js';

const program = new Command();
program
  .description('Compare dark and light folders')
  .version('1.0.0')
  .arguments('<dirpath>')
  .action((dirpath) => {
    console.log(dirDiff(dirpath));
  });

program.parse(process.argv);