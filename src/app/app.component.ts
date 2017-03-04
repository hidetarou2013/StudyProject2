import { Component } from '@angular/core';
import { enableProdMode } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  method1() :void{
    console.log('lodash version:', _.VERSION);
  }

  constructor(){
      console.log('lodash version:', _.VERSION);
      // console.log(_.last([1, 2, 3]));
  	  // console.log('hello');
      //
      // _.forEach([1,2,3], function(e) {
      //   console.log(e);
      // });

      // var ownerArr = [{
      //     "owner": "Colin",
      //     "pets": [{"name":"dog1"}, {"name": "dog2"}]
      // }, {
      //     "owner": "John",
      //     "pets": [{"name":"dog3"}, {"name": "dog4"}]
      // }];
      //
      // // petは2匹以上飼っている想定で、１匹目だけ抽出したい場合
      // ownerArr.map(function(owner){
      //   console.log( owner.pets[0].name );
      // });
      //
      // _.map(ownerArr,'pets[1].name')
      // .forEach(function(e){
      //   console.log(e);
      // });

      // ３階層の実験
      var labelArr = [{
          "labelName": "A",
          "order": "1",
          "childs": [{"labelName":"A-1","order": "1"}, {"labelName": "A-2","order": "2"}]
      }, {
          "labelName": "B",
          "order": "2",
          "childs": [{"labelName":"B-1","order": "1"}, {"labelName": "B-2","order": "2","childs":[{"labelName":"B-2-1","order": "1"}]}]
      }, {
          "labelName": "C",
          "order": "3",
          "childs": []
      }];

      // 実験１
      // _.forEach(labelArr, function(e) {
      //   console.log(e.labelName + ":" + e.order);
      //   _.forEach(e.childs,function(e2){
      //     console.log("_" + e2.labelName);
      //
      //   })
      // });

      //
      // とりあえず三階層表示
      var totalIndex = 0;
     _.forEach(labelArr, function(e) {
       totalIndex++;
       console.log("" + totalIndex + "|" + e.labelName + ":" + e.order);
       _.forEach(e.childs,function(e2){
         totalIndex++;
         console.log("" + totalIndex + "|" + "_" + e2.labelName + ":" + e2.order);
         _.forEach(e2.childs,function(e3){
           totalIndex++;
           console.log("" + totalIndex + "|" + "__" + e3.labelName + ":" + e3.order);

         })
       })
     });




  }

}
