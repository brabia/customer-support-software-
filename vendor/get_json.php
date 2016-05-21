<?php	
	header("Access-Control-Allow-Origin: *");
	// echo '<pre>';print_r($_SERVER);
	if(!isset($_SERVER['HTTP_X_REQUESTED_WITH']) OR !isset($_SERVER['HTTP_REFERER'])){
		die('tteyryrey');
	}	
	
	$conversionId 	= $_GET['conversionId'];
	if($conversionId != ''){		
		$conversionURL = 'messages/'.$conversionId.'.json';
		if(!file_exists($conversionURL)){
			$data = '{"conversion": {"id": "'.$conversionId.'"}, "messages":[]}';
			$fh = fopen($conversionURL, 'w') or die("can't open file");
			fwrite($fh, $data);
			fclose($fh);
		}else{
			echo file_get_contents($conversionURL);
		}
	}
	
?>