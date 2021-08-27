import { BCryptHash } from '../../app/providers/BCryptHash';

let hashProvider: BCryptHash;

const MOCK_ANY_PASSWORD = 'any_password';

describe('BCryptHash Provider', () => {
  beforeAll(() => {
    hashProvider = new BCryptHash();
  });
  test('Should return isValidPassword like true if encryption password successfully', async () => {
    const hashPassword = await hashProvider.generateHash(MOCK_ANY_PASSWORD);

    const isValidPassword = await hashProvider.compareHash(
      MOCK_ANY_PASSWORD,
      hashPassword,
    );

    expect(isValidPassword).toBe(true);
  });

  test('Should return isValidPassword like false if encryption password failed', async () => {
    const hashPassword = await hashProvider.generateHash(MOCK_ANY_PASSWORD);

    const isValidPassword = await hashProvider.compareHash(
      'any_password_not_valid',
      hashPassword,
    );

    expect(isValidPassword).toBe(false);
  });
});
