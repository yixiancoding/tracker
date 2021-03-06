const ApiErrorMessages = {
  EMAIL_NOT_FOUND : 0,
  INVALID_PWD : 1,
  DB_ERROR : 2,
  NOT_FOUND : 3,
  EMAIL_ALREADY_EXISTS : 4,
  COULD_NOT_CREATE_USER : 5,
  PASSWORD_RESET_EXPIRED : 6,
  PASSWORD_RESET_HASH_MISMATCH : 7,
  PASSWORD_RESET_EMAIL_MISMATCH : 8,
  COULD_NOT_RESET_PASSWORD : 9,
  PASSWORD_CONFIRM_MISMATCH : 10,
  INVOICE_ALREADY_EXISTS : 11,
  COULD_NOT_CREATE_INVOICE : 12,
  COULD_NOT_CREATE_INVOICE_FOR_USER : 13,
};

module.exports = ApiErrorMessages;