import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {InputComponent} from '../transaction/components/input/input.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openInputDialog(): void {
    const dialogRef = this.dialog.open(InputComponent, {});
  }
}
