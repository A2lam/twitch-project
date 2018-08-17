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
}
