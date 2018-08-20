import joi from 'joi';
import { ObjectId } from 'mongodb';
import client from '../../../../database';
import model, { modelForUpdate, modelForDisplay } from '../models/models';

class UsersServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  find(first = 20, offset = 0, term) {
    return client.mongodb()
      .then((db) => {
        return db
          .collection(this.COLLECTION_NAME)
          .find(term ? { $text: { $search: term } } : null,
            {
              _id: 1, firstName: 1, lastNmae: 1, email: 1,
            })
          .skip(offset)
          .limit(first)
          .toArray();
      });
  }

  findOne(id) {
    return joi.validate(id, joi.string().required())
      .then(() => client.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).findOne({ _id: ObjectId(id) }))
      .then((element) => {
        if (!element) throw errorMessage;

        return joi.validate(element, modelForDisplay, { stripUnknown: true }).value;
      });
  }

  createOne(data) {
    return joi.validate(data, model).then((validatedData) => {
      client.mongodb()
        .then(db => db.collection(this.COLLECTION_NAME).insertOne(validatedData))
        .then(response => response.ops[0]);
    });
  }

  updateOne(id, data) {
    return joi.validate(id, joi.string().required())
      .then(() => joi.validate(data, modelForUpdate))
      .then((validatedData) => {
        return client.mongodb()
          .then((db) => {
            db.collection(this.COLLECTION_NAME).updateOne(
              { _id: ObjectId(id) },
              { $set: validatedData },
            );
          });
      })
      .then((response) => {
        if (response.matchedCount === 0) throw errorMessage;

        return response;
      })
      .then(() => this.findOne(id));
  }

  deleteOne(id) {
    return joi.validate(id, joi.string().required())
      .then(() => client.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).deleteOne({ _id: ObjectId(id) }))
      .then((response) => {
        if (response.deletedCount === 0) throw errorMessage;

        return response;
      });
  }
}

export default new UsersServices('users');
