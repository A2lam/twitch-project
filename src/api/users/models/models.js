import joi from 'joi';

const model = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  token: joi.string(),
});

export const modelForUpdate = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email(),
});

export const modelForDisplay = joi.object().keys({
  _id: joi.object(),
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email(),
});

export default model;
