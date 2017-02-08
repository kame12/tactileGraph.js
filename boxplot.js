var file = document.querySelector('#getfile'); //htmlの「ファイルを開く」のIDを設定
var txt = document.querySelector('#txt');      //htmlのテキストエリアのIDを設定
var tg = tactileGraphic(); // tactileGraph.jsの設定
tg.setAdjust(true);
var cp = capsule('b');
tg.setCanvas('a');         // HTMLのCanvasのIDを設定
var arr=[];        //初期配列
var numArray = []; //数値のみの配列
var tag = []; //名前
var max=[];   //最大値
var lq=[];    //第1四分位
var uq=[];    //第3四分位
var min=[];   //最小値
var med=[];   //中央値

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////

function createArray(csvData) { ///CSVテキストから配列を作成
  var tempArray = csvData.split("\n");
  var csvArray = new Array();
  for(var i = 0; i < tempArray.length; i++){
    csvArray[i] = tempArray[i].split(",");
  }
  return csvArray;
}

function createnumArray(arr) { ///CSVテキストから配列を作成
  var narr=[];
  for(var i=0; i<arr.length; i++) {
    var nam = arr[i].shift();
    for(var j = 0; j<arr[i].length; j++){
      arr[i][j] = parseInt(arr[i][j]);
    }
    narr.push(arr[i]);
    tag.push(nam);
  }
  return narr;
}

      /////関数作成////

function makeLQ(numArray) {   ///第1四分位数
  function compare(a,b) {
    return a-b;
  }	
  var mlq ="initial";
  numArray = numArray.sort(compare);  //昇順

 if(numArray.length === 1) {
   return numArray[0];
 }

 if(numArray.length === 2) {
   var max = numArray[1];
   var min = numArray[0];
   var med = (numArray[0] + numArray[1]) / 2;
 }


 if(numArray.length === 3) {
   var max = numArray[2];
   var med = numArray[1];
   var min = numArray[0];
 }

 if(numArray.length % 2 === 0) {
   if((numArray.length/2) % 2 === 0) {
     var num1 = (numArray.length / 4);
     var num2 = (numArray.length / 4) - 1;
     mlq = (numArray[num1] + numArray[num2]) / 2;
}
   else if(numArray.length/2 % 2 !== 0) {
     var num3 = Math.floor(numArray.length / 4);
     mlq = numArray[num3];
  }
 }
 else if(numArray.length % 2 !== 0) {
 if(Math.floor(numArray.length/ 2) % 2 === 0) {
     var num4 = Math.floor(numArray.length / 4);
     var num5 = Math.floor(numArray.length / 4) - 1;
     mlq = (numArray[num4] + numArray[num5]) / 2;
   } else if(Math.floor(numArray.length / 2) % 2 !== 0) {
  var num6 = Math.floor(numArray.length / 4);
     mlq = numArray[num6];
   }
 }
  //console.log(mlq);
  return mlq;
}

function makeUQ(numArray) {   ///第3四分位数
  function compare(a,b) {
    return a-b;
  }
  var uq ="initial";
  numArray = numArray.reverse(compare);  //降順

   if(numArray.length === 1) {
   return numArray[0];
 }

 if(numArray.length === 2) {
   var max = numArray[1];
   var min = numArray[0];
   var med = (numArray[0] + numArray[1]) / 2;
 }

 if(numArray.length === 3) {
   var max = numArray[2];
   var med = numArray[1];
   var min = numArray[0];
   console.log("b");
 }
  if(numArray.length % 2 === 0) {
    if((numArray.length/2) % 2 === 0) {
      var num1 = (numArray.length / 4);
      var num2 = (numArray.length / 4) - 1;
      uq = (numArray[num1] + numArray[num2]) / 2;
    } else if(numArray.length/2 % 2 !== 0) {
      var num3 = Math.floor(numArray.length / 4);
      uq = numArray[num3];
    }
  } else if(numArray.length % 2 !== 0) {
    if(Math.floor(numArray.length/ 2) % 2 === 0) {
      var num4 = Math.floor(numArray.length / 4);
      var num5 = Math.floor(numArray.length / 4) - 1;
      uq = (numArray[num4] + numArray[num5]) / 2;
    } else if(Math.floor(numArray.length / 2) % 2 !== 0) {
       var num6 = Math.floor(numArray.length / 4);
      uq = numArray[num6];
    }
  }
  return uq;
}

function makeMed(numArray) {  /// 中央値
  function compare(a,b) {
    return a-b;
  }	
  var med ="initial";
  numArray = numArray.sort(compare);  //昇順
  if(numArray.length % 2 === 0) {
    var n2 = (numArray.length / 2);
    var n3 = (numArray.length / 2) - 1;
    med = (numArray[n2] + numArray[n3]) / 2;
  }
  else if(numArray.length % 2 !== 0) {
    var n1 = Math.floor(numArray.length / 2);
    med = numArray[n1];
  }
  return med;
}

function drawGraph(){//////// ＊ここからが実行開始///////////////////////
  tg.clear(); //既に書いてある内容をクリア
  cp.clear();

  arr = createArray(txt.value);  //テキストエリアの中身
  numArray = createnumArray(arr); 
  max = [];
  min = [];
  lq = [];
  uq = [];
  med = [];
  for(var i = 0; i<numArray.length; i++) { //各要素の配列を作成
      //console.log(numArray[i]);
      var ma = Math.max.apply(null,numArray[i]);
      max.push(ma);
      var mi = Math.min.apply(null,numArray[i]);
      min.push(mi);
       l= makeLQ(numArray[i]);
      lq.push(l);  
       u = makeUQ(numArray[i]);
      uq.push(u);
      me = makeMed(numArray[i]);
      med.push(me);
  }

/////////////////////////// 以下にグラフの描画処理///////////////////////////////
/*tg.drawBraiile("boxplot",10,5); */
tg.drawLine(100, 30, 100, 630);   //縦軸//
tg.drawLine(100, 600, 600, 600);   //横軸//
tg.drawLine(85, 600, 100, 600);   //横軸//

var len = numArray.length;
var top = 70;	
var bottom = 600;
var h = bottom - top;
var MAX = Math.max.apply(null, max);

var hoge = tg.drawBraille(filename,0,0);
var x = 150;
var w = (599-x)/len;
var s = w*0.4; //箱ヒゲの間隔
var DS = 6; //点間隔
var GS = 7; //グリッド線の間隔

tg.setDot(1);
for(var i=0; i < len; i++) {
    var y1= bottom-h*max[i]/MAX;
    var y2 = bottom-h*min[i]/MAX;
    var y3 = bottom-h*uq[i]/MAX;
    var y4 = bottom-h*lq[i]/MAX;
    var y5 = bottom-h*med[i]/MAX;
    if(y1 < y5-DS){
      tg.drawLine(w*i+x, y1, w*(i+1)-s+x, y1);//最大値
    }
    if(y2 > y5+DS && y2 < bottom - DS){
      tg.drawLine(w*i+x, y2, w*(i+1)-s+x, y2);//最小値
    }
    if(y3 < y5-DS && y3 > y1 + DS){
      tg.drawLine(w*i+x, y3, w*(i+1)-s+x, y3); //第1四分位
    }
    if(y4 > y5-DS && y4 < y2 - DS){
      tg.drawLine(w*i+x, y4, w*(i+1)-s+x, y4); //第3四分位
    }
    if(y5 < bottom - DS){
      tg.drawLine(w*i+x, y5, w*(i+1)-s+x, y5); //中央値
    }
    if((y3-DS)-(y1+DS) > 6){
      tg.drawLine(w*i+(w-s)/2+x, y1+DS, w*i+(w-s)/2+x, y3-DS);//上部のヒゲの縦線
    }
    tg.drawLine(w*i+x, y3, w*i+x, y5);              //箱の左の第1四分位から中央値までの縦線
    tg.drawLine(w*(i+1)-s+x, y3, w*(i+1)-s+x, y5);  //箱の右の第1四分位から中央値までの縦線
    tg.drawLine(w*i+x, y5, w*i+x, y4);              //箱の左の中央値から第3四分位までの縦線
    tg.drawLine(w*(i+1)-s+x, y5, w*(i+1)-s+x, y4);  //箱の右の中央値から第3四分位までの縦線
    if((y2-DS)-(y4+DS) > 6){
      tg.drawLine(w*i+(w-s)/2+x, y4+DS, w*i+(w-s)/2+x, y2-DS);//下部のヒゲの縦線
    }
    tg.drawLine(w*i+(w-s)/2+x, 605, w*i+(w-s)/2+x, 617); //グラフ下のポイント線
    tg.drawBraille(tag[i], w*i+(w-s)/2+x-10, 630);  //要素の名称
}

var scale = 0;  //グラフ目盛
if(MAX < 1)scale=1;
if(1 <= MAX && MAX < 5)scale=5;
if(5 <= MAX && MAX < 10)scale=10;
if(10 <= MAX)scale=10+5*(Math.floor((MAX-10)/5)+1);

tg.drawLine(85,40,100-DS,40);
tg.drawLine(85,320,100-DS,320);
tg.drawBraille(scale, 30, 40);
tg.drawBraille(Math.floor(scale/2), 30, 320);
tg.setDot(0);

var j=0;
var flag=true;

var gy = 410;///////////////グリッドの高さ

for(var i=106; i<600; i+=GS) {
  var y1= bottom-h*max[j]/MAX;
  var y2 = bottom-h*min[j]/MAX;
  var y3 = bottom-h*uq[j]/MAX;
  var y4 = bottom-h*lq[j]/MAX;
  var y5 = bottom-h*med[j]/MAX;

  if(w*j+x-GS < i) {
    if(w*(j+1)-s+x+GS < i){
      if(flag){
        j++; flag = false;
      }
      tg.drawDot(i,gy);
    }else{
        flag = true;
      //5つの値による判定
      if(gy < y1- GS || gy > y2 + GS){ //最大値以上、最低値以下なら点を描画
        tg.drawDot(i,gy);
      }

      if((gy > y1 + GS && gy < y3 - GS) || (gy > y4 + GS && gy < y2 - GS)){ //ヒゲ部分
        if(i < w*j+(w-s)/2+x-GS || i > w*j+(w-s)/2+x+GS ){
          tg.drawDot(i,gy);
        }
      }
    }
  }else{
    tg.drawDot(i,gy);
  }
}
/////////////////////////// 以下に立体コピーの描画処理///////////////////////////////
/*tg.drawBraiile("boxplot",10,5); */
cp.drawLine(100, 30, 100, 630);   //縦軸//
cp.drawLine(85, 600, 600, 600);   //横軸//

var len = numArray.length;
var top = 70;
var bottom = 600;
var h = bottom - top;
var MAX = Math.max.apply(null, max);

var hoge = cp.drawBraille(filename,0,0);
var x = 150;
var w = (599-x)/len;
var s = w*0.3;
DS = 0; //点間隔

cp.setDot(1);
for(var i=0; i < len; i++) {
    var y1= bottom-h*max[i]/MAX;
    var y2 = bottom-h*min[i]/MAX;
    var y3 = bottom-h*uq[i]/MAX;
    var y4 = bottom-h*lq[i]/MAX;
    var y5 = bottom-h*med[i]/MAX;
    if(y1 < y5-DS){
      cp.drawLine(w*i+x, y1, w*(i+1)-s+x, y1);//最大値
    }
    if(y2 > y5+DS && y2 < bottom - DS){
      cp.drawLine(w*i+x, y2, w*(i+1)-s+x, y2);//最小値
    }
    if(y3 < y5-DS && y3 > y1 + DS){
      cp.drawLine(w*i+x, y3, w*(i+1)-s+x, y3); //第1四分位
    }
    if(y4 > y5-DS && y4 < y2 - DS){
      cp.drawLine(w*i+x, y4, w*(i+1)-s+x, y4); //第3四分位
    }
    if(y5 < bottom - DS){
      cp.drawLine(w*i+x, y5, w*(i+1)-s+x, y5); //中央値
    }
    if((y3-DS)-(y1+DS) > 6){
      cp.drawLine(w*i+(w-s)/2+x, y1+DS, w*i+(w-s)/2+x, y3-DS);//上部のヒゲの縦線
    }
    cp.drawLine(w*i+x, y3, w*i+x, y5);              //箱の左の第1四分位から中央値までの縦線
    cp.drawLine(w*(i+1)-s+x, y3, w*(i+1)-s+x, y5);  //箱の右の第1四分位から中央値までの縦線
    cp.drawLine(w*i+x, y5, w*i+x, y4);              //箱の左の中央値から第3四分位までの縦線
    cp.drawLine(w*(i+1)-s+x, y5, w*(i+1)-s+x, y4);  //箱の右の中央値から第3四分位までの縦線
    if((y2-DS)-(y4+DS) > 6){
      cp.drawLine(w*i+(w-s)/2+x, y4+DS, w*i+(w-s)/2+x, y2-DS);//下部のヒゲの縦線
    }
    cp.drawLine(w*i+(w-s)/2+x, 600, w*i+(w-s)/2+x, 620); //グラフ下のポイント線
    cp.drawBraille(tag[i], w*i+(w-s)/2+x-10, 630);  //要素の名称
}

var scale = 0;  //グラフ目盛
if(MAX < 1)scale=1;
if(1 <= MAX && MAX < 5)scale=5;
if(5 <= MAX && MAX < 10)scale=10;
if(10 <= MAX)scale=10+5*(Math.floor((MAX-10)/5)+1);

cp.drawLine(85,40,100-DS,40);
cp.drawLine(85,320,100-DS,320);
cp.drawBraille(scale, 30, 40);
cp.drawBraille(Math.floor(scale/2), 30, 320);

cp.setDot(0);

var j=0;
var flag=true;

var gy = 410;///////////////グリッドの高さ

for(var i=106; i<600; i+=GS) {
  var y1= bottom-h*max[j]/MAX;
  var y2 = bottom-h*min[j]/MAX;
  var y3 = bottom-h*uq[j]/MAX;
  var y4 = bottom-h*lq[j]/MAX;
  var y5 = bottom-h*med[j]/MAX;

  if(w*j+x-GS < i) {
    if(w*(j+1)-s+x+GS < i){
      if(flag){
        j++; flag = false;
      }
      cp.drawDot(i,gy);
    }else{
        flag = true;
      //5つの値による判定
      if(gy < y1- GS || gy > y2 + GS){ //最大値以上、最低値以下なら点を描画
        cp.drawDot(i,gy);
      }

      if((gy > y1 + GS && gy < y3 - GS) || (gy > y4 + GS && gy < y2 - GS)){ //ヒゲ部分
        if(i < w*j+(w-s)/2+x-GS || i > w*j+(w-s)/2+x+GS ){
          cp.drawDot(i,gy);
        }
      }
    }
  }else{
    cp.drawDot(i,gy);
  }
}
//////////////////////////////// ここまで ///////////////////////////////////////
}

/////////////////////////////////////////////////
//////////////以下、ダウンロード用の設定////////
var filename = "box plot";
var edl = document.querySelector('#edl');
var esa = document.querySelector('#esa');
var capsule = document.querySelector('#capsule');

edl.onclick = function() {
  var blob = new Blob([ tg.loadEdl() ], { "type" : "text/plain" });
  if (window.navigator.msSaveBlob) { 
    window.navigator.msSaveBlob(blob, filename + ".edl"); 
  } else {
    edl.download =  filename + ".edl";  //ダウンロードするファイル名を設定
    edl.href = window.URL.createObjectURL(blob);
  }
}

esa.onclick = function(){
  imgURL = tg.map2esa();
  var bin = atob(imgURL.split(',')[1]);
  var buffer = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  var blob = new Blob([buffer.buffer], {type: 'image/png'});
  
  if (window.navigator.msSaveBlob) {
  window.navigator.msSaveBlob(blob, filename + '.png'); 
  } else {
    esa.download =  filename + ".png";
    esa.href = window.URL.createObjectURL(blob);
  }
}

capsule.onclick = function(){
  imgURL = cp.loadImage();
  var bin = atob(imgURL.split(',')[1]);
  var buffer = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) {
    buffer[i] = bin.charCodeAt(i);
  }
  var blob = new Blob([buffer.buffer], {type: 'image/png'});
  if (window.navigator.msSaveBlob) {
  window.navigator.msSaveBlob(blob, filename + '.png'); 
  } else {
    capsule.download =  filename + ".png";
    capsule.href = window.URL.createObjectURL(blob);
  }
}

//////////////////////////////////////////////////////////////////////////////////////
////////////////////////// ＊実行開始のタイミングを設定する命令文 ////////////////////

file.onchange = function (){   //ファイル選択時に呼ばれる
  var fileList = file.files;
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileList[0]);//読み込み  Uncaught TypeError: Failed to execute
    reader.onload = function  () {
      filename =file.name;
      var array = new Uint8Array(reader.result);
      var uniArray = Encoding.convert(array, 'UNICODE','AUTO');//配列を「ユニコード」に変換
      var result = Encoding.codeToString(uniArray);  
      txt.value = result; //読み込んだファイルの文字列をテキストエリアに書き込む
      drawGraph();         //＊ファイルを読み込み終わったら実行
    }
};

txt.onchange = function (){ //＊テキストエリアの変更時に実行
  drawGraph();
};

window.onload = function(){ //＊ブラウザのウィンドウが読み込み終わったときに実行
  drawGraph();
}
