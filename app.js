var scene = new THREE.Scene(),
//if the browser doesn't support webgl then use canvas
renderer = window.WebGLRenderingContext ?  new THREE.WebGLRenderer() : new THREE.CanvasRenderer,
light = getLighting(),
camera,
box,
controls;

function createGround(){
    
    var texture = THREE.ImageUtils.loadTexture('grass.jpg');
    var planeMaterial = new THREE.MeshPhongMaterial({
        map:texture,
        side:THREE.DoubleSide
        
    });
    //a plane is just like a 2d rectangle
    var plane = new THREE.Mesh(new THREE.PlaneGeometry(200,200),planeMaterial);
    plane.rotation.x = 90 * (Math.PI / 180);
    plane.position.y = -10;
    plane.name = "plane";
    scene.add(plane);
}
function getLighting(){
    
    var light = null;
    //cast shadow in one direction like a cone
    //only affects meshlambert or meshphong
    //color, intensity, distance, angle
    light = new THREE.SpotLight(0xff0000,1,100,3);
    
    //all light comes from same direction not position
    //color
    //intensity
    light = new THREE.DirectionalLight(0xff0000,1);
    
    
    //shines in all directions and only affects MeshLambert or MeshPhong
    //intensity - strength of light default is 1. 2 = twice as strong
    //distance - how far the light shines 
    light = new THREE.PointLight(0xff0000,1,100);
    
    //affects all objects equally
    //can soften by specifiying grey like colors
    //generally used in conjuction with other types
    light = new THREE.AmbientLight(0xffffff);
    
    light.castShadow = true;
    
    return light;
}
function addThingsASceneNeeds(){
    //light is not needed but it is used to have an affect on certain mesh materials
    scene.add(light);
    //you can't see anything if the camera is not observing the scene
    scene.add(camera);
    //you don't actually need a box but what is the point if you don't put anything in the scene
    scene.add(box);
}
function initScene(){
    //this just sets the boundaries of where anything can happen
    //you can have it take up the entire window or part of it
    //this allows there to be multiple scenes in one window
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    //there has to be a standar html element as the starting place just like anything else
    document.getElementById('webgl-container').appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(
        35, //FOV field of view what angle from the camera is it capable of seeing
        //this is just like any other cameras capability to see a certain degree of anggle like 180
        //but it is relevant to up and down not right to left
        window.innerWidth/window.innerHeight, // calculationg for aspect ratio
        1, //near range
        1000 //far range
    );
    
    camera.position.z = 100;
    createGround();
    createMesh();
    addThingsASceneNeeds();
    createControls();
    render();
}
function createControls(){
    controls = new THREE.OrbitControls(camera);
    controls.addEventListener("change",render);
    
}
//still not sure why its called Mesh
function createMesh(){
    box = new THREE.Mesh(
        //the shape is the skeleton of the object
        //it only includes the lines that are used to make a shape, not the fill
        getBuiltInGeometry(),
        //mesh material is like the fill, its what the in between the lines looks like
        getMeshMaterial()
        
    );
    box.name = "box";
   
    
}

function getMeshMaterial(){
    //non shiny dull surface like pottery
    //needs directional, point or spot light
    return  new THREE.MeshLambertMaterial({color:0xFF0000});
    
    //shiny metallic surface
    //needs directional, point or spot light
    return new THREE.MeshPhongMaterial({
        color:0xFF0000,
        ambient:0x0088bb,
        //how shiny and color of shine, makes things more metal looking
        specular:0x002211,
        shininess:100
    });
    
    //used for demo or debugging purposes, doesn't need light
    return  new THREE.MeshBasicMaterial({color:0xFF0000});
    
    
}



//look at the documenation for a list of all pre built shapes available
//for the most part you shouldn't have to make your own anything
function getBuiltInGeometry(){
    
    return new THREE.BoxGeometry(20,20,20);
      
      
      
    //radius, widthSegments,heightSegments
    //radius determines how big it is
    //computers cannot create perfect circles so you use the width and height property to determine how close to perfect you want it
    //the closer to perfect the more resources it takes to render it
    return new THREE.SphereGeometry(10,20,20);
  
}
//i don't get this part, if you assign the rotation property at the time you make the object it won't work
//you have to assign the property when you are rendering
function makeObjectRotate(obj){
    obj.rotation.y += 0.01;
    obj.rotation.x += 0.01;
}
function render(){
   // makeObjectRotate(box);
    renderer.render(scene,camera);
    requestAnimationFrame(render);
    
}
//boring - go over this again if you need to
function createCustomGeometry(){
    var triangle = new THREE.Geometry();
    //create the three points of the triangle
    triangle.vertices.push(new THREE.Vector3(0.0,1.0,0.0));
    triangle.vertices.push(new THREE.Vector3(-1.0,-1.0,0.0));
    triangle.vertices.push(new THREE.Vector3(1.0,-1.0,0.0));
    
}

//go back over material of how you can create shapes in blender or threejs editor
//then you can export them to a physical file and import them at runtime to show on the screen
function importObject(){
    
    
}

//review this
function getTexture(){
    var texture = THREE.ImageUtils.loadTexture('content/whatever.jpg');
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    
    texture.repeat.set(10,10);
    
}
window.onload = initScene;
