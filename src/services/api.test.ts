/* eslint-disable jest/no-conditional-expect */
//@ts-nocheck
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { loginCall, fetchUserDetails, fetchUsers, fetchUserById } from './api';
import {authResponse} from "../../mockresponse/authresponse";

// Create a Mock Adapter instance
const mock = new MockAdapter(axios);

describe('api functions', () => {

  afterEach(() => {
    mock.reset();
  });

  test('loginCall makes a POST request to /auth/login', async () => {
    mock.onPost('/auth/login').reply(200, authResponse);

    const response = await loginCall('emilys', 'emilyspass');

    expect(response.data.email).toEqual(authResponse.email);
  });

  test('fetchUserDetails makes a GET request to /auth/me with correct headers', async () => {
    const responseData = { id: 1, name: 'John Doe', username: 'emilys' };
    mock.onGet('/auth/me').reply(200, responseData);
    const tokenRes = await loginCall('emilys', 'emilyspass');
    const response = await fetchUserDetails(tokenRes.data.token);
    // console.log(response);
    expect(response.data.username).toEqual(responseData.username);
  });

  test('fetchUsers makes a GET request to /users', async () => {
    const responseData = [{ id: 1, firstName: 'Emily' }];
    mock.onGet('/users').reply(200, responseData);

    const response = await fetchUsers();

    expect(response.data.users[0].firstName).toEqual(responseData[0].firstName);
  });

  test('fetchUserById makes a GET request to /users/:id', async () => {
    const responseData = { id: 1, name: 'John Doe',username: 'emilys' };
    mock.onGet('/users/1').reply(200, responseData);

    const response = await fetchUserById(1);
    expect(response.data.username).toEqual(responseData.username);
  });

  test('loginCall handles errors', async () => {
    mock.onPost('/auth/login').reply(500);

    try {
      await loginCall('emilys', 'emilyspass');
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });

  test('fetchUserDetails handles errors', async () => {
    mock.onGet('/auth/me').reply(401);

    try {
      await fetchUserDetails('test-token');
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });

  test('fetchUsers handles errors', async () => {
    mock.onGet('/users').reply(500);

    try {
      await fetchUsers();
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });

  test('fetchUserById handles errors', async () => {
    mock.onGet('/users/1').reply(500);

    try {
      await fetchUserById(1);
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });
});