import { TestBed, inject } from '@angular/core/testing';

import {
  AngularFirestore,
} from 'angularfire2/firestore';
import { Observable, of } from 'rxjs';

import { Tally, Item } from '../models';
import { ItemService } from './item.service';

describe('ItemService', () => {
  let service: ItemService;
  const AngularFirestoreStub = {
    collection: (name: string) => ({
      doc: (path: string) => ({
        valueChanges: () => path.includes('items') ? of(<Item>{name: 'foo', quantity: 1}) : null
      }),
      valueChanges: () => name.includes('items') ? of(<Item[]>[{name: 'foo', quantity: 1}]) : null,
      add: jasmine.createSpy()
    }),
    doc: (path: string) => ({
      valueChanges: () => path.includes('tallies') ? of(<Tally>{totalCount: 1}) : null
    })
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: AngularFirestoreStub },
        ItemService,
      ],
    });
    service = TestBed.get(ItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have an observable of a list of items as the property items', () => {
    service.items.subscribe(data => {
      expect(data).toEqual(<Item[]>[{name: 'foo', quantity: 1}]);
    });
  });
  it('should have an observable of a tally as the property tally', () => {
    service.tally.subscribe(data => {
      expect(data).toEqual(<Tally>{totalCount: 1});
    });
  });
  it('should add a new item to the database', () => {
    expect(service.addItem(<Item>{name: 'foo', quantity: 1})).toBe(undefined);
  });
});
