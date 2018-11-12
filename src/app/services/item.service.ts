import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

import { Item, Tally } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private tallyDoc: AngularFirestoreDocument<Tally>;
  public tally: Observable<Tally>;

  private itemsCollection: AngularFirestoreCollection<Item>;
  public items: Observable<Item[]>;
  constructor(afs: AngularFirestore) {
    this.tallyDoc = afs.doc<Tally>('tallies/items');
    this.tally = this.tallyDoc.valueChanges();

    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(action => {
        const item = action.payload.doc.data() as Item;
        item.id = action.payload.doc.id;
        return item;
      });
    }));
  }
  public addItem(item: Item) {
    this.itemsCollection.add(item);
  }
  public updateBought(item: Item) {
    console.log('item.service/updateBought', item);
    this.itemsCollection.doc(item.id).update({ bought: item.bought });
  }
}
