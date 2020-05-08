export type Key = string | number;
export type ReviverFunction = (key: Key, value: any) => any;
export enum PathType {
  object = '.',
  array = ':',
}

const pathDelimiterRegex = new RegExp(
  `\\${PathType.object}|\\${PathType.array}`,
);

export class VariableParser {
  constructor(
    private name: string,
    private value: string,
    private reviver?: ReviverFunction,
  ) {}

  private reviveValue(key: Key, value: string): any {
    // This handles string, number, boolean, array, object
    try {
      value = JSON.parse(value);
      if (this.reviver !== undefined) {
        value = this.reviver(key, value);
      }
      return value;
    } catch (error) {
      throw new error.constructor(
        'Failed to revive variable "' +
          this.name +
          '" with value "' +
          this.value +
          '": ' +
          error.message,
      );
    }
  }

  // A object path looks like this abc.def:0:2.xyz
  public insertByPathAndRevive(
    container: any,
    path: string,
    firstType: PathType,
  ): void {
    const nextTypeMatch = pathDelimiterRegex.exec(path);

    let key: Key =
      nextTypeMatch === null ? path : path.substring(0, nextTypeMatch.index);
    if (firstType === PathType.array) {
      key = parseInt(key);
    }

    if (nextTypeMatch !== null) {
      const nextType = nextTypeMatch[0] as PathType;
      if (container[key] === undefined) {
        if (nextType === PathType.array) {
          container[key] = [];
        } else {
          container[key] = {};
        }
      }

      const remainingPath = path.substring(
        nextTypeMatch.index + nextType.length,
      );
      this.insertByPathAndRevive(container[key], remainingPath, nextType);
    } else {
      container[key] = this.reviveValue(key, this.value);
    }
  }
}
