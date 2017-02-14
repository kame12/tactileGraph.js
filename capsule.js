var capsule = function(id){
  var RATIO = 1654 / 599;
  var cvs = document.getElementById(id);
  var cx = cvs.getContext('2d');
  var style = 'bold 53px "Ikarashi Braille"';
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
    cx.fillStyle = "blue";
    cx.font= 'bold 53px "メイリオ"';
    cx.fillText( str, x*RATIO, y*RATIO + 40);
    cx.font= style;
    cx.fillStyle = "black";
    str=tg.convertText(str);
    str=tg.convertBrailleMath(str);
    cx.fillText( str, x*RATIO, y*RATIO);
  },

  drawLine:function(x1, y1, x2, y2) {
    cx.beginPath();
    cx.moveTo(x1*RATIO, y1*RATIO);
    cx.lineTo(x2*RATIO, y2*RATIO);
    cx.stroke();
  },

  drawDot:function(x, y) {
    cx.beginPath();
    cx.arc(x*RATIO, y*RATIO, 2, 0, Math.PI*2, false);
    cx.fill();
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

  loadImage:function(){
    return cvs.toDataURL();
  }
 }
}