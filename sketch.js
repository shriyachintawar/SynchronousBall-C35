var ball;
var db,position,ballPos;

function setup(){
    createCanvas(500,500);
    db = firebase.database();
    ball = createSprite(250,250,10,10);
    ballPos = db.ref('ball/position');
    ballPos.on("value",readPosition,showError);
    ball.shapeColor = "red";
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    db.ref('ball/position').set({
        x: ball.x + x,
        y:ball.y + y
    })
    
}

function readPosition(data){
position = data.val();
ball.x = position.x;
ball.y = position.y;
}

function showError(){
    console.log("Error occurred");
}
