import FavServices from '../services/services';

export default function (req, res, next) {
  return FavServices
    .deleteByGameIdAndUser(String(req.user._id), req.params.game_id)
    .then(response => res.send(response))
    .catch(err => next(err));
}
