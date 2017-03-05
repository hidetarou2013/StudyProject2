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

     // 3/3に設計したテーブル定義では、以下のようなデータが飛んでくるはず。
     // 階層順位のカラムには、フラグを入れるべきか、その階層における順位を入れるべきか悩む。
     // totalOrder は移動や挿入の際にしょっちゅう入れ替わる値となる。→そもそもこれを保持しないといけないのか？
     let labelArr2 = [
        {"parentLabelCode": "00000000","labelCode": "00000001","labelName": "A","totalOrder": "1","lev1": "1","lev2": "0","lev3": "0","lev4": "0","lev5": "0"}
       ,{"parentLabelCode": "00000001","labelCode": "00000002","labelName": "A-1","totalOrder": "2","lev1": "0","lev2": "1","lev3": "0","lev4": "0","lev5": "0"}
       ,{"parentLabelCode": "00000001","labelCode": "00000003","labelName": "A-2","totalOrder": "3","lev1": "0","lev2": "2","lev3": "0","lev4": "0","lev5": "0"}
       ,{"parentLabelCode": "00000000","labelCode": "00000004","labelName": "B","totalOrder": "4","lev1": "2","lev2": "0","lev3": "0","lev4": "0","lev5": "0"}
       ,{"parentLabelCode": "00000004","labelCode": "00000005","labelName": "B-1","totalOrder": "5","lev1": "0","lev2": "1","lev3": "0","lev4": "0","lev5": "0"}
       ,{"parentLabelCode": "00000004","labelCode": "00000006","labelName": "B-2","totalOrder": "6","lev1": "0","lev2": "2","lev3": "0","lev4": "0","lev5": "0"}
       ,{"parentLabelCode": "00000006","labelCode": "00000007","labelName": "B-2-1","totalOrder": "7","lev1": "0","lev2": "0","lev3": "1","lev4": "0","lev5": "0"}
       ,{"parentLabelCode": "00000000","labelCode": "00000008","labelName": "C","totalOrder": "8","lev1": "3","lev2": "0","lev3": "0","lev4": "0","lev5": "0"}
       ];

    // 第一階層だけ抽出
    var totalIndex2 = 0;
    var lev1List = _.filter(labelArr2,["parentLabelCode","00000000"]);
    _.forEach(lev1List, function(e) {
     totalIndex2++;
     console.log("" + totalIndex2 + "|" + e.labelName + ":" + e.totalOrder);
    });

    // 第一回層以外だけ抽出
    totalIndex2 = 0;
    var lev2List = _.differenceBy(labelArr2,[{"parentLabelCode":"00000000"}],"parentLabelCode");
    _.forEach(lev2List, function(e) {
      totalIndex2++;
      console.log("" + totalIndex2 + "|" + e.labelName + ":" + e.totalOrder);

    });

    // 第二回層だけ抽出
    totalIndex2 = 0;
    var lev2List2 = _.differenceBy(labelArr2,[{"lev2":"0"}],"lev2");
    _.forEach(lev2List2, function(e) {
      totalIndex2++;
      console.log("" + totalIndex2 + "|" + e.labelName + ":" + e.totalOrder);

    });

    // 第三回層だけ抽出
    totalIndex2 = 0;
    var lev3List = _.differenceBy(labelArr2,[{"lev3":"0"}],"lev3");
    _.forEach(lev3List, function(e) {
      totalIndex2++;
      console.log("" + totalIndex2 + "|" + e.labelName + ":" + e.totalOrder);

    });

  }

}
