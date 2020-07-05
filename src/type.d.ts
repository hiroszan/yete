declare interface YeteConfig {
  helper: string;
  runs: YeteRun[];
}

declare interface YeteRun {
  ejs: string;
  yaml: string[];
  outputDir: string;
  outputExt: string;
}
