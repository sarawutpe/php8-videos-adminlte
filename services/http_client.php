<?php
include_once 'db.php';

class HttpClient
{
    public function getVideos()
    {
        $connection = new SqlConnection();
        $db = $connection->open();
    }
}
