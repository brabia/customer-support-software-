<?php 
	header("Access-Control-Allow-Origin: *");

	$conversionId 	= $_GET['conversionId'];	
	$userId 		= $_GET['userId'];	
	$userName 		= $_GET['userName'];	
	$userAvatar		= $_GET['userAvatar'];	
	$userMessage 	= $_GET['userMessage'];
	if($conversionId != '' AND $userId != '' AND $userMessage != ''){
		
		$msg = array();
		$msg['userName'] 	= $userName;
		$msg['userAvatar']	= $userAvatar;
		$msg['userId'] 		= $userId;
		$msg['userMessage']	= $userMessage;
		$msg['time']		= date('d.m.Y H:i');
		$msg['mId']			= time();
		
		// echo '<pre>'; print_r($msg); echo '<pre>';
		
		$conversionURL = 'messages/'.$conversionId.'.json';
		if(file_exists($conversionURL)){
			$conversion = json_decode(file_get_contents($conversionURL), true);
			// echo '<pre>'; print_r($conversion); echo '<pre>';
			array_push($conversion['messages'], $msg);
			// echo '<pre>'; print_r($conversion); echo '<pre>';
			// echo json_encode($conversion);			
			file_put_contents($conversionURL, json_encode($conversion));
		}else{
			
			echo '0';
		}
	}	
?>