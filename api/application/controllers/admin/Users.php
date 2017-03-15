<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('admin/Users_model');

        $token = $this->input->post('token');
        $token = $this->jwt->decode($token, config_item('encryption_key'));

        if ($token->role != 'admin') {

            exit('You are not admin');

        }

    }

    public function get($id = false)
    {
        $result = $this->Users_model->get($id);
        echo json_encode($result);
    }

    public function update()
    {
        $this->form_validation->set_error_delimiters('', '');

        $this->form_validation->set_rules('firstName', 'First Name', 'required|min_length[3]');
        $this->form_validation->set_rules('lastName', 'Last Name', 'required|min_length[3]');
        $this->form_validation->set_rules('email', 'Email', 'required|valid_email|callback_unique_email');
        $this->form_validation->set_rules('password', 'New Password', 'matches[passconf]');
        $this->form_validation->set_rules('passconf', 'Confirm New Password', 'matches[password]');

        if ($this->form_validation->run())
        {
            $user = $this->input->post('user');
            $user['password'] = crypt($user['password'], config_item('encryption_key'));
            $this->Users_model->update($user);
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
            $this->Users_model->create($user);
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

    public function delete()
    {
        $user = $this->input->post('user');
        $this->Users_model->delete($user);

    }

    function unique_email()
    {
        $id = $this->input->post('id');
        $email = $this->input->post('email');

        if($this->Users_model->get_unique($id, $email))
        {
            $this->form_validation->set_message('unique_email', 'This email address is already taken.');
            return false;
        }
        return true;
    }

}
