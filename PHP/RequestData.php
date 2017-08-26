<?php

ini_set('display_errors', 1);
$responseObject = new stdClass();
$responseObject->success = 0;
$responseObject->error_msg = '';
$responseObject->msg = '';
$responseObject->sql_msg = '';

DEFINE ('DB_USER', 'root');
DEFINE ('DB_PASSWORD', 'automationproject!');
DEFINE ('DB_HOST', 'localhost');
DEFINE ('DB_NAME', 'Auto_System_Project');

// Connect to SQL Database
$database = @mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)
          OR die('Could not connect to MySQL ' . mysqli_connect_error($database) );
if($database) { $responseObject->error_msg = 'works database'; }


$function = $_POST["data_request"];
//$responseObject->other = $state;
switch($function) {
  case 'Latest_Id':
    // get the id of last added device.
    $query_cmd = "SELECT id FROM Devices ORDER BY id DESC LIMIT 1";
    $response = @mysqli_query($database, $query_cmd);
    if($response) { $responseObject->sql_msg = ' response success !!! ';}
    else { $responseObject->sql_msg = 'response failed in RequestData.php!!!';}
    $row = mysqli_fetch_array($response);
    if($row == FALSE){$responseObject->msg = 0; }
    else {$responseObject->msg = $row[0]; }
    $jsonResponseObject = json_encode($responseObject);
    echo $jsonResponseObject;
    break;

  case 'Face_Detect':
    $id = $_POST["id"];
    $query_cmd = "SELECT face_detect FROM Devices WHERE id=" . "$id";
    $response = @mysqli_query($database, $query_cmd);
    if($response) { $responseObject->sql_msg = ' response success !!! '; }
    else { $responseObject->sql_msg = ' response failed in RequestData.php !!!'; }
    $row = mysqli_fetch_array($response);
    if($row == FALSE) {$responseObject->msg = 0; }
    else {$responseObject->msg = $row[0]; }
    $jsonResponseObject = json_encode($responseObject);
    echo $jsonResponseObject;
    break;

  case 'Room_Attendance':
    $id = $_POST['id'];
    $query_cmd = "SELECT room_attendance FROM Devices WHERE id=" . "$id";
    $response = @mysqli_query($database, $query_cmd);
    if($response) { $responseObject->sql_msg = ' response success !!! '; }
    else { $responseObject->sql_msg = ' response failed in RequestData.php !!!'; }
    $row = mysqli_fetch_array($response);
    if($row == FALSE) {$responseObject->msg = 0; }
    else {$responseObject->msg = $row[0]; }
    $jsonResponseObject = json_encode($responseObject);
    echo $jsonResponseObject;
    break;

  case 'Camera_ON/OFF':
    $id = $_POST["id"];
    $query_cmd = "SELECT status FROM Devices WHERE id=" . "$id";
    $response = @mysqli_query($database, $query_cmd);
    if($response) { $responseObject->sql_msg = ' respnse success !!! '; }
    else { $responseObject->sql_msg = ' response failed in ReqData.php sql '; }
    $row = mysqli_fetch_array($response);
    if($row == FALSE) {$responseObject->msg = 0; }
    else {$responseObject->msg = $row[0]; }
    $jsonResponseObject = json_encode($responseObject);
    echo $jsonResponseObject;
    break;

  case "light":
    $id = $_POST["id"];
    $query_cmd = "SELECT status FROM Devices WHERE id=" . "$id";
    $response = @mysqli_query($database, $query_cmd);
    if($response) { $responseObject->sql_msg = ' response success !!!'; }
    else { $responseObject->sql_msg = ' SQL respone failed in ReqData.php !!'; }
    $row = mysqli_fetch_array($response);
    if($row == FALSE) { $responseObject->msg = 0; }
    else { $responseObject->msg = $row[0]; }
    $jsonResponseObject = json_encode($responseObject);
    echo $jsonResponseObject;
    break;

  default:
    echo 'switch failed !!!';
}

exit;

?>
