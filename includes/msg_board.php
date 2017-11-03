<?php
 require 'function.php';
 $res=$_POST['res'];
 $user_id=$_POST['user_id'];
 $user_comment=$_POST['user_comment'];
 $user_date=$_POST['user_date'];
 $pro_count=$_POST['pro_count'];
 if($user_comment!='undefined'&&$user_comment!=''){
        $command="INSERT INTO comment (user_id,user_comment,user_date,pro_count) VALUES('$user_id','$user_comment','$user_date',0)";
        database('jessical',$command);
 } 
if($res=='comment'){
        $query="SELECT *FROM comment LIMIT 10";
        $result=database('jessical',$query);
        $i=0;
        while($last=mysql_fetch_assoc($result)){
            $arr[$i]=$last;
            $i++;
        }
    }
echo json_encode($arr);
?>