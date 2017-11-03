<?php
    
    function _alert($error){
        echo "<script>
                alert('$error');
                history.back();
                </script>
                ";
        exit();
    }
    function database($db_name,$command){
            
        $conn=@mysql_connect('localhost','root','1125')or die("connect failed ".mysql_error());
         mysql_select_db($db_name) or die("select fail ".mysql_error());
         $result=mysql_query($command) or die("query fail ".mysql_error());
         return $result;
        
    }
    
    function _check_username($username){
        $pattern='/[()<>\'\"\ \　\-\——]/';
        if($username==""){
            
            _alert('Please enter username');
        }
        if(preg_match($pattern, $username)){
            _alert('Unallowing special charactors');
            
        }
        elseif(mb_strlen($username)>20){
            
            _alert('username is too long');
        }
        $command="SELECT *FROM login WHERE (username='$username')";
        
       $result=database('jessical', $command);
       $last=mysql_fetch_array($result,MYSQL_ASSOC);
       
        if($username==$last['username']){
            _alert('the username have registed');
            echo "<script>
                        $('#username').focus();
                    </script>";
        }
        return $username;
    }
    function _check_pwd($password,$second_pwd){
        
        if(strlen($password)<6){
            
            _alert('password too short');
        }
        elseif($password!=$second_pwd){
            
            _alert('unmatch password');
        }
        
        return $password;
    }

?>