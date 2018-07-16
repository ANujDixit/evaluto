import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource  } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateComponent as CreateComponentDialog } from '../create/create.component';
import { Group } from '../../shared/models/group.model';
import { Subscription } from 'rxjs';
import { UiService } from '../../common/ui.service';
import { ApiService } from '../../core/services/api.service';
import { SelectionModel } from '@angular/cdk/collections';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  groups: any;
  group = {};
  private sub: Subscription = new Subscription();
  private sub1: Subscription = new Subscription();
  selection = new SelectionModel<Group>(true, []);
  displayedColumns: string[] = ['select', 'position', 'name', 'actions', 'users'];
  
  searchField: FormControl;
  searchForm: FormGroup;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private api: ApiService,
              private fb: FormBuilder,
              private uiService: UiService) { 
                
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({searchField: this.searchField});              
                
  }

  ngOnInit() {
   this.getGroups();
   this.getSearchedGroups();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }
  
  getGroups() {
    this.sub = this.api.get('admin/groups')
      .subscribe(
        resp => { 
          this.groups = new MatTableDataSource<Group>(resp as Group[]);
          this.groups.paginator = this.paginator;
        },
        errMsg => console.log(errMsg) 
      );
  }
  
  getSearchedGroups(){
    this.sub1 = this.searchField.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(search => this.api.get('admin/groups', {"search": search})),  
      ).subscribe(
          resp => {
            this.groups = new MatTableDataSource<Group>(resp as Group[]);
            this.groups.paginator = this.paginator;
          },  
          errMsg => console.log(errMsg) 
      )
  }
  
  openDialog(group: Group): void {
    const dialogRef = this.dialog.open(CreateComponentDialog, {
      width: '500px',
      data: group
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === "saved") {
        this.uiService.showToast("Group Created Successfully", 'Close');
        this.getGroups();
        
      }
      if (result === "edited") {
        this.uiService.showToast("Group Edited Successfully", 'Close');
        this.getGroups();
      }
    });
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.groups.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.groups.data.forEach(row => this.selection.select(row));
  }
  
  deleteSelection(){
    const selectedIds = this.selection.selected.map(group => group.id);
    
    if (selectedIds.length < 1) {
      this.uiService.showToast("You have not made any selection", 'Close');
    } else {
      if(confirm('Are you sure you want to delete them?')){
        this.api.post('admin/groups/delete_all', selectedIds)
          .subscribe(
            resp => {  
              this.uiService.showToast("Groups Deleted Successfully", 'Close');
              this.getGroups();
            },
            errMsg => {
              console.log(errMsg)
            }
          );
      }
    }
  }
  
  delete(id: string) {
    if(confirm('Are you sure you want to delete it?')){
      this.api.delete(`admin/groups/${id}`)
        .subscribe(
          resp => {  
            this.uiService.showToast("Group Deleted Successfully", 'Close');
            this.getGroups();
          },
          errMsg => {
            console.log(errMsg)
          }
        );
    }
  }

}
