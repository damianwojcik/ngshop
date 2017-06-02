<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {

    public function __construct ()
    {
        parent::__construct();

        $post = file_get_contents('php://input');
        $_POST = json_decode($post, true);

        $this->load->model('admin/Products_model');

        $token = $this->input->post('token');
        $token = $this->jwt->decode($token, config_item('encryption_key'));

        if ($token->role != 'admin') {

            exit('You are not admin');

        }

    }

    public function get($id = false)
    {

        $result = $this->Products_model->get($id);

        echo json_encode($result);
    }

    public function update()
    {
        $product = $this->input->post('product');
        $this->Products_model->update($product);
    }

    public function create()
    {
        $product = $this->input->post('product');
        $this->Products_model->create($product);

        $new_product_id = $this->db->insert_id();
        mkdir(FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $new_product_id);

    }

    public function delete()
    {

        $product = $this->input->post('product');
        $this->deleteDir($product['id']);
        $this->Products_model->delete($product);

    }

    public function deleteDir($id)
    {

        $dirPath = FCPATH . '../uploads/' . $id . '/';

        if (substr($dirPath, strlen($dirPath) - 1, 1) != '/') {
            $dirPath .= '/';
        }
        $files = glob($dirPath . '*', GLOB_MARK);
        foreach ($files as $file) {
            if (is_dir($file)) {
                self::deleteDir($file);
            } else {
                unlink($file);
            }
        }
        rmdir($dirPath);

    }

}
