import database from '../database/';

database
    .mongodb()
    .then(db => db.collection('users').createIndex({ firstName: 'text', lastName: 'text'}, { default_language: none }));
