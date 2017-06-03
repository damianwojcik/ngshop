<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Categories extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('site/Categories_model');

    }

    public function get( $id = false )
    {

        $result = $this->Categories_model->get($id);

        echo json_encode($result);

    }

    public function getByCategorySlug( $slug )
    {

        $result = $this->Categories_model->getByCategorySlug($slug);

        echo json_encode($result);
    }

}
