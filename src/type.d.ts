declare interface YeteConfig {
  log?: string;
  workingDir?: string;
  helper: string;
  runs: YeteRun[];
}

declare interface YeteRun {
  ejs: string;
  yaml: string[];
  output: string;
}
