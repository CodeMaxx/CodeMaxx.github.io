getGL = function(canvas) {
  var gl = null;
  for (var i = 0; i < 4; ++i) {
    gl = canvas.getContext(
        [ "webgl", "experimental-webgl", "moz-webgl", "webkit-3d" ][i], {
          antialias : false,
          preserveDrawingBuffer : true,
          willReadFrequently : false,
          depth: true
        });
    if (gl)
      break;
  }

  if (!gl) {
    alert('Your browser does not support WebGL');
  }
  return gl;
}

getCanvas = function(canvasName) {
    var canvas = $('#' + canvasName);
    if(!canvas[0]){
        $('#test_canvas').append("<canvas id='" + canvasName + "' width='256' height='256'></canvas>");
    }
    return canvas = $('#' + canvasName)[0];
}

var LineTest = function(type) {
    // var ID = sender.getID();
    this.begin = function(canvas) {
        var gl = getGL(canvas);
        if (type == 'normal') gl = getGL(canvas);
        else {
            canvas = getCanvas("can_aa");
            gl = getGLAA(canvas);
        }

        function getPoints(){
            var res = [];

            for (var x = 0; x < 256; x ++) {
                var y = 256 - 100 * Math.cos(2.0 * Math.PI * x / 100.0) + 30 * Math.cos(4.0 * Math.PI * x / 100.0) + 6 * Math.cos(6.0 * Math.PI * x / 100.0);
                res.push(x / 150 - 0.8, y / 200 - 1.4, 0);
            }
            return res;
        }


        /*======= Defining and storing the geometry ======*/
        var vertices = getPoints();
        vertices.push.apply(vertices, [
        -0.7,-0.1,0,
        -0.3,0.6,0,
        -0.3,-0.3,0,
        0.2,0.6,0,
        0.3,-0.3,0,
        0.7,0.6,0
            ]);

            // Create an empty buffer object


        // Create an empty buffer object
        var vertex_buffer = gl.createBuffer();

        // Bind appropriate array buffer to it
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

        // Pass the vertex data to the buffer
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        // Unbind the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

        /*=================== Shaders ====================*/

        // Vertex shader source code
        var vertCode = 'attribute vec3 coordinates;' +
            'void main(void) {' +
                ' gl_Position = vec4(coordinates, 1.0);' +
                    '}';

                // Create a vertex shader object
        var vertShader = gl.createShader(gl.VERTEX_SHADER);

        // Attach vertex shader source code
        gl.shaderSource(vertShader, vertCode);

        // Compile the vertex shader
        gl.compileShader(vertShader);

        // Fragment shader source code
        var fragCode = 'void main(void) {' +
            'gl_FragColor = vec4(1, 1, 1, 1.0);' +
                '}';
        // Create fragment shader object
        var fragShader = gl.createShader(gl.FRAGMENT_SHADER);

        // Attach fragment shader source code
        gl.shaderSource(fragShader, fragCode);

        // Compile the fragmentt shader
        gl.compileShader(fragShader);

        // Create a shader program object to store
        // the combined shader program
        var shaderProgram = gl.createProgram();

        // Attach a vertex shader
        gl.attachShader(shaderProgram, vertShader);

        // Attach a fragment shader
        gl.attachShader(shaderProgram, fragShader);

        // Link both the programs
        gl.linkProgram(shaderProgram);

        // Use the combined shader program object
        gl.useProgram(shaderProgram);

        /*======= Associating shaders to buffer objects ======*/

        // Bind vertex buffer object
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);

        // Get the attribute location
        var coord = gl.getAttribLocation(shaderProgram, "coordinates");

        // Point an attribute to the currently bound VBO
        gl.vertexAttribPointer(coord, 3, gl.FLOAT, false, 0, 0);

        // Enable the attribute
        gl.enableVertexAttribArray(coord);

        /*============ Drawing the triangle =============*/

        // Clear the canvas
        gl.clearColor(0, 0, 0, 1.0);

        // Enable the depth test
        gl.enable(gl.DEPTH_TEST);

        // Clear the color and depth buffer
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set the view port
        gl.viewport(0, 0, canvas.width, canvas.height);

        // Draw the triangle
        //gl.drawArrays(gl.LINES, 0, 256);
        gl.drawArrays(gl.LINE_STRIP, 0, 256);
        gl.drawArrays(gl.LINES, 256, 6);


        //gl.drawArrays(gl.LINES, 0, 6);
        // console.log(gl);
        getData(gl);
        // cb(level);
    }
    // POINTS, LINE_STRIP, LINE_LOOP, LINES,
    // TRIANGLE_STRIP,TRIANGLE_FAN, TRIANGLES
}
getData = function(gl) {
    // if (!this.finalized) {
    //   throw "Still generating ID's";
    //   return -1;
    // }
    var WebGL = true;
    var pixels = new Uint8Array(256 * 256 * 4);
    gl.readPixels(0, 0, 256, 256, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    var ven, ren;
    var debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      ven = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
      ren = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    } else {
      console.log("debugInfo is not accessable");
      ven = 'No debug Info';
      ren = 'No debug Info';
    }
    var hash = pixels.hashCode();
    console.log("gl: " + hash);

    // this.toServer(WebGL, ven, ren, hash, id, pixels);
    if (sumRGB(pixels) > 1.0) {
      return hashRGB(pixels);
    } else {
      return 0;
    }
};
sumRGB = function(img) {
    var sum = 0.0;
    for (var i = 0; i < img.length; i += 4) {
      sum += parseFloat(img[i + 0]);
      sum += parseFloat(img[i + 1]);
      sum += parseFloat(img[i + 2]);
    }
    return sum;
};

  function hashRGB(array) {
    var hash = 0, i, chr, len, j;
    if (array.length === 0)
      return hash;
    for (i = 0, len = array.length; i < len; i += 4) {
      for (j = 0; j < 3; ++j) {
        chr = array[i] | 0;
        hash ^= (((hash << 5) - hash) + chr + 0x9e3779b9) | 0;
        hash |= 0; // Convert to 32bit integer
      }
    }
    return hash;
};
Uint8Array.prototype.hashCode = function() {
  var hash = 0, i, chr, len;
  if (this.length === 0)
    return hash;
  for (i = 0, len = this.length; i < len; i++) {
    chr = this[i];
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}
d = 256;
canvas = $("<canvas width='" + d + "' height='" + d + "'/>").appendTo($('body'))[0];
var testDone;
new LineTest('normal').begin(canvas);
canvas1 = $("<canvas width='" + d + "' height='" + d + "'/>").appendTo($('body'))[0];
new CubeTest('normal').begin(canvas1);