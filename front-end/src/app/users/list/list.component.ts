import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource  } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateComponent as CreateComponentDialog } from '../create/create.component';
import { User } from '../../shared/models/user.model';
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
export class ListComponent implements OnInit {

  users: any;
  user = {};
  private sub: Subscription = new Subscription();
  private sub1: Subscription = new Subscription();
  selection = new SelectionModel<User>(true, []);
  displayedColumns: string[] = ['select', 'position', 'name',  'groups', 'actions' ];
  
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
   this.getUsers();
   this.getSearchedUsers();
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub1.unsubscribe();
  }
  
  getUsers() {
    this.sub = this.api.get('admin/users')
      .subscribe(
        resp => { 
          this.users = new MatTableDataSource<User>(resp as User[]);
          this.users.paginator = this.paginator;
        },
        errMsg => console.log(errMsg) 
      );
  }
  
  getSearchedUsers(){
    this.sub1 = this.searchField.valueChanges.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(search => this.api.get('admin/users', {"search": search})),  
      ).subscribe(
          resp => {
            this.users = new MatTableDataSource<User>(resp as User[]);
            this.users.paginator = this.paginator;
          },  
          errMsg => console.log(errMsg) 
      )
  }

}
