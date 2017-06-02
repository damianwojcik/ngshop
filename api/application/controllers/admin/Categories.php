<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Categories extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('admin/Categories_model');
        $this->load->helper('slugify');

        $token = $this->input->post('token');
        $token = $this->jwt->decode($token, config_item('encryption_key'));

        if ($token->role != 'admin') {

            exit('You are not admin');

        }

    }

    public function create()
    {

        $category = $this->input->post('category');
        $category['slug'] = slugify($category['name']);
        $this->Categories_model->create($category);

    }

    public function delete()
    {

        $category = $this->input->post('category');
        $this->Categories_model->delete($category);

    }


}
