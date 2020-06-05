function load_images(){
    //player,virus,gem
    enemy_image = new Image;
    enemy_image.src = "v2.png";
    
    player_img = new Image;
    player_img.src = "M7.png";
    
    gem_image = new Image;
    gem_image.src = "M6.png";

    heart_image = new Image;
    heart_image.src = "h2.png";
}


function init(){
    //define the objects that we will have in the game
    canvas = document.getElementById("mycanvas");
    console.log(canvas);
    W = 1500;
    H = 680;
    
    canvas.width = W;
    canvas.height = H;
    
    // create a context 
    pen = canvas.getContext('2d');
    console.log(pen);
    game_over = false;
    win = false;
    
    e1 = {
		x : 150,
		y : 50,
		w : 60,
		h : 60,
		speed : 20,
	};
	e2 = {
		x : 300,
		y : 150,
		w : 60,
		h : 60,
		speed : 30,
	};
	e3 = {
		x : 450,
		y : 120,
		w : 60,
		h : 60,
		speed : 40,
	};
    e4 = {
		x : 650,
		y : 550,
		w : 60,
		h : 60,
		speed : 20,
	};
	e5 = {
		x : 800,
		y : 550,
		w : 60,
		h : 60,
		speed : 30,
	};
	e6 = {
		x : 1050,
		y : 620,
		w : 60,
		h : 60,
		speed : 40,
	};
	e7 = {
		x : 1150,
		y : 450,
		w : 60,
		h : 60,
		speed : 20,
	};
	e8 = {
		x : 1300,
		y : 350,
		w : 60,
		h : 60,
		speed : 30,
	};
	e9 = {
		x : 1450,
		y : 320,
		w : 60,
		h : 60,
		speed : 40,
	};
	e10 = {
		x : 350,
		y : 320,
		w : 60,
		h : 60,
		speed : 40,
	};
	e11 = {
		x : 250,
		y : 620,
		w : 60,
		h : 60,
		speed : 40,
	};
	e12 = {
		x : 750,
		y : 450,
		w : 60,
		h : 60,
		speed : 20,
	};
	e13 = {
		x : 400,
		y : 350,
		w : 60,
		h : 60,
		speed : 30,
	};
	e14 = {
		x : 650,
		y : 320,
		w : 60,
		h : 60,
		speed : 40,
	};
	e15 = {
		x : 650,
		y : 320,
		w : 60,
		h : 60,
		speed : 40,
	};

    enemy = [e1,e2,e3,e4,e5,e6,e7,e8,e9,e10,e11,e12,e13,e14,e15];
    
    player = {
		x : 20,
		y : H/2,
		w : 60,
		h : 60,
		speed : 20,
        moving  : false,
        health : 100,
	};
    
	gem = {
		x : W-100,
		y : H/2,
		w : 60,
		h : 60,
	};

	heart = {
		x : W-100-20,
		y : H/2 - 30,
		w : 60,
		h : 60,
	};
    //listen to events on the canvas

    canvas.addEventListener('mousedown',function(){
        console.log("Mouse Pressed"); 
        player.moving = true;
    });
    canvas.addEventListener('mouseup',function(){
        console.log("Mouse Released"); 
        player.moving = false;
    });
    
}

function isOverlap(rect1,rect2,special){
    if (rect1.x < rect2.x + rect2.w-special &&
   		rect1.x + rect1.w > rect2.x + special &&
   		rect1.y < rect2.y + rect2.h &&
   		rect1.y + rect1.h > rect2.y) 
    	return true
 
    return false;
}

function draw(){
    
    //clear the canvas area for the old frame
    pen.clearRect(0,0,W,H);
    
    pen.fillStyle = "red";
    //pen.fillRect(box.x,box.y,box.w,box.h);
    //pen.drawImage(enemy_image,box.x,box.y,box.w,box.h);
    
    //draw the player
    
    //draw the gem
    pen.drawImage(player_img,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    
    
    for(let i=0;i<enemy.length;i++){
        pen.drawImage(enemy_image,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
    }
    
    pen.fillStyle = "white";
    pen.fillText("Score "+player.health,10,10);
    
}

function update(){
    
    //if the player is moving 
    if(player.moving==true){
        player.x += player.speed;
        player.health += 10;
    }
    
    for(let i=0;i<enemy.length;i++){
        if(isOverlap(enemy[i],player,0)){
            player.health -= 50;
            if(player.health <0){
                console.log(player.health);
                game_over = true;
                alert("Game Over" + player.health);
                exit();
            }
        }
    }
    
    //overlap overlap
    if(isOverlap(player,gem,50)){
    	
    	pen.drawImage(heart_image,heart.x,heart.y,heart.w,heart.h);
    	
        console.log("You Won");
        win - true;
        game_over = true;        
    }
    
    //move the box downwards
    //update each enemy by same logic
    for(let i=0;i<enemy.length;i++)
	{
		let r = Math.floor(Math.random() * 4); 
		//console.log(r);
		if(i==0 || i==4) r=0;
		if(i==1 || i==5) r=1;

		if(r==0){
			if(enemy[i].x>W-enemy[i].speed-enemy[i].w || enemy[i].x<0-enemy[i].speed-enemy[i].w) enemy[i].speed*=-1;
			enemy[i].x+=enemy[i].speed;
		}

		else if(r==1){
			if(enemy[i].y>H-enemy[i].speed-enemy[i].h || enemy[i].y<0-enemy[i].speed-enemy[i].h) enemy[i].speed*=-1;
			enemy[i].y+=enemy[i].speed;
		}

		else if(r==2){
			enemy[i].speed*=-1;
			if(enemy[i].x>W-enemy[i].speed-enemy[i].w || enemy[i].x<0-enemy[i].speed-enemy[i].w) enemy[i].speed*=-1;
			enemy[i].x+=enemy[i].speed;
		}

		else if(r==3){
			enemy[i].speed*=-1;
			if(enemy[i].y>H-enemy[i].speed-enemy[i].h || enemy[i].y<0-enemy[i].speed-enemy[i].h) enemy[i].speed*=-1;
			enemy[i].y+=enemy[i].speed;
		}
	}
    
}

function gameloop(){
    if(game_over==true){
    	pen.drawImage(heart_image,heart.x,heart.y,heart.w,heart.h);
        clearInterval(f);
        pen.drawImage(heart_image,heart.x,heart.y,heart.w,heart.h);
        if(win)
        	alert("You Won!");
        return;
    }
    draw();
    update();
    console.log("In gameloop");
}

load_images();
init();
var f = setInterval(gameloop,60);