<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('site/User_model');

    }

    public function get($id)
    {
        $result = $this->Users_model->get($id);
        echo json_encode($result);
    }

    public function create()
    {
        $this->form_validation->set_error_delimiters('', '');

        $this->form_validation->set_rules('firstName', 'First Name', 'required|min_length[3]');
        $this->form_validation->set_rules('lastName', 'Last Name', 'required|min_length[3]');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email|is_unique[users.email]');
        $this->form_validation->set_rules('password', 'Password', 'required|min_length[6]');
        $this->form_validation->set_rules('passconf', 'Confirm Password', 'required|matches[password]');

        if ($this->form_validation->run())
        {
            $user = $this->input->post('user');
            $user['role'] = 'user';
            unset($user['passconf']);
            $user['password'] = crypt($user['password'], config_item('encryption_key'));
            $this->User_model->create($user);
        } else
        {
            $errors['firstName'] = form_error('firstName');
            $errors['lastName'] = form_error('lastName');
            $errors['email'] = form_error('email');
            $errors['password'] = form_error('password');
            $errors['passconf'] = form_error('passconf');
            echo json_encode($errors);
        }

    }

}
