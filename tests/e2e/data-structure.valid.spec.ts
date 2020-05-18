import { EnvJsonParser } from '../../lib';

describe('valid data structure cases', () => {
  beforeEach(() => {
    process.env = {};
  });

  it('parses 2 keys at the root level', () => {
    const data = {
      key1: 'value',
      key2: 'value',
    };

    process.env['TEST_KEY1'] = JSON.stringify('value');
    process.env['TEST_KEY2'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses 2 keys in a nested object', () => {
    const data = {
      key: {
        key1: 'value',
        key2: 'value',
      },
    };

    process.env['TEST_KEY.key1'] = JSON.stringify('value');
    process.env['TEST_KEY.key2'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses 2 objects in an array', () => {
    const data = {
      key: [
        {
          key: 'value',
        },
        {
          key: 'value',
        },
      ],
    };

    process.env['TEST_KEY:0.key'] = JSON.stringify('value');
    process.env['TEST_KEY:1.key'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses a multi dimensional array', () => {
    const data = {
      key: [
        ['value', 'value'],
        ['value', 'value'],
      ],
    };

    process.env['TEST_KEY:0:0'] = JSON.stringify('value');
    process.env['TEST_KEY:0:1'] = JSON.stringify('value');
    process.env['TEST_KEY:1:0'] = JSON.stringify('value');
    process.env['TEST_KEY:1:1'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses a object sub path', () => {
    const data = {
      key: ['value'],
    };

    process.env['TEST_KEY:0.KEY.KEY:0'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get('key:0.key');
    expect(result).toStrictEqual(data);
  });

  it('parses a array sub path', () => {
    const data = ['value'];

    process.env['TEST_KEY:0.KEY.KEY:0'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get('key:0.key.key');
    expect(result).toStrictEqual(data);
  });
});
