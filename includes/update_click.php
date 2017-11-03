<?php
 require 'function.php';
 
 $name=$_GET['name'];
 $count=$_GET['count'];
 $command="UPDATE videos SET playtimes=$count WHERE videoname='$name'";
 $con=database('jessical',$command);
 echo $count;
	
?>