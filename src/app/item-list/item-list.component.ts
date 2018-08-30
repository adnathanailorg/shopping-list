import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Observable } from 'rxjs';

import { Item, Tally } from '../models';
import { ItemService } from '../services/item.service';

import { DialogComponent } from './dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public tally: Observable<Tally>;
  public items: Observable<Item[]>;
  constructor(
    private _itemService: ItemService,
    public dialog: MatDialog) {
    this.tally = _itemService.tally;
    this.items = _itemService.items;
  }
  ngOnInit() {
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {item: {name: '', quantity: 0}}
    });
    dialogRef.afterClosed().subscribe(result => {
      this._itemService.addItem(result);
    });
  }
}
