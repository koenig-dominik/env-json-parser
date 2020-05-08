import { EnvJsonParser } from '../../lib/env-json-parser';

describe('invalid datatype cases', () => {
  beforeEach(() => {
    process.env = {};
  });

  it('throws with non stringified string', () => {
    process.env['TEST_KEY'] = 'value';

    const envJsonParser = new EnvJsonParser('TEST_');
    const call = () => {
      envJsonParser.get();
    };
    expect(call).toThrow(
      'Failed to revive variable "test_key" with value "value": Unexpected token v in JSON at position 0',
    );
  });
});
