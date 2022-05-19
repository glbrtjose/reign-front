import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HackerRankService } from 'src/app/services/hacker-rank.service';

@Component({
  selector: 'app-hacker-rank',
  templateUrl: './hacker-rank.component.html',
  styleUrls: ['./hacker-rank.component.scss']
})
export class HackerRankComponent implements OnInit, OnDestroy {
  controller:FormGroup = new FormGroup({});
  list:any = [];
  _HackerRankServiceSub:Subscription;
  constructor(private _HackerRankService:HackerRankService) { }

  ngOnInit(): void {
    this.controller.addControl('limit',new FormControl('',[]));
    this.controller.addControl('search',new FormControl('',[]));
    this.controller.addControl('filterBy',new FormControl('',[]));
    this.controller.valueChanges.subscribe((value) => {
      const { limit } = value;
      this._HackerRankServiceSub=this._HackerRankService.get(value).subscribe((data) => {
        this.list= data;
      },(err)=>{
        console.log(err);
      })
    });
    this.controller.get('limit')?.setValue(5);
  }

  ngOnDestroy(): void{
    if(this._HackerRankServiceSub)
      this._HackerRankServiceSub.unsubscribe();
  }

  delete(_id:string):void{
    this._HackerRankService.delete(_id).subscribe((data) => {
      this.list= data;
    },(err)=>{
      console.log(err);
    });
  }
}
