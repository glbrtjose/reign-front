import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  controllerSub:Subscription;
  numberPattern: string = '^[0-9]*$';
  constructor(private _HackerRankService:HackerRankService) { }

  ngOnInit(): void {
    this.controller.addControl('skip',new FormControl('',[Validators.pattern(this.numberPattern)]));
    this.controller.addControl('limit',new FormControl('',[Validators.pattern(this.numberPattern)]));
    this.controller.addControl('search',new FormControl('',[]));
    this.controller.addControl('filterBy',new FormControl('',[]));
    this.controllerSub=this.controller.valueChanges.subscribe((value) => {
      if(this.controller.valid)
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
    if(this.controllerSub)
      this.controllerSub.unsubscribe();
  }

  delete(_id:string):void{
    this._HackerRankService.delete(_id).subscribe((data) => {
      this.list= data;
    },(err)=>{
      console.log(err);
    });
  }
}
