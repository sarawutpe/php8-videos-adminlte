<?php
class SqlConnection
{
    private $db_host = "localhost";
    private $db_username = "";
    private $db_password = "";
    private $db_dbname = "";
    protected $db;

    // open connection
    public function open()
    {
        try {
            $this->db = new PDO("pgsql:host=$this->db_host;port=5432;dbname=$this->db_dbname", $this->db_username, $this->db_password);
            return $this->db;
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }

    // close connection
    public function close()
    {
        $this->db = null;
    }
}
