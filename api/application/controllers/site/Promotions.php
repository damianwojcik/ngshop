<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Promotions extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('site/Promotions_model');

    }

    public function get( $id = false )
    {

        $result = $this->Promotions_model->get($id);

        echo json_encode($result);

    }

}
