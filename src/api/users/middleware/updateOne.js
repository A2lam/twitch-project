import usersServices from '../services/services';

export default function (req, res, next) {
  usersServices
    .updateOne(req.params.email)
    .then(response => res.send(response))
    .catch(err => next(err));
}
