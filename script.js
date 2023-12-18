let branch = []
let s_color
let s_weight
let offset = -90.0


let treeGenerationActive = false 

let start = 0 
let inc = 0.01 
let j = 2

let drop = [] 
let snowActive = false

let snowCount = 500 
let snowSize 

let snowColors = ["#FFFFF","#7a695e" ]

let stringRed = 
`Scarlet waves on hills and lea,
  Nature's fire, a vivid decree.
    Mountains blaze in ruby attire,
      Fields aflame, a passionate pyre.`

let stringBrown = 
`Brown petals flutter in a gentle breeze,
  A terrestrial waltz, beneath celestial seas.
    Fields of hazel, in quiet repose,
      A palette of soil, where harmony grows.`

let stringBlue = 
`Beneath a cobalt sky, stars blink,
    An alien world in tranquil night.
      Mountains draped in midnight's hue,
             quiet realm where dreams renew.`


let stringBW = 
`On an alien sphere, stark and clear,
  A world where shadows softly veer.
   Mountains dressed in ebony's might,
     A monochrome realm, silent night.`


let textGenerate = false
let currentCharacter = 0

let bgChange

class Drop{
  constructor() {
    this.x = random(0, width)
    this.y = random(0, -height)
    this.speed = random(1, 10)
    this.gravity = 0.3
  }

  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(1, 5), random(1, 5));
  }

  update() {
    this.y += this.speed * this.gravity;
    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0
    }
  }

}




class Branch {
  constructor(sx, sy, ex, ey, sl, sd) {
    this.startx = sx
    this.starty = sy
    this.endx = ex
    this.endy = ey
    this.length = sl
    this.degree = sd
    this.nextx = this.startx
    this.nexty = this.starty
    this.prevx = this.startx
    this.prevy = this.starty
    this.next_flag = true
    this.draw_flag = true
  
  }

  update() {
    this.nextx += (this.endx - this.nextx) * 0.2
    this.nexty += (this.endy - this.nexty) * 0.2
    s_color = int(count/5)
    s_weight = 3.0 / (count / 100 + 1)
   
    if (
      abs(this.nextx - this.endx) < 1.0 &&
      abs(this.nexty - this.endy) < 1.0 &&
      this.next_flag == true
    ) {
      this.next_flag = false
      this.draw_flag = false
      this.nextx = this.endx
      this.nexty = this.endy
      
       var num = int(random(2, 4))
      
      for (var i = 0; i < num; i++) {
        var sx = this.endx
        var sy = this.endy
        var sl = random(random(10.0, 20.0), this.length * 0.99)
        var sd = random(-24.0, 24.0)
        var ex = sx + sl * cos(radians(sd + this.degree + offset))
        var ey = sy + sl * sin(radians(sd + this.degree + offset))
        branch.push(new Branch(sx, sy, ex, ey, sl, sd + this.degree))
      }
      count += 1
    }
  
    
    if (branch.length > 6000) {
      //reset branches
      count = 0;
      s_color = 0;
      s_weight = 0;
      var a = random(width);
      var b = random(0.0, 180.0);
      branch = [];
      branch.push(new Branch(a, height, a, height - b, b, 0.0));
    }
    
  }

  render() {
    if (this.draw_flag == true) {
      stroke(s_color);
      strokeWeight(s_weight);
      line(this.prevx, this.prevy, this.nextx, this.nexty);
    }
    this.prevx = this.nextx;
    this.prevy = this.nexty;
  }
}




function setup() {
  createCanvas(800, 800)
  background(225)
  bgChange = int(random(1,100))

  count = 0
  s_color = 0
  s_weight = 0
  x = 0
  y = 50
  t = 1

  if (bgChange %4 == 3){ 
    //brown
    bg2(y)
  
  } else if (bgChange %4 ==1) { 
    //b&w
    bg1()
  }
   else if(bgChange %4 ==0){
    //blue
    bg3()

   }else if (bgChange %4 == 2){
    //red
    bg4()

   }
  
   for (var i = 0; i < 200; i++) {
    drop[i] = new Drop();
  }


}

function draw() {



  // generate tree if treeGenerationActive is true
  if(treeGenerationActive){
    for (var i = 0; i < branch.length; i++) {
      branch[i].render()
      branch[i].update()
    }
}

//generate snow if snowActive is true
if (snowActive){ 
  for (var i = 0; i < 100; i++) {
      drop[i].show();
      drop[i].update();
    }
 }

 if(bgChange %4 == 3 && textGenerate == true ){
  showTextBrown()
 }

 if(bgChange %4 == 2 && textGenerate == true ){
  showTextRed()
 }

 if(bgChange %4 == 0 && textGenerate == true ){
  showTextBlue()
 }

 if(bgChange %4 == 1 && textGenerate == true ){
  showTextBW()
 }
 

}

function showTextBW(){ 
  textFont('Courier')
  textSize(18)
  noStroke()
  fill(0)
  let currentString = stringBW.substring(0,currentCharacter)
  text(currentString, 100, 280)
  currentCharacter += 0.1
}


function showTextBlue(){
  textFont('Courier')
  textSize(18)
  noStroke()
  fill(255)
  let currentString = stringBlue.substring(0,currentCharacter)
  text(currentString, 100, 280)
  currentCharacter += 0.1

}


function showTextRed(){
  textFont('Courier')
  textSize(18)
  noStroke()
  fill(255)
  let currentString = stringRed.substring(0,currentCharacter)
  text(currentString, 100, 280)
  currentCharacter += 0.1

}

function showTextBrown(){
  textFont('Courier')
  textSize(18)
  noStroke()
  fill(255)
  let currentString = stringBrown.substring(0,currentCharacter)
  text(currentString, 100, 280)
  currentCharacter += 0.1

}



function bg1(){ 
  stroke (200)
    let yoff = start + 0.5
    if (frameCount < 50){ 
  
      for (let x = 0; x < width; x++) {
        let y = (noise(yoff) + 0.2) * 150 + 30;
        let m = map(noise(start / 100), 0, 1, 0, width);
    
        for (let i = 0; i < 800; i += 6) {
          if (j % 2 == 0) {
            point(x + random(5), y + random(i));
          } else {
            point(x, y - random(i));
          }
        }
        yoff += inc;
      }
  
      stroke (100)
      for (let x = 0; x < width; x++) {
        let y = (noise(yoff) + 0.2) * 350 + 100;
        let m = map(noise(start / 100), 0, 1, 0, width);
    
        for (let i = 0; i < 800; i += 6) {
          if (j % 2 == 0) {
            point(x + random(5), y + random(i));
          } else {
            point(x, y - random(i));
          }
        }
        yoff += inc;
      }
  
      stroke (0)
      for (let x = 0; x < width; x++) {
      let y = (noise(yoff) + 0.2) * 500 + 200;
      let m = map(noise(start / 100), 0, 1, 0, width);
  
      for (let i = 0; i < 800; i += 6) {
        if (j % 2 == 0) {
          point(x + random(5), y + random(i));
        } else {
          point(x, y - random(i));
        }
      }
      yoff += inc;
    }

    snowSize = random(0.1,1)
    drawingContext.shadowBlur = 40 
    drawingContext.shadowColor = color(255)
    for (let s = 0; s < snowCount; s++) {
    circle(random(width), random(height), snowSize)
    stroke(random(snowColors))
    }
    
    drawingContext.shadowBlur = 0    

  }



}


function mousePressed() { 
  console.log ("mouse pressed!")

  treeGenerationActive = true 
  if (branch.length === 0) { // Check to avoid adding multiple trees at once
    branch.push(new Branch(mouseX, height, mouseX, height - 50.0, 80.0, 0.0))
  }
}

function mouseReleased() {
  treeGenerationActive = false
}


function keyPressed(){ 
if(keyIsDown(32)) { 
console.log("space is pressed!")
textGenerate = true 
}

if(key === 's'){
saveCanvas('My Planet', 'jpg')
}
}


//Brown Background
function bg2(y){ 
  background(220)
  for (let x = 0; x <= width; x++) {
  for (let i = 0; i <= 15; i++) {
    strokeWeight(2);
    stroke(122 - 10 * i, 105 - 10 * i, 94 - 10 * i);
    line(x, y + 60 * i + 300 * noise(x / 150, t * i), x, height);
  }
}
granulate(40)

snowSize = random(0.1,1)
drawingContext.shadowBlur = 40 
drawingContext.shadowColor = color(255)
for (let s = 0; s < snowCount; s++) {
circle(random(width), random(height), snowSize)
stroke(random(snowColors))
}

drawingContext.shadowBlur = 0

}


//Blue 
function bg3(){ 
  background(31, 42, 128)
  for (let x = 0; x <= width; x++) {
  for (let i = 0; i <= 15; i++) {
    strokeWeight(2);
    stroke(110 - 10 * i, 126 - 10 * i, 250 - 10 * i);
    line(x, y + 60 * i + 300 * noise(x / 150, t * i), x, height);
  }
}
granulate(40)

//snow
snowSize = random(0.1,1)
drawingContext.shadowBlur = 40 
drawingContext.shadowColor = color(252, 209, 98)
for (let s = 0; s < snowCount; s++) {
circle(random(width), random(height), snowSize);
stroke(252, 209, 98);
}

drawingContext.shadowBlur = 0 

}


//Red
function bg4(){ 
 // background(145, 86, 86)
  for (let x = 0; x <= width; x++) {
  for (let i = 0; i <= 15; i++) {
    strokeWeight(2);
    stroke(163 - 10 * i, 80 - 10 * i, 80 - 10 * i);
    line(x, y + 60 * i + 300 * noise(x / 150, t * i), x, height);
  }
}
granulate(40)

//snow
snowSize = random(0.1,2)
drawingContext.shadowBlur = 40 
drawingContext.shadowColor = color(225)
for (let s = 0; s < snowCount; s++) {
circle(random(width), random(height), snowSize);
stroke(225)
}

drawingContext.shadowBlur = 0 

}



//granulate function 
function granulate(amount) {
  loadPixels();
  const d = pixelDensity();
  const pixelsCount = 4 * (width * d) * (height * d);
  for (let i = 0; i < pixelsCount; i += 4) {
    const grainAmount = random(-amount, amount);
    pixels[i] = pixels[i] + grainAmount;
    pixels[i + 1] = pixels[i + 1] + grainAmount;
    pixels[i + 2] = pixels[i + 2] + grainAmount;
  }
  updatePixels();
}
