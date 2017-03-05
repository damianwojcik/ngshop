<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

    }

    public function get($id = false)
    {

        $this->load->model('admin/Products_model');
        $result = $this->Products_model->get($id);

        echo json_encode($result);
    }

}
