import { Component } from '@angular/core';
import { enableProdMode } from '@angular/core';
import * as _ from "lodash";
import * as Collections from 'typescript-collections';

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
      console.log('----------------');

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

     console.log('----------------');
     // 3/3に設計したテーブル定義では、以下のようなデータが飛んでくるはず。
     // 階層順位のカラムには、フラグを入れるべきか、その階層における順位を入れるべきか悩む。
     // totalOrder は移動や挿入の際にしょっちゅう入れ替わる値となる。→そもそもこれを保持しないといけないのか？
     // 受信データ：ダミー
     let labelArr3 = [
        {"companyCode": "AABBCC0000000001","parentLabelCode": "0000","labelCode": "0001","labelName": "A","labelDisplayOrder": "1","level1": "1","level2": "0","level3": "0","level4": "0","level5": "0","analizeFlag": "0","color": "#FF0000","logicalDeleteDiv": "0"}
       ,{"companyCode": "AABBCC0000000001","parentLabelCode": "0001","labelCode": "0002","labelName": "A-1","labelDisplayOrder": "2","level1": "0","level2": "1","level3": "0","level4": "0","level5": "0","analizeFlag": "0","color": "#FF0000","logicalDeleteDiv": "0"}
       ,{"companyCode": "AABBCC0000000001","parentLabelCode": "0001","labelCode": "0003","labelName": "A-2","labelDisplayOrder": "3","level1": "0","level2": "2","level3": "0","level4": "0","level5": "0","analizeFlag": "0","color": "#FF0000","logicalDeleteDiv": "0"}
       ,{"companyCode": "AABBCC0000000001","parentLabelCode": "0000","labelCode": "0004","labelName": "B","labelDisplayOrder": "4","level1": "2","level2": "0","level3": "0","level4": "0","level5": "0","analizeFlag": "0","color": "#00FF00","logicalDeleteDiv": "0"}
       ,{"companyCode": "AABBCC0000000001","parentLabelCode": "0004","labelCode": "0005","labelName": "B-1","labelDisplayOrder": "5","level1": "0","level2": "1","level3": "0","level4": "0","level5": "0","analizeFlag": "0","color": "#FF0000","logicalDeleteDiv": "0"}
       ,{"companyCode": "AABBCC0000000001","parentLabelCode": "0004","labelCode": "0006","labelName": "B-2","labelDisplayOrder": "6","level1": "0","level2": "2","level3": "0","level4": "0","level5": "0","analizeFlag": "0","color": "#FF0000","logicalDeleteDiv": "0"}
       ,{"companyCode": "AABBCC0000000001","parentLabelCode": "0006","labelCode": "0007","labelName": "B-2-1","labelDisplayOrder": "7","level1": "0","level2": "0","level3": "1","level4": "0","level5": "0","analizeFlag": "0","color": "#FF0000","logicalDeleteDiv": "0"}
       ,{"companyCode": "AABBCC0000000001","parentLabelCode": "0000","labelCode": "0008","labelName": "C","labelDisplayOrder": "8","level1": "3","level2": "0","level3": "0","level4": "0","level5": "0","analizeFlag": "0","color": "#0000FF","logicalDeleteDiv": "0"}
     ];

     // 各階層ごとのListデータ
     let lev1List = _.filter(labelArr3,["parentLabelCode","0000"]);
     let lev2List = _.differenceBy(labelArr3,[{"level2":"0"}],"level2");
     let lev3List = _.differenceBy(labelArr3,[{"level3":"0"}],"level3");
     let lev4List = _.differenceBy(labelArr3,[{"level4":"0"}],"level4");
     let lev5List = _.differenceBy(labelArr3,[{"level5":"0"}],"level5");

     let totalIndex1 = 0;
     let totalList :Collections.LinkedList<MLabelModel>  = new Collections.LinkedList<MLabelModel>();

     // 第一階層
     _.forEach(lev1List, function(e) {
       totalIndex1++;
       console.log("" + totalIndex1 + "|" + e.labelName + ":" + e.labelCode);
       // 第一階層の要素オブジェクトを作成する。
       let myLabel = new MLabel (
         e.companyCode
         ,e.parentLabelCode
         ,e.labelCode
         ,e.labelName
         ,Number(e.labelDisplayOrder)
         ,Number(e.level1)
         ,Number(e.level2)
         ,Number(e.level3)
         ,Number(e.level4)
         ,Number(e.level5)
         ,Number(e.analizeFlag)
         ,e.color
         ,Number(e.logicalDeleteDiv)
       );
       let list1  = new Collections.LinkedList<MLabel>();
       let model_lev1 :MLabelModel = new MLabelModel(myLabel,list1);
       totalList.add(model_lev1);

       // 第二階層
       _.forEach(lev2List, function(e2) {
         if(e2.parentLabelCode === e.labelCode){
           totalIndex1++;
           console.log("" + totalIndex1 + "| " + e2.labelName + ":" + e2.labelCode);
           // 第二階層の要素オブジェクトを作成する。
           let myLabel2 = new MLabel (
             e2.companyCode
             ,e2.parentLabelCode
             ,e2.labelCode
             ,e2.labelName
             ,Number(e2.labelDisplayOrder)
             ,Number(e2.level1)
             ,Number(e2.level2)
             ,Number(e2.level3)
             ,Number(e2.level4)
             ,Number(e2.level5)
             ,Number(e2.analizeFlag)
             ,e.color
             ,Number(e2.logicalDeleteDiv)
           );
           let list2  = new Collections.LinkedList<MLabel>();
           let model_lev2 :MLabelModel = new MLabelModel(myLabel2,list2);
           totalList.add(model_lev2);

           // 第三階層
            _.forEach(lev3List, function(e3) {
             if(e3.parentLabelCode === e2.labelCode){
               totalIndex1++;
               console.log("" + totalIndex1 + "|  " + e3.labelName + ":" + e3.labelCode);
               // 第三階層の要素オブジェクトを作成する
               let myLabel3 = new MLabel (
                  e3.companyCode
                  ,e3.parentLabelCode
                  ,e3.labelCode
                  ,e3.labelName
                  ,Number(e3.labelDisplayOrder)
                  ,Number(e3.level1)
                  ,Number(e3.level2)
                  ,Number(e3.level3)
                  ,Number(e3.level4)
                  ,Number(e3.level5)
                  ,Number(e3.analizeFlag)
                  ,e.color
                  ,Number(e3.logicalDeleteDiv)
                );
                let list3  = new Collections.LinkedList<MLabel>();
                let model_lev3 :MLabelModel = new MLabelModel(myLabel3,list3);
                totalList.add(model_lev3);
               // 第四階層
               _.forEach(lev4List, function(e4) {
                 if(e4.parentLabelCode === e3.labelCode){
                   totalIndex1++;
                   console.log("" + totalIndex1 + "|   " + e4.labelName + ":" + e4.labelCode);
                   // 第四階層の要素オブジェクトを作成する
                    let myLabel4 = new MLabel (
                      e4.companyCode
                      ,e4.parentLabelCode
                      ,e4.labelCode
                      ,e4.labelName
                      ,Number(e4.labelDisplayOrder)
                      ,Number(e4.level1)
                      ,Number(e4.level2)
                      ,Number(e4.level3)
                      ,Number(e4.level4)
                      ,Number(e4.level5)
                      ,Number(e4.analizeFlag)
                      ,e.color
                      ,Number(e4.logicalDeleteDiv)
                    );
                    let list4  = new Collections.LinkedList<MLabel>();
                    let model_lev4 :MLabelModel = new MLabelModel(myLabel4,list4);
                    totalList.add(model_lev4);
                   // 第五階層
                   _.forEach(lev5List, function(e5) {
                     if(e5.parentLabelCode === e4.labelCode){
                      totalIndex1++;
                        console.log("" + totalIndex1 + "|    " + e5.labelName + ":" + e5.labelCode);
                        // 第五階層の要素オブジェクトを作成する
                        let myLabel5 = new MLabel (
                          e5.companyCode
                          ,e5.parentLabelCode
                          ,e5.labelCode
                          ,e5.labelName
                          ,Number(e5.labelDisplayOrder)
                          ,Number(e5.level1)
                          ,Number(e5.level2)
                          ,Number(e5.level3)
                          ,Number(e5.level4)
                          ,Number(e5.level5)
                          ,Number(e5.analizeFlag)
                          ,e.color
                          ,Number(e5.logicalDeleteDiv)
                        );
                        let list5  = new Collections.LinkedList<MLabel>();
                        let model_lev5 :MLabelModel = new MLabelModel(myLabel5,list5);
                        totalList.add(model_lev5);
                     }
                   });
                 }
               });
             }
           });
         }
      });
     });

    //
    console.log('----------------');
    console.log(new MLabel("AABBCC0000000001", "0000", "0009","D",9,4,0,0,0,0,0,"#FFFFFF",0).toString());
    //
    // totalIndex = 0;
    // _.forEach(totalList, function(e :MLabelModel) {
    //   totalIndex++;
    //   let tmp1 :MLabel = e.myLabel;
    //   console.log("" + totalIndex + "|" + tmp1.labelName);
    //
    // });

  }



}

// MLabel
class MLabel {
    constructor(
        public companyCode: string
      , public parentLabelCode: string
      , public labelCode: string
      , public labelName: string
      , public labelDisplayOrder: number
      , public level1: number
      , public level2: number
      , public level3: number
      , public level4: number
      , public level5: number
      , public analizeFlag: number
      , public color: string
      , public logicalDeleteDiv: number) {
    }
    toString() {
      // Short hand. Adds each own property
      return Collections.util.makeString(this);
    }
  }

// MLabelModel
class MLabelModel {
  constructor(
      public myLabel: MLabel
    , public myLabelChildsList: Collections.LinkedList<MLabel>) {
  }
  toString() {
    // Short hand. Adds each own property
    return Collections.util.makeString(this);
  }
}
