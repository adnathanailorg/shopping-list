import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

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
    this.items = this.itemsCollection.valueChanges();
  }
  public addItem(item: Item) {
    this.itemsCollection.add(item);
  }
}
