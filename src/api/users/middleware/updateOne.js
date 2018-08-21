import usersServices from '../services/services';

export default function (req, res, next) {
  return usersServices
    .updateOne(req.params.email, req.body)
    .then(response => res.send(response))
    .catch(err => next(err));
}
