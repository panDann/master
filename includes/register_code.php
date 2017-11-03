<?php
header('Content-Type:text/html;charset=utf-8');
for($i=0;$i<4;$i++){
    $_nnumb.=dechex(mt_rand(0,15));
}

session_start();
$_SESSION['register_code']=$_nnumb;

$_width=75;
$_height=25;

$_img=imagecreatetruecolor(75,25);

$_white=imagecolorallocate($_img,255,255,255);
$_black=imagecolorallocate($_img,0,0,0);
imagefill($_img, 0, 0, $_white);
// imagerectangle($_img,0,0,$_width-1,$_height-1,$_black);

for ($i=0;$i<6;$i++){
    
    $_md_color=imagecolorallocate($_img,mt_rand(0,255),mt_rand(0,255),mt_rand(0,255));
    imageline($_img,mt_rand(0,$_width),mt_rand(0,$_height),mt_rand(0,$_width),mt_rand(0,$_height),$_md_color);
}

for($i=0;$i<100;$i++){
    
    $_td_color=imagecolorallocate($_img,mt_rand(200,255),mt_rand(200,255),mt_rand(200,255));
    imagestring($_img,1,mt_rand(0,$_width),mt_rand(1,$_height),'*',$_td_color);
}

for($i=0;$i<strlen($_SESSION['register_code']);$i++){
    
    imagestring($_img,mt_rand(3,5), $i*$_width/strlen($_SESSION['register_code'])+mt_rand(1,10),mt_rand(1,$_height/2),$_SESSION['register_code'][$i], $_black);
    
}
header('Content-Type:image/png');
imagepng($_img);
imagedestroy($_img);

?>