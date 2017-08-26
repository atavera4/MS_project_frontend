var ajax = {};
ajax.x = function() {
  var xhr = new XMLHttpRequest();
  return xhr;
};

ajax.send = function(url, method, data, responseCallback, sync) {
  var xhr = ajax.x();
  xhr.open(method, url, sync);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var result = xhr.responseText;
      console.log("Result: " + result);
    }
  };
  xhr.send(data);
};

ajax.CreateForm = function(data) {
  form_data = new FormData();
  for(item in data) {
    form_data.append(item, data[item]);
  }
  return form_data;
}


var app = {};
app.init = function () {
  console.log('app initiated');
  responseBox = document.getElementById('responseBox');
  responseCallback = function (response){
    responseObject = JSON.parse(response);
    console.log(responseObject);
    if (responseObject.success !== 1) {
      responseBox.innerHTML = responseObject.msg;
    }
  }
  // var device_id = 0;
  // for(device_id =0; device_id <= DevicesList.length; device_id ++){
  //
  // }
  // Button Actions
  // put this in a for loop. but first test the video frame. then comes the notification and google drive setup.
  // document.getElementById(DevicesList[1].html_id).onclick = function(event){
  //   event.preventDefault();
  //   console.log("light ON clicked !!");
  //   new_state = ToggleButton(1);
  //
  //   var info = {state:new_state, device_type:DevicesList[1].type, id:DevicesList[1].id};//{state: 1, device_type: 'light', id: };
  //   var data = ajax.CreateForm(info);
  //   ajax.send('/PHP/LightControl.php', 'POST', data, responseCallback, false);
  // }

  // document.getElementById("Camera-ON").onclick = function(event){
  //   event.preventDefault();
  //   console.log("Camera ON clicked !");
  //   var info = {state: 'ON', device_type: DeviceList[2].type, id:DeviceList[2].id};
  //   var data = ajax.CreateForm(info);
  //   ajax.send('/PHP/LightControl.php', 'POST', data, responseCallback, false);
  // }
  // document.getElementById("Camera-OFF").onclick = function(event){
  //   event.preventDefault();
  //   console.log("Camera OFF clicked !");
  //   var info = {state: 0, device:"camera"};
  //   var data = ajax.CreateForm(info);
  //   ajax.send('/PHP/LightControl.php', 'POST', data, responseCallback, false);
  // }

  return; // end of init function.
}

app.init();
