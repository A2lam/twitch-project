import joi from 'joi';
import { ObjectId } from 'mongodb';
import client from '../../../../database';
import model from '../models/models';

class UsersServices
{
  constructor(collectionName)
  {
    this.COLLECTION_NAME = collectionName;
  }

  find(first = 20, offset = 0, term)
  {
    return client.mongodb()
      .then((db) =>
      {
        return db
          .collection(this.COLLECTION_NAME)
          .find(term ? { $text: { $search: term } } : null,
          {
            _id: 1, firstName: 1, lastNmae: 1, email: 1,
          })
          .skip(offset)
          .limit(first)
          .toArray()
        ;
      })
    ;
  }

  createOne(data)
  {
    return joi.validate(data, model).then((validatedData) =>
    {
      client.mongodb()
        .then((db) => db.collection(this.COLLECTION_NAME).insertOne(validatedData))
        .then(response => response.ops[0])
      ;
    });
  }
}

export default new UsersServices('users');