import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieDto } from '../../../api/service/personal-finance-api.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss'],
})
export class DialogBoxComponent {
  action: string;
  localData: any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    // @Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CategorieDto
  ) {
    console.log(data);
    this.localData = { ...data };
    this.action = this.localData.action;
  }

  doAction(): void {
    this.dialogRef.close({ event: this.action, data: this.localData });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
