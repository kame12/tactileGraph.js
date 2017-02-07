var capsule = function(id){
  var RATIO = 1654 / 599;
  var cvs = document.getElementById(id);
  var cx = cvs.getContext('2d');
  cx.font= 'bold 53px "Ikarashi Braille"';
  cx.lineWidth=3;
  cx.fillStyle = "white";
  cx.fillRect(0,0,1654,2339);
  cx.fillStyle = "black";
  cx.textBaseline = "top";

 return {
  clear: function(){
    cx.fillStyle = "white";
    cx.fillRect(0,0,1654,2339);
    cx.fillStyle = "black";
  },

  drawBraille:function(str, x, y, returnX){
    cx.fillText( str, x*RATIO, y*RATIO);
    
    cx.fillStyle = "blue";
    cx.font= 'bold 53px "メイリオ"';
    cx.fillText( str, x*RATIO, y*RATIO + 40);
    cx.font= 'bold 53px "Ikarashi Braille"';
    cx.fillStyle = "black";
  },

  drawLine:function(x1, y1, x2, y2) {
    cx.beginPath();
    cx.moveTo(x1*RATIO, y1*RATIO);
    cx.lineTo(x2*RATIO, y2*RATIO);
    cx.stroke();
  },

  drawDot:function(x, y) {
    cx.beginPath();
    cx.arc(x, y, 2, 0, Math.PI*2, false);
    cx.fill();
    console.log(x + y)
  },

  setDot:function(num){
    switch(num){
      case 0: cx.lineWidth=3;
              cx.setLineDash([5, 5]);break;
      case 1: cx.lineWidth=8;
              cx.setLineDash([0]);break;
      case 2: cx.lineWidth=12;
              cx.setLineDash([0]);break;
    }
  },

  loadImage(){
    return cvs.toDataURL();
  }
 }
}