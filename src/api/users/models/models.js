import joi from 'joi';

const model = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
  role: joi.string().required(),
});

export const modelForUpdate = joi.object().keys({
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email(),
  role: joi.string(),
});

export const modelForDisplay = joi.object().keys({
  _id: joi.object(),
  firstName: joi.string(),
  lastName: joi.string(),
  email: joi.string().email(),
  role: joi.string(),
});

export default model;
