<?php
	require 'config.php';


	$query = "INSERT INTO blog_blog (title, content, date)
												VALUES ('{$_POST['title']}', '{$_POST['content']}', NOW())";

	mysql_query($query) or die('新增失败！'.mysql_error());

	sleep(3);
	echo mysql_affected_rows();

	mysql_close();
?>