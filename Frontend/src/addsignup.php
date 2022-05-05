<?php
function getBaseUrl(){
    $host_ip = getenv('BACKEND_IP');
    $port = '3000';
    $base_url = 'http://'.$host_ip.':'.$port."/auth/signup";
    //echo($base_url);
    return $base_url;
}

//function signUp(){
    $user=$_POST["floatingInput"];
    $password=$_POST["floatingPassword"];
    $Empid=$_POST["floatingEmpid"];
        $data = array(
            "username"=> $user,
            "password"=> $password,
            "employeeID"=> $Empid,
        );

    $ch= curl_init(getBaseUrl());
 
    curl_setopt($ch,CURLOPT_FOLLOWLOCATION,true);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLINFO_HEADER_OUT, true);
    curl_setopt($ch, CURLOPT_COOKIESESSION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $result= curl_exec($ch);
    
   var_dump($result);
curl_close($ch);
//if $result
//header("Location: http://localhost:8000/signupsucess.php");
//exit();
//}
?>