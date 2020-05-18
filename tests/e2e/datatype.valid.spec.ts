import { EnvJsonParser } from '../../lib';

describe('valid datatype cases', () => {
  beforeEach(() => {
    process.env = {};
  });

  it('parses value as string', () => {
    const data = {
      key: 'value',
    };

    process.env['TEST_KEY'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses value as boolean', () => {
    const data = {
      key: true,
    };

    process.env['TEST_KEY'] = JSON.stringify(true);

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses value as number', () => {
    const data = {
      key: 42,
    };

    process.env['TEST_KEY'] = JSON.stringify(42);

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses key as array', () => {
    const data = {
      key: ['value'],
    };

    process.env['TEST_KEY:0'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses key as object', () => {
    const data = {
      key: {
        key: 'value',
      },
    };

    process.env['TEST_KEY.KEY'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses number key as object', () => {
    const data = {
      key: {
        0: 'value',
      },
    };

    process.env['TEST_KEY.0'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });
});
