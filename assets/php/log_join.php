<?php
// Receive data from SA-MP Server
$name = $_POST['name'] ?? '';
$ip = $_POST['ip'] ?? '';

if(!empty($name)) {
    $data = ["name" => $name, "ip" => $ip, "time" => time()];
    // Save to JSON File
    file_put_contents('last_join.json', json_encode($data));
}
?>