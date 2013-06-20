function Marker (path, width, height, vpX, vpY) {
  if (width === undefined) { width = 40; }
  if (height === undefined) { height = 45; } 
  this.path = path;
  this.fl = 250;
  this.x = 0;
  this.y = 100;
  this.z = 50;
  this.originZ = this.z;
  this.vpX = vpX;
  this.vpY = vpY;
  this.originX = this.x;
  this.width = width;
  this.height = height;
  this.xpos = 0;
  this.ypos = 0;
  this.zpos = 0;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.visible = true;
  this.image = loadImage(path);
}

Marker.prototype.draw = function (context) {
 
	if (this.zpos > -150) {
	  context.save();
	 /*
	  *  context.translate(this.x, this.y);
	  context.rotate(this.rotation);
	  context.scale(this.scaleX, this.scaleY);
	*/
	  context.scale(this.scaleX, this.scaleY);
	
	  var scale = this.fl / (this.fl + this.zpos);
	  
	  this.scaleX = this.scaleY = scale;
	  this.x = this.vpX + this.xpos * scale;
	  this.y = this.vpY + this.ypos * scale;
	  console.log(this.y);
	
	  this.width = this.width * scale;
	  this.height = this.height * scale; 
	 
	  context.drawImage(this.image, this.x, this.y, this.width, this.height);
	//  context.drawImage(this.image, 300, 50, this.width * this.scaleX, this.height * this.scaleY);
	
	// context.drawImage(this.image, 300, 50, 50, 57);
	
	  
	
	  
	  context.restore();
	}
};


Marker.prototype.translate = function (movX, movZ, tilesLength) {
	var shift = 4000 * movZ; // tilesLength * movZ;
	this.zpos = this.originZ - shift;
	/* this.x = movX; */
	console.log("this.originZ = " + this.zpos);
};


function loadImage(name)
{
    // create new image object
    var image = new Image();
    // load image
    image.src = name;
    // return image object
    return image;
}

	