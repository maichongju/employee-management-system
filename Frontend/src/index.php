<?php
session_start();
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
 
    
       
         $html= json_decode($html);
         $details= ($html->content);       
       $_SESSION["ID"]=($details->employee_id);
       $_SESSION["role"]=($details->role);
     
      //  setcookie($cookie_name, $cookie_value, time() + (86400 * 30), "/");
  
 var_dump($_SESSION["ID"]);
 var_dump($_SESSION["role"]);
curl_close($ch);
//var_dump($html);
exit();
//}


// function settingCook(){
//     $i=0;
//     $content=file('./cookies.txt');
//     $cookiesArr=extractCookies($content);
// var_dump($cookiesArr);

//         foreach ($cookiesArr as $line){
//             $name = array_column($cookiesArr, 'name');
//             $value = array_column($cookiesArr, 'value');
//         }

       
// }


// function extractCookies($lines) {
//   var_dump($string);
//   $cookiesArr=array();
//    foreach($lines as $line) {
   
//         $cookie = array();

//         detect httponly cookies and remove #HttpOnly prefix
//         if (substr($line, 0, 10) == '#HttpOnly_') {
//             $line = substr($line, 10);
//            $cookie['httponly'] = true;
//         } else {
//            $cookie['httponly'] = false;
//         } 

//         we only care for valid cookie def lines
//         if( strlen( $line ) > 0 && $line[0] != '#' && substr_count($line, "\t") == 6) {

//             get tokens in an array
//             $tokens = explode("\t", $line);

//             trim the tokens
//             $tokens = array_map('trim', $tokens);

           
//             $cookie['name'] = urldecode($tokens[5]);   // The name of the variable.
//             $cookie['value'] = urldecode($tokens[6]);  // The value of the variable.

//             Convert date to a readable format

//             Record the cookie.
//             $cookies[]= $cookie;
//            var_dump($cookies);
           
           
//         }
        
    
//     }
//     var_dump($cookies);
//     return $cookies;
   
// }



// exit();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>Login</title>
    <meta content="width=device-width, initial-scale=1.0" name="viewport">
    <meta content="" name="keywords">
    <meta content="" name="description">

    <!-- Favicon -->
    <link href="img/favicon.ico" rel="icon">

    <!-- Google Web Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Icon Font Stylesheet -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">

    <!-- Libraries Stylesheet -->
    <link href="lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet">
    <link href="lib/tempusdominus/css/tempusdominus-bootstrap-4.min.css" rel="stylesheet" />

    <!-- Customized Bootstrap Stylesheet -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- Template Stylesheet -->
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <div class="container-xxl position-relative bg-white d-flex p-0">
        <!-- Spinner Start -->
        <div id="spinner" class="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <!-- Spinner End -->


        <!-- Sign In Start -->
        <div class="container-fluid">
            <div class="row h-100 align-items-center justify-content-center" style="min-height: 100vh;">
                <div class="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
                    <div class="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                        <div class="d-flex align-items-center justify-content-between mb-3">
                            <a href="index.html" class="">
                                <h3 class="text-primary"><i class="fa fa-hashtag me-2"></i>EMS</h3>
                            </a>
                            <h3>Sign In</h3>
                        </div>
                        <div class="form-floating mb-3">
                        <form class="login" name="loginForm" onsubmit="return returnvalidateLoginForm()" >
                            <input type="email" class="form-control" name="floatingInput" id="floatingInput" placeholder="name@example.com">
                            <label for="floatingInput">Email address</label>
                        </div>
                        <div class="form-floating mb-4">
                            <input type="password" class="form-control" name="floatingPassword" id="floatingPassword" placeholder="Password">
                            <label for="floatingPassword">Password</label>
                        </div>
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            
                            <a href="http://localhost:8000/signup.php">Sign Up</a>
                        </div>
                        <button type="submit" value= "login" class="btn btn-primary py-3 w-100 mb-4">Sign In</button>
                       </form>
                        
                    </div>
                </div>
            </div>
        </div>
        <!-- Sign In End -->
    </div>

    <!-- JavaScript Libraries -->
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="lib/chart/chart.min.js"></script>
    <script src="lib/easing/easing.min.js"></script>
    <script src="lib/waypoints/waypoints.min.js"></script>
    <script src="lib/owlcarousel/owl.carousel.min.js"></script>
    <script src="lib/tempusdominus/js/moment.min.js"></script>
    <script src="lib/tempusdominus/js/moment-timezone.min.js"></script>
    <script src="lib/tempusdominus/js/tempusdominus-bootstrap-4.min.js"></script>

    <!-- Template Javascript -->
    <script src="js/main.js"></script>
</body>
<script>
    function returnvalidateLoginForm(){
    var uname = document.getElementById("floatingInput").value;
		var pwd = document.getElementById("floatingPassword").value;
		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(uname =='')
		{
			alert("please enter user name.");
		}
		else if(pwd=='')
		{
        	alert("enter the password");
		}
		else if(!filter.test(uname))
		{
			alert("Enter valid email id.");
		}
		
		else
		{
	alert('Thank You for Login');
     
  //Redirecting to other page or webste code or you can set your own html page.
 
    window.location = "http://localhost:8000/login.php";
    return false;
      
			}
	}
	//Reset Inputfield code.
	function clearFunc()
	{
		document.getElementById("floatingInput").value="";
		document.getElementById("floatingPassword").value="";
	}	
</script>

</html>