<?php

ini_set('display_errors', 1);
$responseObject = new stdClass();
$responseObject->success = 0;
$responseObject->msg = '';

DEFINE ('DB_USER', 'root');
DEFINE ('DB_PASSWORD', 'automationproject!');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'Auto_System_Project');

// Connect to SQL Database
$database = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
          OR die('Could not connect to MySQL ' . mysqli_connect_error($database) );
if($database) { echo 'works database'; }

$button_func = $_POST["function"];
$state = $_POST["state"];
$device_type = $_POST["device_type"];

$user_input = $state . "_" . $button_func;
$update_cmd = "";
echo '  here php  ';
echo $button_func;
echo ' ';
echo $state;
echo ' ';
echo $user_input;
echo '   ';
switch($user_input){
  case 'ON_Camera_ON/OFF':
    $id = $_POST["id"];
    $update_cmd = "UPDATE Devices SET status='ON' WHERE id=" . "$id";
    break;
  case 'OFF_Camera_ON/OFF':
    $id= $_POST["id"];
    $update_cmd = "UPDATE Devices SET status='OFF' WHERE id=" . "$id";
    break;
  case 'ON_Face_Detect':
    $id = $_POST["id"];
    $update_cmd = "UPDATE Devices SET face_detect='ON' WHERE id=" . "$id";
    break;
  case 'OFF_Face_Detect':
    $id = $_POST["id"];
    $update_cmd = "UPDATE Devices SET face_detect='OFF' WHERE id=" . "$id";
    break;
  case 'ON_Room_Attendance':
  $id = $_POST["id"];
  $update_cmd = "UPDATE Devices SET room_attendance='ON' WHERE id=" . "$id";
  break;
  case 'OFF_Room_Attendance':
    $id= $_POST["id"];
    $update_cmd = "UPDATE Devices SET room_attendance='OFF' WHERE id=" . "$id";
    break;
  //
  default:
    echo "switch statements failed !!";
    break;
}

$stmt = mysqli_prepare($database, $update_cmd) OR die('  prepare failed !!');
mysqli_stmt_execute($stmt);


$responseObject->msg = $_POST["state"];
$jsonResponseObject = json_encode($responseObject);
echo $jsonResponseObject;
exit;

?>
