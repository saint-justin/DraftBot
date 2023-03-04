import Draft, { getSetData } from './Draft';
import * as ScryfallWrapper from '../../utils/wrappers/ScryfallWrapper';

const draftInstance = new Draft();

describe('Draft Command', () => {
  describe('Command Configuration', () => {
    test('Command properties are not null', () => {
      expect(draftInstance.action).not.toBeNull();
      expect(draftInstance.commandSchema).not.toBeNull();
      expect(draftInstance.dynamo).not.toBeNull();
      expect(draftInstance.name).not.toBeNull();
    });

    test('Command is well-named', () => {
      expect(draftInstance.name).toBe('draft');
    });
  });

  describe('getSetData helper', () => {
    test('Handles valid set tags correctly', () => {
      const spy = jest.spyOn(ScryfallWrapper, 'getSetRequest');
      spy.mockReturnValue(new Promise(() => ({
        status: 200,
        json: {
          foo: 'bar',
        },
      })));

      expect(getSetData('valid-tag')).toBe({ foo: 'bar' });

      spy.mockRestore();
    });
  });
});
