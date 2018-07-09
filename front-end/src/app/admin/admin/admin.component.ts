import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  isLoggedIn: boolean = false;
  
  sideNavListArray = [
                      {"icon": "dashboard", "title": "Dashboard", "link": "/admin/dashboard"},
                      {"icon": "question_answer", "title": "Questions", "link": "/admin/questions"},
                      {"icon": "help", "title": "Categories", "link": "/admin/categories"},
                      {"icon": "help", "title": "Tests", "link": "/admin/tests"},
                      {"icon": "group_work", "title": "Groups", "link": "/admin/groups"},
                      {"icon": "supervised_user_circle", "title": "Members", "link": "/admin/members"},                 
                    ]

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
  } 
  
  onLogOut(){
    this.auth.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
