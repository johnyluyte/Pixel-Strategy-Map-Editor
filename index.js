var map = {
  x : 10,
  y : 10,
  height : 130,
  width : 130,
  color : "#3FEA90"
};

/* 一樣要考慮多國語言怎麼做 */

/* Overview 那邊提供顏色 template 選擇 */

/* Ruler 的 [A-Za-z] 旁邊要括弧數字，方便玩家了解這個英文字是第幾格。eg: F(6) */

/* 
  目前最大只能到 20*20 ，如果要更大的話，提供一個選項 "I want to create a very big map" 
  開新連結 _blank，兩個 Frame，左邊選單 Frame fixed 視窗，右邊為有 scroll 的 100*100 canvas.
*/

// 用之前在 W3C 看過的，類似拼圖的方式，把各個 Object 都生成拼圖的模式，可以自由拖曳
// 這樣即使 Legend 過長，只要在 Canvas 內都可以讓使用者自由拖曳

// var canvas=document.getElementById('myCanvas');
// var ctx = canvas.getContext('2d');
// ctx.fillStyle = map.color;
// ctx.fillRect(map.x, map.y, map.width, map.height);


var BLOCK_TYPE_CANVAS = {
  length: 30,  /* Square's H and W*/
  margin: 6,  /* $length - $margin = Block's length */
  backgroundColor: "#ffffff",
  // borderColor:"#000000"
};

/* Fill Block Type 1~9 */
function fillBlockTypeCanvas(obj){
  // var ctx = $("#canvas_block_type_1").getContext('2d');
  var ctx = document.getElementById('canvas_block_type_1').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, 0, obj.length-obj.margin, obj.length-obj.margin);

  ctx = document.getElementById('canvas_block_type_2').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, 0, obj.length, obj.length-obj.margin);

  ctx = document.getElementById('canvas_block_type_3').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, 0, obj.length-obj.margin, obj.length-obj.margin);

  ctx = document.getElementById('canvas_block_type_4').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, 0, obj.length-obj.margin, obj.length);

  ctx = document.getElementById('canvas_block_type_5').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, 0, obj.length, obj.length);  

  ctx = document.getElementById('canvas_block_type_6').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, 0, obj.length-obj.margin, obj.length);

  ctx = document.getElementById('canvas_block_type_7').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, obj.margin, obj.length-obj.margin, obj.length-obj.margin);

  ctx = document.getElementById('canvas_block_type_8').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, obj.margin, obj.length, obj.length-obj.margin);

  ctx = document.getElementById('canvas_block_type_9').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, obj.margin, obj.length-obj.margin, obj.length-obj.margin);  

  /* b part */
  ctx = document.getElementById('canvas_block_type_2b').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, 0, obj.length-obj.margin*2, obj.length-obj.margin);
  ctx = document.getElementById('canvas_block_type_5b').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, 0, obj.length-obj.margin*2, obj.length);  
  ctx = document.getElementById('canvas_block_type_8b').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, obj.margin, obj.length-obj.margin*2, obj.length-obj.margin);
  
  /* c part */
  ctx = document.getElementById('canvas_block_type_4c').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, obj.margin, obj.length-obj.margin, obj.length-obj.margin*2);
  ctx = document.getElementById('canvas_block_type_5c').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, obj.margin, obj.length, obj.length-obj.margin*2);  
  ctx = document.getElementById('canvas_block_type_6c').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(0, obj.margin, obj.length-obj.margin, obj.length-obj.margin*2);

  /* d part*/
  ctx = document.getElementById('canvas_block_type_5d').getContext('2d');
  ctx.fillStyle = obj.backgroundColor;
  ctx.fillRect(obj.margin, obj.margin, obj.length-obj.margin*2, obj.length-obj.margin*2);  

  ctx = document.getElementById('canvas_block_type_auto').getContext('2d');
  // ctx.shadowBlur=30;
  // ctx.shadowColor="white";
  /* 字體要使用跟 bootstrap 一樣的字體!! */  
  ctx.font="1em Courier New";
  ctx.fillStyle = "white";
  ctx.fillText("Auto",8,20);
  ctx.fillStyle = "yellow";
  ctx.fillText("(z)",43,20);

  ctx = document.getElementById('canvas_block_type_delete').getContext('2d');
  ctx.font="1em Courier New";
  ctx.fillStyle = "white";
  ctx.fillText("Kill",8,20);  
  ctx.fillStyle = "yellow";
  ctx.fillText("(del)",43,20);  


  // console.log(obj.margin, 0, obj.length-obj.margin, obj.length-obj.margin);

}


function fillMapWithSquares(){
  var $map = $('#map');
  var column = 9;
  var row = 14;
  var content = "";

  content += "<table>";
  for(var i=1;i<=row;i++){
    content += "<tr>";
      for(var k=1;k<=column;k++){
        content += "<td><div class='square' id='square_";
        content = content + i + "_" + k;
        content += "'></div></td>"
      }
    content += "</tr>";
  }
  content += "</table>";

  $map.html(content);
}


SQUARE_ATTR = {
  margin : '0px',
  length : '30px',
  border : '1px solid black',
  defaultBackground : '#666666',

  onHoverBackground : '#108060',
  onClickedBackground : '#48f060',
}

$(function(){
  fillMapWithSquares();
  fillBlockTypeCanvas(BLOCK_TYPE_CANVAS);

  /* Set the default attribute of Squares */
  $(".square").css(
    {
      'margin' : SQUARE_ATTR.margin,
      'height' : SQUARE_ATTR.length,
      'width' : SQUARE_ATTR.length,
      'border' : SQUARE_ATTR.border,
      'background' : SQUARE_ATTR.defaultBackground
    }
  );

  $(".square")
    .on("mouseenter",function(){
      $(this).css('background', SQUARE_ATTR.onHoverBackground);
    })
    .on("mouseleave",function(){
      $(this).css('background', SQUARE_ATTR.defaultBackground);
    });


});

/*
  改放在 github pages?
*/
