var ajax = {};
ajax.x = function() {
  var xhr = new XMLHttpRequest();
  return xhr;
};

ajax.send = function(url, method, data, responseCallback, sync) {
  var xhr = ajax.x();
  var respone;
  xhr.open(method, url, sync);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var result = xhr.responseText;
      console.log("Result: " + result);
      response = result;
    }
  };
  xhr.send(data);
  return response;
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
  return; // end of init function.
}

app.init();
