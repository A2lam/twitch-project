import joi from 'joi';
import client from '../../../../database';
import model from '../models/models';

class UsersServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  find(first = 20, offset = 0, term) {
    return client.mongodb()
      .then((db) => {
        return db
          .collection(this.COLLECTION_NAME)
          .find(term ? { $text: { $search: term } } : null)
          .skip(offset)
          .limit(first)
          .toArray();
      });
  }

  createOne(data) {
    return joi.validate(data, model).then((validatedData) => {
      return client.mongodb()
        .then(db => db.collection(this.COLLECTION_NAME).insertOne(validatedData))
        .then(response => response.ops[0]);
    });
  }

  deleteOne(email) {
    return joi.validate(email, joi.string().email().required())
      .then(() => client.mongodb())
      .then(db => db.collection(this.COLLECTION_NAME).deleteOne({ email }))
      .then((response) => {
        // Dans le futur, on utilisera ici le middleware d'erreur
        // if (response.deletedCount === 0) throw errorMessage;

        return response;
      });
  }
}

export default new UsersServices('favoris');
