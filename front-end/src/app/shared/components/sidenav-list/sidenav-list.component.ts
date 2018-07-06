import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  
  @Input()
  isLoggedIn: boolean = false;

  @Input()
  sideNavListArray: any[] ;  

  @Output()
  logout = new EventEmitter();

  constructor() { }

  ngOnInit() {   
  }

  onLogout(){
    this.logout.emit();
  }

}
