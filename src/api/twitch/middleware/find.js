import FavServices from '../services/services';

export default function (req, res, next) {
  const {
    first,
    offset,
  } = req.query;

  return FavServices
    .findByUserId(String(req.user._id), parseInt(first, 10), parseInt(offset, 10))
    .then(response => res.send(response))
    .catch(err => next(err));
}
