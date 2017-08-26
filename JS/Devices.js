function Device(device_id, device_type, html_tag){
  var buttons = new Array({});
  var device_function = "none";
  var d = {id:device_id, type:device_type, html_id:html_tag, state:'ON', buttons:buttons, func:device_function};
  //self.html_id = name + id.toString();
  return d;
}
var DevicesList = new Array({id:0});

function LoadDevicesFromDatabase() {
  // get data from DB
  // then create a new Device and put into array.
  // think about whether the array is needed. YES IT IS

  var info = {load:'true'};
  var data = ajax.CreateForm(info);
  var response = ajax.send('/PHP/LoadDevices.php', 'POST', data, false);
  var json = JSON.parse(response);
  console.log(" Loaded Data from Server !!");
  if(json.Data[1] == null){return;}
  console.log(json.Data[1].name);
  var size_of_data = json.Data.length;
  var index;
  for(index =0; index < size_of_data; index++){
    // loop through the data.
    device_info = json.Data[index];
    if(device_info.type == 'light') {
      LoadLightDevice(device_info);
    }
    else {
      LoadCameraDevice(device_info);
    }
  }

  return;
}


function GetNewDeviceId() {
  var info = {};
  var info = {data_request:'Latest_Id'};
  var data = ajax.CreateForm(info);
  var response = ajax.send('/PHP/RequestData.php', 'POST', data, false);
  console.log("GET FUNC !!  ");
  var json = JSON.parse(response);
  console.log(json.msg);
  return parseInt(json.msg) + 1;
}
// CREATE NEW DEVICE IN SQL.
// GET INFO FROM USER INPUT FORM.
function AddDeviceToDatabase(device_type, device_ip_addr) {
  // first get the is of latest device added. then incr by 1 to create new id.
  var new_id = GetNewDeviceId();
  var device_name = device_type + new_id;
  var info = {id:new_id, name:device_name, type:device_type, ip_addr:device_ip_addr};
  var data = ajax.CreateForm(info);
  ajax.send('/PHP/AddDevice.php', 'POST', data, responseCallback, false);
  // AFTER THIS FORCE A RELOAD OF ALL DEVICES.!!!!!!
  // OR JUST ADD TO  JS LIST LIKE BEFORE
  return new_id;
}

function LoadLightDevice(data) {
  var device_type = data.type;
  var device_id = data.id;
  var device_ip_addr = data.ip_addr;
  var device_status = data.status;

  html_id = device_type + "-" + device_id;
  console.log("id: " + device_id);
  new_device = Device(device_id, device_type, html_id, device_status);
  DevicesList.push(new_device);
  CreateLightButtons(device_type, device_id, html_id, device_status);
  return;
}

function LoadCameraDevice(data) {
  var device_type = data.type;
  var device_id = data.id;
  var device_ip_addr = data.ip_addr;
  var device_status = data.status;
  var face_dectect_state = data.face_detect;
  var room_attendance_state = data.room_attendance;
  var vehicle_detect = data.vehicle_detect;

  html_id = device_type + "-" + device_id;
  new_device = Device(device_id, device_type, html_id, device_status);
  DevicesList.push(new_device);
  var image = CreateVideoImageFrame(device_id, html_id, device_type);
  CreateVideoButtons(device_id, html_id, device_type, image, data);

  return;
}

function CreateNewLightDevice(device_ip_addr){
  device_type = 'light';
  last_device_added = DevicesList.length - 1;
  //device_id = DevicesList[last_device_added].id + 1;
  device_id = AddDeviceToDatabase(device_type, device_ip_addr);
  html_id = device_type + "-" + device_id;
  new_device = Device(device_id, device_type, html_id, 'OFF');
  DevicesList.push(new_device);
  CreateLightButtons(device_type, device_id, html_id, 'OFF');
  return;
};


function CreateLightButtons(device_type, device_id, html_id, device_status) {
  var button = document.createElement("button");
  button.setAttribute("id", html_id);
  if(device_status == 'OFF' ){
    button.setAttribute("class", "buttonOFF");
  }else{
    button.setAttribute("class", "buttonON");
  }
  var node = document.createTextNode(device_type + "_" + device_id);
  button.appendChild(node);
  var buttons = document.getElementById("form1");
  buttons.appendChild(button);
  button.html_id = html_id;
  button.device_type = device_type;
  button.device_id = device_id;
  button.button_function = 'light';
  button.image = {};
  button.onclick = function(event) {
    event.preventDefault();
    console.log("light Button clicked");

    var new_state = ToggleFeatureButton(this.device_id, this.html_id, this.button_function, this.device_type);
    // NEED TO CHANGE BUTTON IMAGE HERE !!!
    var info = {state:new_state, device_type:this.device_type, id:this.device_id};
    var data = ajax.CreateForm(info);
    ajax.send('/PHP/LightControl.php', 'POST', data, responseCallback, false);
  }
  return;
}

function CreateNewCameraDevice(device_ip_addr){
  device_type = 'camera';
  last_device_added = DevicesList.length - 1;
  //device_id = DevicesList[last_device_added].id + 1;
  device_id = AddDeviceToDatabase(device_type, device_ip_addr);
  html_id = device_type + "-" + device_id; // NEED TO ADD ARRAY OF BUTTONS FOR EACH DEVICE !!!
  new_device = Device(device_id, device_type, html_id, 'OFF');
  DevicesList.push(new_device);
  //console.log(new_device.html_id);
  console.log(device_id);
  console.log(DevicesList[device_id].html_id);
  // NEED TO USE IMAGE ID CANT JUST PASS THIS IN !!!!!! 2 VIDS WONT WORK !!
   var image = CreateVideoImageFrame(device_id, html_id, device_type);
   CreateVideoButtons(device_id, html_id, device_type, image, 'none');

  return;
};

function CreateVideoButtons(device_id, html_id, device_type, image, data) {
  // ON/OFF button, FACE RECON, ATTENDANCE, CARS ETC...
  var buttons_row = document.createElement("div");
  buttons_row.setAttribute("class", "row");
  var row_id = "buttons" + html_id;
  var video_frame = document.getElementById(device_id);
  video_frame.appendChild(buttons_row);
  var button_id = 1;
  if(data != 'none'){
    var device_status = data.status;
    var face_detect = data.face_detect;
    var room_attendance = data.room_attendance;
  }
  CreateVideoButton(device_id, html_id, device_type, "Camera_ON/OFF", button_id, buttons_row, image, device_status);
  button_id += 1;
  CreateVideoButton(device_id, html_id, device_type, "Face_Detect", button_id, buttons_row, image, face_detect);
  button_id+=1;
  CreateVideoButton(device_id, html_id, device_type, "Room_Attendance", button_id, buttons_row, image, room_attendance);
  return;
}

function CreateVideoButton(device_id, html_id, device_type, button_function, button_id, buttons_row, image, function_status) {
  var button = document.createElement("button");
  button_html_id = html_id + "button" + button_id;
  button.setAttribute("id", button_html_id); //
  var button_class = "button" + button_function;
  
  if(button_function == "Camera_ON/OFF") {
    var node = document.createTextNode("cam" + device_id + "ON/OFF");
  }else{
    var node = document.createTextNode("cam" + device_id + button_function);
  }
  button.appendChild(node);
  buttons_row.appendChild(button);
  DevicesList[device_id].buttons.push(button_html_id);
  console.log(DevicesList[device_id].buttons[button_id]);
  button.html_id = button_html_id;
  button.device_type = device_type;
  button.device_id = device_id;
  button.button_function = button_function;
  button.image = image;
  DevicesList[device_id].PlayVideo = function(img){
    var date = new Date();
    vid_frame = "Images/video_frame" + parseInt(device_id) +".jpg?ver";
    img.setAttribute("src", vid_frame + date.getTime());//vid_frame + date.getTime());
    //console.log("PLAYING VIDEO");
    //console.log(vid_frame);
    return;
  }
  button.onclick = function(event) {
    event.preventDefault();
    console.log("Camera Button clicked");
    console.log(DevicesList[this.device_id].html_id);
    switch(this.button_function){
      case "Camera_ON/OFF":
        //var new_state = ToggleButton(this.device_id, this.html_id);
        var new_state = ToggleFeatureButton(this.device_id, this.html_id, this.button_function, this.device_type);
        if(new_state == "ON"){
            var img = this.image;
            console.log("setting interval");
            var dev = DevicesList[this.device_id];
            play = function(){ dev.PlayVideo(img); }
            this.vid_timer = setInterval(play, 100);

        }
        if(new_state == 'OFF'){
          clearInterval(this.vid_timer);
        }
        break;
      case "Face_Detect":
        console.log("Facial Recog button");
        ToggleFeatureButton(this.device_id, this.html_id, this.button_function, this.device_type);
        break;
      case "Room_Attendance":
        console.log("Room_Attendance button");
        ToggleFeatureButton(this.device_id, this.html_id, this.button_function, this.device_type);
        break;
      case "Fire_Detect":
        console.log("fire detect button");
        break;
      default:
        console.log("button onclick case statements failed !!!");
        break;
    }
  }

  if(function_status == 'OFF' ){
    button.setAttribute("class", "buttonOFF");
  }else{
    button.setAttribute("class", "buttonON");
    var img = button.image;
    console.log("setting interval");
    var dev = DevicesList[button.device_id];
    play = function(){ dev.PlayVideo(img); }
    button.vid_timer = setInterval(play, 100);
  }
  return;
}

function CreateVideoImageFrame(frame_id, html_id, device_type) {

  var video_frame = document.createElement("div");
  video_frame.setAttribute("id", frame_id);
  video_frame.setAttribute("class", "VideoFrame");

  // load the image. PUT INTO A ROW. Then put buttons to 2nd ROW WITH 3 COL's
   var image_row = document.createElement("div");
   image_row.setAttribute("class", "row");
   var image = document.createElement("img"); //???????????????????
   image.setAttribute("id", "video_image" + frame_id);
   image.setAttribute("src", "Images/video_frame.jpg");
   image.setAttribute("class", "VideoImage");
   image_row.appendChild(image);
   video_frame.appendChild(image_row);

    var videos = document.getElementById("VideoStreams");
    videos.appendChild(video_frame);
    return image;
}

function ToggleButton(device_id, html_id) {
  if(DevicesList[device_id].status == 'OFF'){
    new_state = 'ON';
    DevicesList[device_id].status = 'ON';
    document.getElementById(html_id).setAttribute("class", "buttonON");
  }else{
    new_state = 'OFF';
    DevicesList[device_id].status = 'OFF';
    document.getElementById(html_id).setAttribute("class", "buttonOFF");
  }
  return new_state;
};

function ToggleFeatureButton(device_id, html_id, button_function, device_type) {
  // first get the data from the SQL SERVER TO SYNC. and get data.

  var curr_feature_status = SynchronizeDeviceData('recv',device_id, button_function, device_type, 'none');
  console.log(curr_feature_status);
  if(curr_feature_status == 'OFF'){
    document.getElementById(html_id).setAttribute("class", "buttonON");
    var new_state = 'ON';
    console.log("here before SEND !!!");
    SynchronizeDeviceData('send', device_id, button_function, device_type, new_state);
  }else {
    // turn it off.
    console.log("ASDFJALJEIF");
    var new_state = 'OFF';
    SynchronizeDeviceData('send', device_id, button_function, device_type, new_state);
    document.getElementById(html_id).setAttribute("class", "buttonOFF");
  }

  return new_state;
};

// THIS FUNCTION IS USED FOR BOTH GETTING INFO FROM SQL AND UPDATING INFO IN SQL DATABASE.
function SynchronizeDeviceData(send_recv, device_id, button_function, device_type, new_state) {
    console.log(new_state);
    console.log(button_function);
    console.log('sync');
  // if(button_function == 'Camera_ON/OFF'){
  //   var php_script = '/PHP/CameraControl.php';
  // }
  if(button_function == 'light'){
    console.log('syncing light got here @@!!!');
    var php_script = '/PHP/LightControl.php';
  }else {
    var php_script = '/PHP/CameraControl.php';
  }

  if(send_recv == 'recv') {
    var info = {data_request:button_function, device_type:device_type, id:device_id}
    var data = ajax.CreateForm(info);
    var response = ajax.send('/PHP/RequestData.php', 'POST', data, false);
    console.log("recieve R  ");
    var json = JSON.parse(response);
    res = json.msg;
    console.log(res);

    return res; // ON or OFF Returned.
  }else {
    console.log("send S  ");
    var info = {state:new_state, function:button_function, device_type:device_type, id:device_id};
    var data = ajax.CreateForm(info);
    var response = ajax.send(php_script, 'POST', data, false);
    return response;
  }

  console.log("ERROR IN SychronizeDeviceData() !!!");
  return;
  // finish this and test with 1 sql entry.

}


function CreateAddDeviceElements() {
  // EVENT HANDLER FOR THE ADD NEW DEVICE BUTTON
  document.getElementById("AddNewDevice").onclick = function(event) {
    document.getElementById("AddDevice_Form").setAttribute("class", "header2");
    document.getElementById("AddDevice_text1").value = "Select Device type";
    return; // end of AddNewDevice.onclick
  }
  document.getElementById("dropbut").onclick = function(event) {
      document.getElementById("myDropdown").classList.toggle("show");
  }
  document.getElementById("drop1").onclick = function(event){
    document.getElementById("AddDevice_text1").value = "light";
  }
  document.getElementById("drop2").onclick = function(event){
    document.getElementById("AddDevice_text1").value = "camera"
  }
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  document.getElementById("AddDevice_Submit").onclick = function(event) {
    var device_type = document.getElementById("AddDevice_text1").value;
    var ip_addr = document.getElementById("AddDevice_text2").value;
    // MAKE DEVICE SELECTION A DROPDOWN MENU !!!!!!!!
    if(device_type == 'light') {
      CreateNewLightDevice(ip_addr);
    }
    else if(device_type == 'camera') {
      CreateNewCameraDevice(ip_addr);
    }
    else {
      console.log("Invalid device type or ip entered !!!");
    }
    return; //end of slidersubmit onclick.
  }

  document.getElementById("AddDevice_Cancel").onclick = function(event) {
    document.getElementById("AddDevice_Form").setAttribute("class", "invisible");
    return;
  }

  return;
}

function AddFaceToDB(name) {
  console.log(name);
  var php_script = '/PHP/AddFace.php';
  var info = {name:name};
  console.log(info.name);
  var data = ajax.CreateForm(info);
  var response = ajax.send(php_script, 'POST', data, false);
  console.log(response);
  return;
}
function CreateAddFaceElements() {
  // EVENT HANDLER FOR THE ADD NEW FACE BUTTON
  document.getElementById("AddNewFace_Button").onclick = function(event) {
    document.getElementById("AddFace_Form").setAttribute("class", "header2");
    return;
  }
  document.getElementById("AddFace_Cancel").onclick = function(event) {
    document.getElementById("AddFace_Form").setAttribute("class", "invisible");
    return;
  }

  document.getElementById("AddFace_Submit").onclick = function(event) {
    var name = document.getElementById("AddFace_text1").value;
    document.getElementById("AddFace_Form").setAttribute("class", "invisible");
    console.log("face button");
    AddFaceToDB(name);
    return;
  }

  return;
}

function PlayVideo() {
  var date = new Date();
  var str = 'pic.jpg';
  document.getElementById("video_id").src = "pic.jpg?ver" + date.getTime();
  console.log("testing pic update");
  return;
}

function UIsetUp() {
  CreateAddDeviceElements();
  CreateAddFaceElements();

  document.getElementById("testingbutton").onclick = function(event){
    setInterval("PlayVideo()", 300);
  }

  return; // END OF UIsetUp.
}



function start_devices() {
  LoadDevicesFromDatabase();
  return;
}
start_devices();
UIsetUp();
