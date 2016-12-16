var file = document.querySelector('#getfile'); //htmlの「ファイルを開く」のIDを設定
var txt = document.querySelector('#txt');      //htmlのテキストエリアのIDを設定
var tg = tactileGraphic(); // tactileGraph.jsの設定
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
console.log("aa");
   return numArray[0];
 
 }
  
 if(numArray.length === 2) {
   var max = numArray[1];
   var min = numArray[0];
   var med = (numArray[0] + numArray[1]) / 2;
 console.log("a");
 }
  
  
 if(numArray.length === 3) {   
   var max = numArray[2];
   var med = numArray[1];
   var min = numArray[0];
   console.log("b");
 }
 
 if(numArray.length % 2 === 0) {
console.log("a1");
   if((numArray.length/2) % 2 === 0) {
     var num1 = (numArray.length / 4);
     var num2 = (numArray.length / 4) - 1;
     mlq = (numArray[num1] + numArray[num2]) / 2;
console.log("2a");   
}
   else if(numArray.length/2 % 2 !== 0) {
     var num3 = Math.floor(numArray.length / 4);
     mlq = numArray[num3];
console.log("a3"); 
  }
 }
 else if(numArray.length % 2 !== 0) {
console.log("a4");  
 if(Math.floor(numArray.length/ 2) % 2 === 0) {
     var num4 = Math.floor(numArray.length / 4);
     var num5 = Math.floor(numArray.length / 4) - 1;
     mlq = (numArray[num4] + numArray[num5]) / 2;
     console.log("c");
console.log("num4 is" + num4);
console.log("num5 is" + num5);
   } else if(Math.floor(numArray.length / 2) % 2 !== 0) {
console.log("a5");   
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
console.log("aa");
   return numArray[0];
 
 }
  
 if(numArray.length === 2) {
   var max = numArray[1];
   var min = numArray[0];
   var med = (numArray[0] + numArray[1]) / 2;
 console.log("a");
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
  tg.clear; //既に書いてある内容をクリア
  arr = createArray(txt.value);  //テキストエリアの中身
  numArray = createnumArray(arr); 
  max = min = lq = uq = med = [];
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
console.log(max);
console.log(min);
console.log(lq);
console.log(uq);
console.log(med);

/////////////////////////// 以下にグラフの描画処理///////////////////////////////

tg.drawLine(100, 300, 100, 500);   //縦軸//
tg.drawLine(100, 300, 500, 300);   //横軸//













//////////////////////////////// ここまで ///////////////////////////////////////
}

/////////////////////////////////////////////////
//////////////以下、ダウンロード用の設定////////
var filename = "Graph";
var edl = document.querySelector('#edl');
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
      drawgraph();         //＊ファイルを読み込み終わったら実行
    }
};

txt.onchange = function (){ //＊テキストエリアの変更時に実行
  drawGraph();
};

window.onload = function(){ //＊ブラウザのウィンドウが読み込み終わったときに実行
  drawGraph();
}
