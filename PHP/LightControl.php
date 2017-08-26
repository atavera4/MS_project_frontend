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
if($database) { echo 'works database   '; }

$state = $_POST["state"];
$button_func = $_POST["function"];
$device_type = $_POST["device_type"];
$user_input = $state . "_" . $button_func;
$update_cmd = "";
echo $user_input;
switch($user_input){
  case 'ON_light':
    $id = $_POST["id"];
    $update_cmd = "UPDATE Devices SET status='ON' WHERE id=" . "$id";
    break;
  case 'OFF_light':
    $id = $_POST["id"];
    $update_cmd = "UPDATE Devices SET status='OFF' WHERE id=" . "$id";
    break;
  default:
    echo "  switch statements failed !!!";
    break;

}

$stmt = mysqli_prepare($database, $update_cmd) OR die('  prepare failed !!');
mysqli_stmt_execute($stmt);

$responseObject->msg = $user_input;
$jsonResponseObject = json_encode($responseObject);
echo $jsonResponseObject;
exit;

// Get info from SQL Table
// $query = "SELECT id, name, status, function FROM DEVICES";
// $response = @mysqli_query($database, $query);
// if($response) { echo ' response success !!'; } else{ echo 'response failed !! '; }
// $row = mysqli_fetch_array($response);
// if($response){
//   echo $row[name];
// }else {
//   echo ' query failed !!!';
// }
//
// // INSERT NEW ITEM INTO SQL TABLE.
// $query = "INSERT INTO DEVICES (name, state, function) VALUES(?, ?, ?)";
// $stmt = mysqli_prepare($database, $query);
// $name = 'test button';
// $state = 'OFF';
// $function = 'NONE';
// mysqli_stmt_bind_param($stmt, "sss", $name, $name, $state, $status);
// mysqli_stmt_execute($stmt);

// UPDATE Valaue in SQL Table. Make string in parts for security purposes. Input validation.
// if( ($_POST["state"] == 'ON') && ($_POST["device_type"] == 'light') ) {
//   $id = $_POST["id"];
//   $update_cmd = "UPDATE DEVICES SET status='ON' WHERE id=" . "$id";
//   echo "   here 22!!!";
// }
//else if( ($POST["state"] == 'OFF') && ($_POST["device_type"] == 'light')  )
?>
