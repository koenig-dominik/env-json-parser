# Env JSON parser
Library that parses JSON structures out of environment variables

<a href="https://www.npmjs.com/env-json-parser"><img src="https://img.shields.io/npm/v/env-json-parser.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/env-json-parser"><img src="https://img.shields.io/npm/l/env-json-parser.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/env-json-parser"><img src="https://img.shields.io/npm/dm/env-json-parser.svg" alt="NPM Downloads" /></a>
<a href="https://www.npmjs.com/env-json-parser"><img src="https://github.com/koenig-dominik/env-json-parser/workflows/CI/badge.svg" alt="CI" /></a>

## Installation

```shell script
npm install --save env-json-parser
```

## Usage

Paths are constructed as follows:  
`.` separates nested objects  
`:` separates arrays  

Values always need to be JSON encoded

### Example

Environment
```dotenv
DEMO_KEY1="test"
DEMO_KEY2.SUBKEY.NESTEDSUBKEY=42
DEMO_KEY3:0=true
DEMO_KEY4={"subkey":"test"}
```

Typescript
```typescript
// import the library
import {EnvJsonParser} from 'env-json-parser';

// create an instance of the parser with the prefix as parameter, names are case insensitive
const envJsonParser = new EnvJsonParser('DEMO_');

// get the complete structure as object
envJsonParser.get();
/*
{
    key1: "test",
    key2: {
        subkey: {
            nestedsubkey: 42
        }
    },
    key3: [
        true
    ],
    key4: {
        subkey: "test"
    }
}
*/

// get a part of the structure
envJsonParser.get('key2.subkey');
/*
    {
        nestedsubkey: 42
    }
*/
```
