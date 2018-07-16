import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatTableDataSource  } from '@angular/material';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Subscription } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { User } from '../../shared/models/user.model';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  
  users: any;
  private sub: Subscription = new Subscription();
  searchField: FormControl;
  searchForm: FormGroup;
  displayedColumns: string[] = ['select', 'position', 'name', 'email', 'actions' ];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private api: ApiService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { 
    this.searchField = new FormControl();
    this.searchForm = this.fb.group({searchField: this.searchField});     
  }

  ngOnInit() {
    this.sub = this.route.params.pipe(
      map(params => params['groupId']),
      switchMap(id => this.api.get(`admin/groups/${id}/users`))
    ).subscribe(
        resp => {
          console.log(resp)
          this.users = new MatTableDataSource<User>(resp as User[]);
          this.users.paginator = this.paginator;
        },  
        errMsg => console.log(errMsg) 
    )
    
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
