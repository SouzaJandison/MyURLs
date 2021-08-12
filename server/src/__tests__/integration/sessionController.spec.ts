import { getConnection } from 'typeorm';

import Request from 'supertest';

import { app } from '../../app';
import createConnection from '../../database';

interface IUser {
  username: string;
  email: string;
  avatar: string;
}

const MOCK_CREATE_USER = {
  username: 'any_user',
  email: 'any_email@email.com.br',
};

let userCreated: IUser;

describe('Login Controller', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();

    const { body: data } = await Request(app)
      .post('/users')
      .send({
        ...MOCK_CREATE_USER,
        password: 'any_password',
      });

    userCreated = data.user;
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  test('Should return 400 if no email is provided', async () => {
    const response = await Request(app).post('/users/session').send({
      password: 'any_password',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('email is a required field');
  });

  test('Should return 400 if the email provided is not a valid email', async () => {
    const response = await Request(app).post('/users/session').send({
      email: 'any_email_email',
      password: 'any_password',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('email must be a valid email');
  });

  test('Should return 400 if no password is provided', async () => {
    const response = await Request(app).post('/users/session').send({
      email: 'any_email02@email.com.br',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('password is a required field');
  });

  test('Should return 200 if user login successfully', async () => {
    const response = await Request(app).post('/users/session').send({
      email: userCreated.email,
      password: 'any_password',
    });

    const { user } = response.body;

    expect(response.statusCode).toBe(200);
    expect({ ...MOCK_CREATE_USER, avatar: 'default' }).toEqual(user);
    expect(response.body).toHaveProperty('token');
  });

  test('Should return 401 if user not found', async () => {
    const response = await Request(app).post('/users/session').send({
      email: 'any_email_no_user@email.com.br',
      password: 'any_password',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Incorrect email/password combination.');
  });

  test('Should return 401 if user password is incorrect', async () => {
    const response = await Request(app).post('/users/session').send({
      email: userCreated.email,
      password: 'any_password_incorrect',
    });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Incorrect email/password combination.');
  });
});
