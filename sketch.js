var bola, bola2;
var database;
var position;
var positionJJ;
var imageBia, imageJJ;
var edges;

function preload(){
  imageBia = loadImage("bia.jpg");
  imageJJ = loadImage("jj.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(400, 400);
  bola = createSprite(200, 200, 10, 10);
  bola.shapeColor = "hotpink";
  bola2 = createSprite(100, 100, 10, 10);
  bola2.shapeColor = "lightskyblue";
  bola.addImage(imageBia);
  bola.scale = 0.1;
  bola2.addImage(imageJJ);
  bola2.scale=0.1;
  
 var bolapos = database.ref('bolaBia/position');
  bolapos.on("value", lerPos, mostrarErro);
  

  var bolaposJJ = database.ref('bolaJJ/position');
  bolaposJJ.on("value", lerPosJJ, mostrarErro);
  
  edges = createEdgeSprites();
}

function draw() {
  background(0);

  if (position !== undefined){
    drawSprites();

    if (keyDown("up")){
      bola.y = bola.y -3;
      escreverPosBia(bola);
    }
    if (keyDown("down")){
      bola.y = bola.y +3;
      escreverPosBia(bola);
    }
    if (keyDown("left")){
      bola.x = bola.x -3;
      escreverPosBia(bola);
    }
    if (keyDown("right")){
      bola.x = bola.x +3;
      escreverPosBia(bola);
    }
    if (keyDown("w")){
      bola2.y = bola2.y -3;
      escreverJJ(bola2);
    }
    if (keyDown("s")){
      bola2.y = bola2.y +3;
      escreverJJ(bola2);
    }
    if (keyDown("a")){
      bola2.x = bola2.x -3;
      escreverJJ(bola2);
    }
    if (keyDown("d")){
      bola2.x = bola2.x +3;
      escreverJJ(bola2);
    }
    bola.bounceOff(edges);
    bola2.bounceOff(edges);
    bola.bounceOff(bola2);
  }
 
}
function escreverPosBia(sprite){
  database.ref('bolaBia/position').set({
    'x': sprite.x ,
    'y': sprite.y
  });
}
function lerPos(data){
  position = data.val();
  bola.x = position.x;
  bola.y = position.y;
}
function mostrarErro(){
  console.log("erro na conexão com a base de dados");
}
function escreverJJ(sprite){
  database.ref('bolaJJ/position').set({
    'x': sprite.x ,
    'y': sprite.y
  });
}
function lerPosJJ(data){
  positionJJ = data.val();
  bola2.x = positionJJ.x;
  bola2.y = positionJJ.y;
}
