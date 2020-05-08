# Env JSON parser
Library that parses JSON structures out of environment variables

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
DEMO_KEY2.SUBKEY=42
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
        subkey: 42
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
    42
*/
```
