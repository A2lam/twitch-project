import joi from 'joi';

const model = joi.object().keys({
  name: joi.string().required(),
});

export default model;
