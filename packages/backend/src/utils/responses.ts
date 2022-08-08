export const invalidEmailOrPasswordResponse = {
  statusCode: 404,
  error: 'Not Found',
  message: 'Incorrect e-mail or password.'
};

export const inactiveAccountResponse = {
  statusCode: 403,
  error: 'Forbidden',
  message: 'Account is not activated.'
};
