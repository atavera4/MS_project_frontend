<?php

error_reporting(E_ALL);
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', 1);
$responseObject = new stdClass();
$responseObject->success = 0;
$responseObject->msg = '';
$responseObject->sql_msg = '';
$responseObject->error_msg = '';
$responseObject->Data = [];
// Device info
$DeviceArray = [];

DEFINE ('DB_USER', 'root');
DEFINE ('DB_PASSWORD', 'automationproject!');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'Auto_System_Project');

// Connect to SQL Database
$database = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
          OR die('Could not connect to MySQL ' . mysqli_connect_error($database) );
if($database) { $responseObject->error_msg = 'works database'; }


$Load = $_POST["load"];
// Get info from SQL TABLE

$SQL_cmd = "SELECT * FROM Devices";
$query = $SQL_cmd;
$response = @mysqli_query($database, $query);
if($response) { $responseObject->sql_msg = ' response success !!!'; }
else {$responseObject->sql_msg = 'response failed in RequestData.php!!!'; }

$row = mysqli_fetch_array($response);

while($row != FALSE) {
  $device = new stdClass();
  $device->id = $row[0];
  $device->name = $row[1];
  $device->status = $row[2];
  $device->face_detect = $row[3];
  $device->room_attendance = $row[4];
  $device->fire_detect = $row[5];
  $device->vehicle_detect = $row[6];
  $device->ip_addr = $row[7];
  $device->type = $row[8];
  $device->last_update = $row[9];
  array_push($DeviceArray, $device);
  $row = mysqli_fetch_array($response);
}

$responseObject->Data = $DeviceArray;
$jsonResponseObject = json_encode($responseObject);
echo $jsonResponseObject;


?>
