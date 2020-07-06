# yete

Yaml - Ejs Template Engine

## Prerequisite

```bash
yarn global add pkg
```

## Build

### Support targets

- win-64x

```bash
yarn pub
```

## How to use

### Command

```bash
yete -c "<your config path>"
```

### Configuration

#### Format (Json5)

```json5
{
  helper: "<your helper .js script>",
  runs: [
    {
      ejs: "<template, single file - not permit wildcard>",
      yaml: ["<structure, multiple files - permitted wildcard>"],
      outputDir: "<result path>",
      outputExt: "<file extension>",
    },
  ],
}
```

#### Example

```json5
{
  helper: "./example/ejs/helper",
  runs: [
    {
      ejs: "example/ejs/condition.ejs",
      yaml: ["example/yaml/conditions.yaml"],
      outputDir: "example/output",
      outputExt: ".cs",
    },
    {
      ejs: "example/ejs/enum.ejs",
      yaml: ["example/yaml/enums.yaml"],
      outputDir: "example/output",
      outputExt: ".cs",
    },
    {
      ejs: "example/ejs/command.ejs",
      yaml: ["example/yaml/*_commands.yaml"],
      outputDir: "example/output",
      outputExt: ".cs",
    },
  ],
}
```
