import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateComponent as CreateComponentDialog } from '../create/create.component';
import { Group } from '../../shared/models/group.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../common/ui.service';
import { ApiService } from '../../core/services/api.service';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { switchMap, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  
  groups: Group[];
  private sub: Subscription = new Subscription();
  private sub1: Subscription = new Subscription();
  selection = new SelectionModel<Group>(true, []);
  displayedColumns: string[] = ['select', 'position', 'name', 'actions', 'users'];
  
  searchField: FormControl;
  searchForm: FormGroup;

  constructor(public dialog: MatDialog,
              private api: ApiService,
              private fb: FormBuilder,
              private uiService: UiService) { 
                
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({searchField: this.searchField});              
                
  }

  ngOnInit() {
    this.sub = this.api.get('admin/groups')
      .subscribe(
        resp => this.groups = resp as Group[],
        errMsg => console.log(errMsg) 
      );
      
    this.sub1 = this.searchField.valueChanges.pipe(
          tap(val => console.log(`BEFORE MAP: ${val}`)),
          debounceTime(200),
          distinctUntilChanged(),
          switchMap(search => this.api.get('admin/groups', {"search": search})),  
          tap(val => console.log(`AFTER MAP: ${val}`))
        ).subscribe(
            resp => this.groups = resp as Group[],
            errMsg => console.log(errMsg) 
        )
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }
  
  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponentDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.groups.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.groups.forEach(row => this.selection.select(row));
  }

}
