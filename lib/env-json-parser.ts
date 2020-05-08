import { PathType, ReviverFunction, VariableParser } from './variable-parser';

export class EnvJsonParser {
  private readonly prefix: string;

  constructor(
    prefix: string,
    private reviver?: ReviverFunction,
    private caseSensitive = false,
  ) {
    this.prefix = this.correctCase(prefix);
  }

  private correctCase(string: string): string {
    return this.caseSensitive ? string : string.toLowerCase();
  }

  get(path = ''): any {
    let container;
    let containerType;

    const variablePrefix = this.prefix + this.correctCase(path);
    for (const [name, value] of Object.entries(process.env)) {
      const caseCorrectName = this.correctCase(name);

      // Only process variables with the correct prefix
      if (!caseCorrectName.startsWith(variablePrefix)) {
        continue;
      }

      // Remove the prefix from the object path
      let objectPath = caseCorrectName.substring(variablePrefix.length);

      // Determine the first container type and create it if needed
      if (containerType === undefined) {
        if (objectPath.startsWith(PathType.array)) {
          container = [];
          containerType = PathType.array;
        } else {
          container = {};
          containerType = PathType.object;
        }
      }

      // Correct the object path based on container type
      if (containerType === PathType.array) {
        objectPath = objectPath.substring(PathType.array.length);
      } else if (objectPath.startsWith(PathType.object)) {
        objectPath = objectPath.substring(PathType.object.length);
      }

      const variableParser = new VariableParser(
        caseCorrectName,
        value as string,
      );
      variableParser.insertByPathAndRevive(
        container,
        objectPath,
        containerType,
      );
    }

    return container;
  }
}
