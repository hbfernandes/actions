# Maven docker action

This action allows running a Maven command within a docker container.

## Inputs

### `path`
Path where to run the maven command, relative to workspace or absolute.

### `args`
Maven command arguments.

## Example usage
```
uses: hbfernandes/actions/maven@master
with:
  path: where/to/run
  args: install
```