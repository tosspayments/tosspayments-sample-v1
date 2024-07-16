<?php
$postData = file_get_contents('php://input');
$json = json_decode($postData);

$secret = $json->secret;
$status = $json->status;
$orderId = $json->orderId;

?>

<p>secret : <?php echo $secret ?></p>
<p>status : <?php echo $status ?></p>
<p>orderId : <?php echo $orderId ?></p>

