declare interface YeteConfig {
  log?: string;
  workingDir?: string;
  helper: string;
  runs: YeteRun[];
}

declare interface YeteRun {
  ejs: string;
  yaml: {
    import?: {
      [key: string]: string;
    };
    files: string[];
  };
  output: string;
}
