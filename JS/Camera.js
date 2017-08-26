// JS TO CONTROL THE CAMERAS/ TOGGLE BUTTON FUNCTIONS.
//
//
console.log("Camera JS file");
function PlayVideo() {
  var date = new Date();
  var str = 'pic.jpeg';
  document.getElementById("video_id").src = "pic.jpeg?ver" + date.getTime();
  return;
}
setInterval("PlayVideo()", 200);
