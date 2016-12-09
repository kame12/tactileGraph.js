var file = document.querySelector('#getfile');
var txt = document.querySelector('#txt');

file.onchange = function (){   //ファイル選択時に呼ばれる
  var fileList = file.files;
    var reader = new FileReader();
    reader.readAsArrayBuffer(fileList[0]);//読み込み  Uncaught TypeError: Failed to execute
    reader.onload = function  () {
      filename =file.name;
      var array = new Uint8Array(reader.result);
      var uniArray = Encoding.convert(array, 'UNICODE','AUTO');//配列を「ユニコード」に変換
      var result = Encoding.codeToString(uniArray);
      
      txt.value = result;
      arr = createArray(result);
  
    }
};

txt.onchange = function (){ //テキストエリアの変更時に呼ばれる
 // drawGraph();
};

var arr=[];
var numArray = [];
var tag = [];
var max=[];
var lq=[];
var uq=[];
var min=[];
var med=[];

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

//関数作成


function makeLQ(numArray) {
//第1四分位数
  function compare(a,b) {
      return a-b;
  }	
  var mlq ="initial";
  numArray = numArray.sort(compare);  //昇順

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
  console.log(mlq);
  return mlq;
}

function makeUQ(numArray) {
//第3四分位数
  function compare(a,b) {
      return a-b;
  }	
  var uq ="initial";
  numArray = numArray.reverse(compare);  //降順

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

function makeMed(numArray) {
// 中央値
  function compare(a,b) {
      return a-b;
  }	
  var med ="initial";
  numArray = numArray.sort(compare);  //昇順
  
  console.log(numArray);
  if(numArray.length % 2 === 0) {
    var n2 = (numArray.length / 2);
    var n3 = (numArray.length / 2) - 1;
       med = (numArray[n2] + numArray[n3]) / 2;
  }
  else if(numArray.length % 2 !== 0) {
    var n1 = Math.floor(numArray.length / 2);
    //console.log(n1);
    med = numArray[n1];

  }
//  console.log(med);
  return med;
}

var tg = tactileGraphic();
tg.setCanvas('a'); // HTML　Canvas読み込み


function drawGraph(){//////////////ここから描画開始//////////////

  tg.clear;//既に書いてある内容をクリア
  arr = createArray(txt.value);  // テキストエリアの中身
  console.log(arr);
  numArray = createnumArray(arr); 
  console.log(numArray.length);
  for(var i = 0; i<numArray.length; i++) {
      console.log(numArray[i]);
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
console.log(max);
console.log(min);
console.log(lq);
console.log(uq);
console.log(med);

///////////////////////////以下にグラフの描画//////////////////////////////////

tg.drawLine(100, 300, 100, 500);   //縦軸//
tg.drawLine(100, 300, 500, 300);   //横軸//




///////////////////////////////////////////////////////////////////////
}
      ////////////////ダウンロード用の設定////////
var filename = "Graph";

var edl = document.querySelector('#edl');
//var png = document.querySelector('#png');
var esa = document.querySelector('#esa');

edl.onclick = function() {
  var blob = new Blob([ graph.loadEdl() ], { "type" : "text/plain" });
  if (window.navigator.msSaveBlob) { 
    window.navigator.msSaveBlob(blob, filename + ".edl"); 
  } else {
    edl.download =  filename + ".edl";  //ダウンロードするファイル名を設定
    edl.href = window.URL.createObjectURL(blob);
  }
}

esa.onclick = function(){
  imgURL = graph.map2esa();
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


window.onload = function(){
  drawGraph();
}