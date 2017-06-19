<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('site/Products_model');

    }

    public function get( $id = false )
    {

        $result = $this->Products_model->get($id);

        echo json_encode($result);
    }

    public function getByCategoryId( $id = false )
    {

        $result = $this->Products_model->getByCategoryId($id);

        echo json_encode($result);
    }

    public function getCategoryName( $id )
    {

        $result = $this->Products_model->getCategoryName($id);

        echo json_encode($result);
    }

    public function getByCategorySlug( $slug )
    {

        $result = $this->Products_model->getByCategorySlug($slug);

        echo json_encode($result);
    }

    public function getPromos( )
    {

        $result = $this->Products_model->getPromos();

        echo json_encode($result);
    }

    public function getImages( $id ) {

        $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
        $basePath = $basePath . $id . DIRECTORY_SEPARATOR;

        if ( !is_dir($basePath) ) {
            return;
        }

        $files = scandir($basePath);
        $files = array_diff($files, array('.', '..'));

        $newFiles = array();

        foreach ($files as $file) {
            $newFiles[] .= $file;
        }

        echo json_encode($newFiles);

    }

}
