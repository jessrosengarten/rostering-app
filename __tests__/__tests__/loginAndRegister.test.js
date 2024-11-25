import { register, login } from '../loginAndRegister';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

jest.mock('firebase/auth');

describe('Authentication', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should register a user successfully', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const userCredential = { user: { uid: '12345' } };
    createUserWithEmailAndPassword.mockResolvedValue(userCredential);

    const user = await register(email, password);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(user).toEqual(userCredential.user);
  });

  it('should fail to register a user with missing fields', async () => {
    await expect(register('', '')).rejects.toThrow('Please fill in both email and password fields.');
  });

  it('should login a user successfully', async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const userCredential = { user: { uid: '12345', getIdToken: jest.fn().mockResolvedValue('token123') } };
    signInWithEmailAndPassword.mockResolvedValue(userCredential);

    const { user, token } = await login(email, password);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(auth, email, password);
    expect(user).toEqual(userCredential.user);
    expect(token).toBe('token123');
  });

  it('should fail to login a user with missing fields', async () => {
    await expect(login('', '')).rejects.toThrow('Please fill in both email and password fields.');
  });
});