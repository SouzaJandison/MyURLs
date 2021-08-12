import { getConnection } from 'typeorm';

import jwt from 'jsonwebtoken';
import Request from 'supertest';
import { v4 as uuid } from 'uuid';

import { app } from '../../app';
import { authConfig } from '../../config/auth';
import createConnection from '../../database';

interface ITokenPayload {
  iat: number;
  exp: number;
  id: string;
}

const MOCK_CREATE_USER = {
  username: 'any_user',
  email: 'any_email@email.com.br',
};

describe('SignUp Controllers', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    const connection = getConnection();
    await connection.dropDatabase();
    await connection.close();
  });

  test('Should return 400 if no username is provided', async () => {
    const response = await Request(app).post('/users').send({
      email: 'any_email@email.com.br',
      password: 'any_password',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('username is a required field');
  });

  test('Should return 400 if no email is provided', async () => {
    const response = await Request(app).post('/users').send({
      username: 'any_user',
      password: 'any_password',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('email is a required field');
  });

  test('Should return 400 if the email provided is not a valid email', async () => {
    const response = await Request(app).post('/users').send({
      username: 'any_user',
      email: 'any_email_email',
      password: 'any_password',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('email must be a valid email');
  });

  test('Should return 400 if no password is provided', async () => {
    const response = await Request(app).post('/users').send({
      username: 'any_user',
      email: 'any_email@email.com.br',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('password is a required field');
  });

  test('Should return 400 if password is less than six characters', async () => {
    const response = await Request(app).post('/users').send({
      username: 'any_user',
      email: 'any_email@email.com.br',
      password: 'any_p',
    });

    const { errors } = response.body.message;

    expect(response.statusCode).toBe(400);
    expect(errors.join()).toBe('password must be at least 6 characters');
  });

  test('Should return 201 if a new user is created successfully', async () => {
    const response = await Request(app)
      .post('/users')
      .send({
        ...MOCK_CREATE_USER,
        password: 'any_password',
      });

    const { user } = response.body;

    expect(response.statusCode).toBe(201);
    expect({ ...MOCK_CREATE_USER, avatar: 'default' }).toEqual(user);
  });

  test('Should return 400 if email has already been registered', async () => {
    const response = await Request(app)
      .post('/users')
      .send({
        ...MOCK_CREATE_USER,
        password: 'any_password',
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Email address already used.');
  });

  test('Should return 400 if email verification user not exists', async () => {
    const generate_any_id_invalid = uuid();

    const response = await Request(app).get(
      `/users/verify/email/${generate_any_id_invalid}`,
    );

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('User does not exists');
  });

  test('Should return 200 if email verification successfully', async () => {
    const user = await Request(app).post('/users').send({
      username: 'any_user02',
      email: 'any_email02@email.com.br',
      password: 'any_password_02',
    });

    const { token } = user.body;
    const decoded = jwt.verify(token, authConfig.jwt.secret);

    const { id } = decoded as ITokenPayload;

    const response = await Request(app).get(`/users/verify/email/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('successful email verification');
  });
});
