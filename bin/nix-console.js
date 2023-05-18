#!/usr/bin/env node
const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const { MigrationRunCommand } = require("../commands/MigrationRunCommand");


yargs
  .usage("Usage: $0 <command> [options]")
  .command(new MigrationRunCommand())
  // .command(new VersionCommand())
  // .command(new InitCommand())
  .demandCommand(1)
  .strict()
  .alias("v", "version")
  .help("h")
  .alias("h", "help").argv;
