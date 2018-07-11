import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateComponent as CreateComponentDialog } from '../create/create.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponentDialog, {
      width: '500px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
