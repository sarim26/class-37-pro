//Create variables here
var dog, happyDog, database,foodS, foodStock,dogimage,hdogimage,milk,milkimage
var feedpetButton,addfoodButton
var feed=20
var count=20
var time;gamestate,readstate;
var bedroomimage,gardenimage,washroomimage;
var sadimage;

function preload()
{
  //load images here
  dogimage= loadImage("images/dogImg.png")
  hdogimage= loadImage("images/dogImg1.png")
 bedroomimage = loadImage("images2/Bed Room.png") 
 gardenimage = loadImage("images2/Garden.png")
 washroomimage = loadImage("images2/Wash Room.png")
 sadimage=loadImage("sadDog.png")
}

function setup() {
  database=firebase.database();
	createCanvas(500, 500);
  dog=createSprite(350,400)
  dog.addImage(dogimage)
  dog.addImage(hdogimage)
  dog.scale=0.1
  
  feedpetButton= createButton("Feed the Pet")
  feedpetButton.position(100,150)





addfoodButton=createButton("Add more Food ")
addfoodButton.position(200,150)





milk =new Food()
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  textSize(15);

}


function draw() {  
background(46,139,87)
//bedroom()
readgameState()

milk.display()
lastfedtime()
feedpetButton.mousePressed(()=>{
  feed--
  database.ref('/').update({
    Food: feed
  })
  dog.addImage(hdogimage)
  dog.scale=0.1
  console.log(feed)

})
  
addfoodButton.mousePressed(()=>{
  if (feed<=0){
    feed=20
    database.ref('/').update({
      Food:feed
        })
        //text("new feed is"+feed,200,200)
        database.ref('/').update({
          fedTime:hour
        })
        
  }
})


if (gamestate!== "hungry"){
  feedpetButton.hide();
  addfoodButton.hide();
dog.remove()}
  else{
    feedpetButton.show();
  addfoodButton.show();
  dog.addImage(sadimage);
}


  drawSprites();
fill("white")
text("last fed time was: "+hour()+":00",200,200)
  //add styles here
  fill(0)


text("Food remaining : "+foodS,190,470);





}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
  console.log(foodS)
}


function lastfedtime(){
  var time=hour()
  console.log("last fed time is :"+time)
}
/*//Function to write values in DB
function writeStock(x){

  if(x<=0){
    x=0
  }
  else{x=x-1}
  database.ref('/').update({Food:x})
}*/

function readgameState(){
readstate =database.ref('gameState').on("value",function(data){
gamestate =data.val() ;

console.log(gamestate)
})

}

function update(state){
  database.ref('/').update({
    gameState:state
  })
}

function bedroom(){
  background(bedroomimage,550,500)
}

function garden(){
  background(gardenimage,550,500)
}

function washroom(){
  background(washroomimage,550,500)
}