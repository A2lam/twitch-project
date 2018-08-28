import favServices from '../services/services';

export default function (req, res, next) {
  const params = {
    user_id: req.user._id,
    game_id: req.params.game_id,
  };

  return favServices
    .createOne(JSON.stringify(params))
    .then(response => res.send(response))
    .catch(err => next(err));
}
