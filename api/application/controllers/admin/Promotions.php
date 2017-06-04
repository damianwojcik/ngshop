<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Promotions extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('admin/Promotions_model');

        $token = $this->input->post('token');
        $token = $this->jwt->decode($token, config_item('encryption_key'));

        if ($token->role != 'admin') {

            exit('You are not admin');

        }

    }

    public function get( $id = false )
    {

        $result = $this->Promotions_model->get($id);

        echo json_encode($result);
    }

    public function create()
    {

        $promotion = $this->input->post('promotion');
        $this->Promotions_model->create($promotion);

    }

    public function delete()
    {

        $promotion = $this->input->post('promotion');
        $this->Promotions_model->delete($promotion);
        $imageSrc = $this->input->post('promotion')['src'];
        $imagePath = FCPATH . '..' . DIRECTORY_SEPARATOR . $imageSrc;
        unlink($imagePath);

    }

}
