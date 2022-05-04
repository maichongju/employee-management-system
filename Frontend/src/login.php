<?php


function getBaseUrl(){
    $host_ip = getenv('BACKEND_IP');
    $port = '3000';
    $base_url = 'http://'.$host_ip.':'.$port."/auth/signin";
    //echo($base_url);
    return $base_url;
}

//function setCookies(){

        $data = array(
            "username"=> "user",
            "password"=> "password"
        );

    $ch= curl_init(getBaseUrl());
    curl_setopt($ch,CURLOPT_FOLLOWLOCATION,true);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_COOKIEJAR, './cookies.txt');
    curl_setopt($ch, CURLOPT_COOKIEFILE, './cookies.txt');
    curl_setopt($ch, CURLOPT_COOKIESESSION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);



    $html= curl_exec($ch);
    $skip = intval(curl_getinfo($ch, CURLINFO_HEADER_SIZE)); 
    $requestHeader= substr($html,0,$skip);
    $html = substr($html,$skip);
    $e = 0;
        while(true){
            $s = strpos($requestHeader,'Set-Cookie: ',$e);
            if (!$s){break;}
            $s += 12;
            $e = strpos($requestHeader,';',$s);
            $cookie = substr($requestHeader,$s,$e-$s) ;
            $s = strpos($cookie,'=');
            $key = substr($cookie,0,$s);
            $value = substr($cookie,$s);
            $cookies[$key] = $value;
        }
    
    foreach ($cookies as $key => $value){
                
        $cookie_name=$key;
        $cookie_value=$value;
    
       setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
    }
   
curl_close($ch);

header("Location: http://localhost:8000/profile.php");
//}

?>