let spot = document.getElementById("spot"),
spotCanvas = spot.getContext('2d'),
brushRadius = (spot.width / 100) * 5,
img = new Image();

if (brushRadius < 50) { brushRadius = 50 }

img.onload= function() { spotCanvas.drawImage(img, 0, 0, spot.width, spot.height);
}


img.loc = 'https://i.ibb.co/zhzjjtX/Untitled-design-24.png';
img.filename = 'blank-spot.jpg';
if (window.devicePixelRatio >= 2) {
	let nameParts = img.filename.split('.')
	img.src = img.loc + nameParts[0]+"-2x"+"."+nameParts[1];
} else {
	img.src = img.loc + img.filename;
}

function detectLeftButton(event) {
    if ('buttons' in event) {
        return event.buttons === 1;
    } else if ('which' in event) {
        return event.which === 1;
    } else {
        return event.button === 1;
    }
}

function getBrushPos(xRef, yRef) {
	let spotRect = spot.getBoundingClientRect();
    return {
	  x: Math.floor((xRef-spotRect.left)/(spotRect.right-spotRect.left)*spot.width),
	  y: Math.floor((yRef-spotRect.top)/(spotRect.bottom-spotRect.top)*spot.height)
    };
}
      
function drawDot(mouseX,mouseY){
	spotCanvas.beginPath();
    spotCanvas.arc(mouseX, mouseY, brushRadius, 0, 2*Math.PI, true);
    spotCanvas.fillStyle = '#000';
    spotCanvas.globalCompositeOperation = "destination-out";
    spotCanvas.fill();
}

spot.addEventListener("mousemove", function(e) {
	let brushPos = getBrushPos(e.clientX, e.clientY);
  let leftBut = detectLeftButton(e);
  if (leftBut == 1) {
		drawDot(brushPos.x, brushPos.y);
  }
}, false);

spot.addEventListener("touchmove", function(e) {
    e.preventDefault();
    let touch = e.targetTouches[0];
    if (touch) {
    let brushPos = getBrushPos(touch.pageX, touch.pageY);
        drawDot(brushPos.x, brushPos.y);
    }
}, false);