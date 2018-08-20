import usersServices from '../services/services';

export default function (req, res, next) {
  return usersServices
    .createOne(req.body)
    .then(response => res.send(response))
    .catch(err => next(err));
}
