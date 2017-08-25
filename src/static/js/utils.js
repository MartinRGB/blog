  
  // xxx FPS Stats
  function loadStatsUI(canvasContainer){

    var stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    canvasContainer.appendChild( stats.dom );

    stats.dom.style.top = "";
    stats.dom.style.left = "";
    stats.dom.style.position = "absolute";

    function animate() {
      stats.begin();
      // monitored code goes here
      stats.end();
      requestAnimationFrame( animate );
    }

    requestAnimationFrame( animate );
  }

  // Load Code from File
  function loadHighlightCode(codeType,codePath,containerId){
    var pre=document.createElement('pre');
    var code=document.createElement('code');
    code.className += codeType
    // code.innerText = '../codes/light.glsl'
    pre.appendChild(code)
    var codeContainer = document.getElementById(containerId);
    codeContainer.appendChild( pre );

    // Get glsl code from local file
    var TxtFile = new XMLHttpRequest();
    TxtFile.open("GET", codePath, true);
    TxtFile.onreadystatechange = function() {
      if (TxtFile.readyState === 4) {  // Makes sure the document is ready to parse.
        if (TxtFile.status === 200) {  // Makes sure it's found the file.
          //allText = TxtFile.responseText; 
          //lines = txtFile.responseText.split("\n"); // Will separate each line into an array
          //var customTextElement = document.getElementById('textHolder');
          code.innerHTML = TxtFile.responseText;
        }
      }
    }
    TxtFile.send(null);
  }

  // xxx Control
  function addZoomCondition(controls,renderer){
    controls.enableZoom = false;
    controls.enableRotate = false;
    controls.enablePan = false;
    renderer.domElement.onmouseover = function(){
      controls.enableZoom = true;
      controls.enableRotate = true;
      controls.enablePan = true;
    }
    renderer.domElement.onmouseleave = function(){
      controls.enableZoom = false;
      controls.enableRotate = false;
      controls.enablePan = false;
    }

  }

  // xxx Light
  function addLight(scene){
    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xffffff, 1, 0 );
    lights[ 0 ].position.set( 0, 200, 0 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );
    scene.add( lights[ 0 ] );
    scene.add( lights[ 1 ] );
    scene.add( lights[ 2 ] );
  }

  // Resize
  function resizeWindow(renderer,datgui){
    window.addEventListener("resize", function() {
      renderer.setSize((body.offsetWidth-40),(body.offsetWidth-40)*aspectRatio);
      datgui.domElement.style.right = (window.innerWidth - body.offsetWidth+40)/2 + 'px';
    });
  }

  // xxx Highlight
  window.onload = function() {
    var aCodes = document.getElementsByTagName('pre');
    for (var i=0; i < aCodes.length; i++) {
        hljs.highlightBlock(aCodes[i]);
        hljs.lineNumbersBlock(aCodes[i]);
    }
  };

  // Load

  //loadMaterialnModel(scene,"../models/teapot.json",customObject,new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true }),teapotFolder)
  function loadMaterialnModel(scene,filePath,object,materials,guiFolder,positionY) {
    // BEGIN Clara.io JSON loader code
    //### OBJ2 - Load Obj
    var objectLoader = new THREE.ObjectLoader();
    objectLoader.load(filePath, function ( obj ) {
       //### OBJ2 - Shape
      object = obj

      if(materials == null){
        object.material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } )
      }
      else{
        object.material = materials
      }

      object.position.y = positionY;
      scene.add( object );

      guiFolder.add(object.position, 'y', -2, 2).name('positionY').listen();
      guiFolder.add(object.scale, 'x', 0, 3).name('width').listen();
      guiFolder.add(object.scale, 'y', 0, 3).name('height').listen();
      guiFolder.add(object.scale, 'z', 0, 3).name('length').listen();
      guiFolder.add(object.material, 'wireframe').listen();
    } );
    // END Clara.io JSON loader code
  }

  //loadShadernModel(scene,'../jsons/default_shader.json',"../models/teapot.json",customObject,teapotFolder)
  function loadShadernModel(scene,shaderPath,modelPath,object,guiFolder,positionY){
    runtime.load([
        //Local Or Web
        shaderPath
    ], function( shaders ) {
        
        //loadObject(scene,modelPath,guiFolder,object,runtime.get( shaders[0].name ))

        var modelLoader = new THREE.ObjectLoader();
        modelLoader.load(modelPath, function ( obj ) {
          //### OBJ2 - Shape
          object = obj

          object.material = runtime.get( shaders[0].name)

          object.position.y = positionY;
          scene.add( object );

          guiFolder.add(object.position, 'y', -2, 2).name('positionY').listen();
          guiFolder.add(object.scale, 'x', 0, 3).name('width').listen();
          guiFolder.add(object.scale, 'y', 0, 3).name('height').listen();
          guiFolder.add(object.scale, 'z', 0, 3).name('length').listen();
          guiFolder.add(object.material, 'wireframe').listen();
        } );
        
        //### OBJ1 - Shader
        //customShader = runtime.get( shaders[0].name );
        //customShader.uniforms.u_texture.value = THREE.ImageUtils.loadTexture( '../textures/jade.jpg' );
        //mesh.material = customShader
    });
  }

  //loadTexturenModel(scene,"../models/teapot.json",'../textures/metal.jpg',customObject,teapotFolder);
  function loadTexturenModel(scene,modelPath,texturePath,object,guiFolder,positionY) {

    var textureLoader = new THREE.TextureLoader();
    var customTexture;
    textureLoader.load(
      //'../textures/metal.jpg'
      texturePath,
      function ( texture ) {
        //### OBJ1 - Shape
        texture.repeat.x = 0.5;
        texture.repeat.y = 0.25;
        geometry = new THREE.ConeGeometry( 1, 2,32 );
        //### OBJ1 - Load Texture
        material = new THREE.MeshBasicMaterial( {
          map: texture
        } );

        //material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: false } );
        customTexture = material
        loadMaterialnModel(scene,modelPath,object,customTexture,guiFolder,positionY)

      },
      // Function called when download progresses
      function ( xhr ) {
        console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );

      },
      // Function called when download errors
      function ( xhr ) {
        console.log( 'An error happened' );
      }
    );
  }

  // DATGUI
  var options;
  function loadDATGUI(gui,obj,reset) {


    var color = gui.addFolder('BGColor');
    var cam = gui.addFolder('Camera');
    options = {
      color:{
        background: "#3f403b"
      },
      camera: {
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        positionX: 0,
        positionY: 1,
        positionZ: 2.5
      },
      reset: function() {
        reset()
      }
    }

    gui.domElement.style.right = (window.innerWidth - body.offsetWidth+40)/2 + 'px';
    gui.domElement.style.position = "absolute";
    color.addColor(options.color,'background').listen();
    cam.add(options.camera, 'rotationX', 0, 50).listen();
    cam.add(options.camera, 'rotationY', 0, 50).listen();
    cam.add(options.camera, 'rotationZ', 0, 50).listen();
    cam.add(options.camera, 'positionX', 0, 50).listen();
    cam.add(options.camera, 'positionY', 0, 50).listen();
    cam.add(options.camera, 'positionZ', 0, 50).listen();
    gui.add(options, 'reset');
    gui.close()
    canvasContainer.appendChild( gui.domElement );
  }

  function updateDATGUI(){
    //listen
    options.camera.rotationX = camera.rotation.x
    options.camera.rotationY = camera.rotation.y
    options.camera.rotationZ = camera.rotation.z
    options.camera.positionX = camera.position.x
    options.camera.positionY = camera.position.y
    options.camera.positionZ = camera.position.z

    renderer.setClearColor( options.color.background, 1 );
  }

  export { Utils as default };
