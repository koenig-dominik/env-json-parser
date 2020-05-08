import { EnvJsonParser } from '../../lib/env-json-parser';

describe('valid naming cases', () => {
  beforeEach(() => {
    process.env = {};
  });

  it('parses mixed cased prefixes', () => {
    const data = {
      key: 'value',
    };

    process.env['tEsT_KEY'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TesT_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });

  it('parses mixed cased keys', () => {
    const data = {
      key: 'value',
    };

    process.env['TEST_kEy'] = JSON.stringify('value');

    const envJsonParser = new EnvJsonParser('TEST_');
    const result = envJsonParser.get();
    expect(result).toStrictEqual(data);
  });
});
