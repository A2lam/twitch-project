import joi from 'joi';
import client from '../../../../database';
import model from '../models/models';

class FavServices {
  constructor(collectionName) {
    this.COLLECTION_NAME = collectionName;
  }

  findByUserId(user_id, first = 20, offset = 0) {
    return client.mongodb()
      .then((db) => {
        return db
          .collection(this.COLLECTION_NAME)
          .find({ user_id })
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

  deleteByGameIdAndUser(user_id, game_id) {
    return client.mongodb()
      .then(db => db.collection(this.COLLECTION_NAME).deleteOne({ user_id, game_id }))
      .then((response) => {
        // Dans le futur, on utilisera ici le middleware d'erreur
        // if (response.deletedCount === 0) throw errorMessage;

        return response;
      });
  }
}

export default new FavServices('favoris');
