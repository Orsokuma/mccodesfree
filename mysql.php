<?php
require __DIR__ . '/vendor/autoload.php';
$c = mysql_connect('localhost', 'root', 'root') or die(mysql_error());
mysql_select_db('mccodesfree', $c);