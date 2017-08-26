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

$person_name = $_POST["name"];
$is_new = "True";
$Insert_cmd = "INSERT INTO Faces (name, is_new) VALUES (?,?)"; // INSERT NEW PERSON NAME AND ID HERE !!!!
$stmt = mysqli_prepare($database, $Insert_cmd) OR die(" prepare failed !!!");
mysqli_stmt_bind_param($stmt, "ss", $person_name, $is_new);
mysqli_stmt_execute($stmt);
//
$responseObject->msg = "works";
$jsonResponseObject = json_encode($responseObject);
echo "add face ";
echo $_POST["name"];
echo "   N";
echo $jsonResponseObject;
exit;

?>
