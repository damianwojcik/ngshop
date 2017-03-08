<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function get($id)
    {
        $this->db->where('id', $id);
        $q = $this->db->get('users');
        $q = $q->row();

        return $q;
    }

    public function create($user)
    {
        $this->db->insert('users', $user);
    }

}