import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Item } from '../models';

export interface DialogData {
  item: Item;
}

@Component({
  selector: 'app-dialog',
  template: `
  <div mat-dialog-content>
    <p>New item</p>
    <mat-form-field>
      <input matInput placeholder="name" [(ngModel)]="data.item.name">
    </mat-form-field>
    <mat-form-field>
      <input matInput placeholder="quantity" [(ngModel)]="data.item.quantity">
    </mat-form-field>
  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">No Thanks</button>
    <button mat-button [mat-dialog-close]="data.item" cdkFocusInitial>Ok</button>
  </div>`
})
export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
