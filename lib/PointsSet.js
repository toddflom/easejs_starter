
function PointsSet (x, y, z, vpX, vpY) {
	if (x === undefined) { x = 0; }
	if (y === undefined) { y = 0; }
	if (z === undefined) { z = 0; }
	this.x = x;
	this.y = y;
	this.z = z;
	this.originZ = this.z;
	this.points = [];
  		
	this.points[0] = new Point3d(this.x - 100, this.y, this.z - 100);
	this.points[1] = new Point3d(this.x + 100, this.y, this.z - 100);
	this.points[2] = new Point3d(this.x + 100, this.y, this.z + 100);
	this.points[3] = new Point3d(this.x - 100, this.y, this.z + 100);
	    
	this.points.forEach(function (point) {
		point.setVanishingPoint(vpX, vpY);
	});
	    
//	    return points;
  		
  	}


PointsSet.prototype.draw = function (context) {
	  context.save();
	  
	  if (this.z > -150) {
		 // context.fillStyle = "#999999";
		  context.fillStyle = ColorLuminance("#999999", this.z * 0.001);
		  context.strokeStyle = ColorLuminance("#555555", this.z * 0.002);
	      context.beginPath();
	      context.moveTo(this.points[0].getScreenX(), this.points[0].getScreenY());
	      this.points.forEach(
			  function (point, i) {
			      if (i !== 0) {
			        context.lineTo(point.getScreenX(), point.getScreenY());
			      }
			   }
	      );
	      context.closePath();
	      
	      context.lineWidth = 3;
	      context.stroke();
	     
	      context.fill();
		}
      
/* 	 Better way to hide stuff past the focal plane?
  		if (zpos > -fl) {
		    var scale = fl / (fl + zpos);
		    xpos = mouse.x - vpX;
		    ypos = mouse.y - vpY;
		    ball.scaleX = ball.scaleY = scale;
		    ball.x = vpX + xpos * scale;
		    ball.y = vpY + ypos * scale;
		    ball.visible = true;
		  } else {
		    ball.visible = false;
		  }

		  if (ball.visible) {
		    ball.draw(context);
		  }
		}());
		*/

};

PointsSet.prototype.translate = function (movX, movZ, tilesLength) {
	var shift = tilesLength * movZ;
	this.z = this.originZ - shift;
	this.x = movX;
	//console.log(this.z);
	 this.points.forEach(
   		  function (point, i) {
   			//  point.moveZ(movZ);
   			 // point.cZ = movZ;
   			  //this.z = * movZ;
   			 // point.moveZ(this.z); 
   			  point.moveX(movX);
   			 point.moveZ(shift); // 4000 is total length of all tiles (40 * 100)
   		}
     );
};
 
PointsSet.prototype.rotate = function (angleX, angleY) {
//function move (point) {
//    point.rotateX(angleX);
//    point.rotateY(angleY);
//  }
	
	 this.points.forEach(
   		  function (point, i) {
   			  point.rotateX(angleX);
   			  point.rotateY(angleY);
   		    }
     );
	 
};


function ColorLuminance(hex, lum) {
	// validate hex string
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}