"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.countItems = functions.firestore
    .document('items/{item}')
    .onWrite(event => {
    return admin.firestore().collection('items')
        .get()
        .then(querySnapshot => {
        const totalCount = querySnapshot.size;
        return admin.firestore().doc('tallies/items').update({ totalCount });
    })
        .catch(err => console.log(err));
});
//# sourceMappingURL=index.js.map