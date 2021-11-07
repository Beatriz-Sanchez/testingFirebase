var bola, bola2;
var database;
var position;
var positionJJ;
var imageBia, imageJJ;
var edges;
var name1 = window.prompt("Enter your name: ");
var r,g,b;

function preload(){
  imageBia = loadImage("bia.jpg");
  imageJJ = loadImage("jj.jpg");
}

function setup() {
  database = firebase.database();
  createCanvas(450, 450);
  bola = createSprite(200, 200, 20, 20);
  bola.shapeColor = "hotpink";
  bola2 = createSprite(100, 100, 20, 20);
  bola2.shapeColor = "lightskyblue";
  bola.addImage(imageBia);
  bola.scale = 0.15;
  bola2.addImage(imageJJ);
  bola2.scale=0.15;
  
  
  var bolapos = database.ref('bolaBia/position');
  bolapos.on("value", lerPos, mostrarErro);
  

  var bolaposJJ = database.ref('bolaJJ/position');
  bolaposJJ.on("value", lerPosJJ, mostrarErro);
  
  edges = createEdgeSprites();
}

function draw() {

  if(frameCount%20 === 0){
    r = Math.floor(Math.random() * 100);
    g = Math.floor(Math.random() * 100);
    b = Math.floor(Math.random() * 100);
  }
  background(r,g,b);

  if (position !== undefined)
  {
    drawSprites();
    if(name1.toUpperCase()=="BIA")
    {

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
    }
    if(name1.toUpperCase()=="JAISON")
    {
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
    }
    bola.bounceOff(edges);
    bola2.bounceOff(edges);
    bola.bounce(bola2);
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
