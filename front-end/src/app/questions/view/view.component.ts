import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { switchMap, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy {
  
  question: any;
  private sub: Subscription = new Subscription();

  constructor(private router: Router,
              private route: ActivatedRoute,
              private api: ApiService) { }

  ngOnInit() {   
    this.sub = this.route.params.pipe(
        map(params => params['questionId']),
        switchMap(questionId => this.api.get(`admin/questions/${questionId}`))
      ).subscribe(
          resp => this.question = resp,
          errMsg => console.log(errMsg) 
      )
  }

  numberToChar(i: number) {
    return String.fromCharCode(97 + i)
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
