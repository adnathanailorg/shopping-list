import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const countItems = functions.firestore
  .document('items/{item}')
  .onWrite(event => {
    return admin.firestore().collection('items')
      .get()
      .then(querySnapshot => {
        const totalCount = querySnapshot.size;
        return admin.firestore().doc('tallies/items').update({ totalCount })
      })
      .catch(err => console.log(err) )
  });