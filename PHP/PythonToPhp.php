

<?php

$responseObject = new stdClass();
$responseObject->success = 0;
$responseObject->msg = '';

// Function to print out objects / arrays
function PrintObj ($o) { echo "<pre>";
	print_r($o); 

	echo "</pre>"; 
	// echo $o;
	// $responseObject->msg = "works";
	// $jsonResponseObject = json_encode($responseObject);
	// echo $jsonResponseObject;
}

// Load the POST.
$data = file_get_contents("php://input");

// ...and decode it into a PHP array.
$data = json_decode($data); 

// Do whatever with the array. 
PrintObj($data);
// send to JS
?>

