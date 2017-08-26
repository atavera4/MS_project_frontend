<?php
// laskhfahflkasd
error_reporting(E_ALL);
error_reporting(E_ERROR | E_WARNING | E_PARSE);
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

$device_id = $_POST["id"];
$device_name = $_POST["name"];
$device = $_POST["device"];
$device_ip = $_POST["ip_addr"];
$device_type = $_POST["type"];

// // INSERT NEW ITEM INTO SQL TABLE
$query = "INSERT INTO Devices (name, status, face_detect,
  room_attendance, fire_detect, vehicle_detect, device_ip_addr, device_type, last_update) VALUES(?,?,?,?,?,?,?,?,?)";
$stmt = mysqli_prepare($database, $query);
$init_state = 'OFF';
$d = '1234';
$date = date("Y-m-d H:i:s", mktime(10, 30, 0, 3, 30, 2017));
mysqli_stmt_bind_param($stmt, "sssssssss", $device_name, $init_state, $init_state, $init_state, $init_state, $init_state, $device_ip, $device_type,$date);
mysqli_stmt_execute($stmt);

// rE ADJUST THE ID'S SO THAT THEY ARE IN ORDER WHEN DELETING AN ITEM.
// ALTER TABLE Devices drop id;
// ALTER TABLE Devices ADD id INT NOT NULL AUTO_INCREMENT PRIMARY KEY FIRST;
// DELETE FROM Devices WHERE id=4;
// clear entire table ???
//  DELETE FROM DEVICES;


echo "  Adding new device  " . $device_name;

?>
