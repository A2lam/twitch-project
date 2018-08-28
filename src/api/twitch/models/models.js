import joi from 'joi';

const model = joi.object().keys({
  user_id: joi.string().required(),
  game_id: joi.string().required(),
});

export default model;
