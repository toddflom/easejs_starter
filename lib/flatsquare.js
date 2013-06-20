function Flatsquare (width, depth, color, vpx, vpy) {
  if (width === undefined) { width = 100; }
  if (depth === undefined) { depth = 100; }
  if (color === undefined) { color = "#ff0000"; }
  if (vpx === undefined) { vpx = 100; }
  if (vpy === undefined) { vpy = 100; }
  this.x = 0;
  this.y = 0;
  this.z = 100;
  this.width = width;
  this.depth = depth;
  this.vx = 0;
  this.vy = 0;
  this.vz = 0;
  this.vpx = vpx;
  this.vpy = vpy;
  this.points = [];
  
  this.points[0] = new Point3d(-100, -100, 100);
  this.points[1] = new Point3d( 100, -100, 100);
  this.points[2] = new Point3d( 100,  100, 100);
  this.points[3] = new Point3d(-100,  100, 100);
  
  console.log(this.points);

  this.points.forEach(function (point) {
    point.setVanishingPoint(this.vpX, this.vpY);
  });
  
  this.rotation = 0;
  this.scaleX = 1;
  this.scaleY = 1;
  this.color = utils.parseColor(color);
  this.lineWidth = 1;
}


Flatsquare.prototype.draw = function (context) {
	  context.save();
	  context.translate(this.x, this.y);
	  context.rotate(this.rotation);
	  context.scale(this.scaleX, this.scaleY);

	  context.lineWidth = this.lineWidth;
	  context.fillStyle = this.color;
	  
	  context.beginPath();
	  context.moveTo(this.points[0].getScreenX(), this.points[0].getScreenY());
	  this.points.forEach(function (point, i) {
		  if (i !== 0) {
		        context.lineTo(point.getScreenX(), point.getScreenY());
		   }
	  	});
	  context.closePath();
	  context.fill();
	  if (this.lineWidth > 0) {
	    context.stroke();
	  }
	  context.restore();
	};
    
	

	
/*
points[0] = new Point3d(-100, 100, 100);
points[1] = new Point3d( 100, 100, 100);
points[2] = new Point3d( 100, 100, 300);
points[3] = new Point3d(-100, 100, 300);

points.forEach(function (point) {
  point.setVanishingPoint(vpX, vpY);
});
*/

/*
function Box (width, height, color) {
	  if (width === undefined) { width = 50; }
	  if (height === undefined) { height = 50; }
	  if (color === undefined) { color = "#ff0000"; }
	  this.x = 0;
	  this.x = 0;
	  this.y = 0;
	  this.width = width;
	  this.height = height;
	  this.vx = 0;
	  this.vy = 0;
	  this.rotation = 0;
	  this.scaleX = 1;
	  this.scaleY = 1;
	  this.color = utils.parseColor(color);
	  this.lineWidth = 1;
	}

	Box.prototype.draw = function (context) {
	  context.save();
	  context.translate(this.x, this.y);
	  context.rotate(this.rotation);
	  context.scale(this.scaleX, this.scaleY);

	  context.lineWidth = this.lineWidth;
	  context.fillStyle = this.color;
	  context.beginPath();
	  context.rect(0, 0, this.width, this.height);
	  context.closePath();
	  context.fill();
	  if (this.lineWidth > 0) {
	    context.stroke();
	  }
	  context.restore();
	};
	*/
