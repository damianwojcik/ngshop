<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Promotions_model extends CI_Model {

    public function get($id = false)
    {

        if ( $id == false ) {
            $q = $this->db->get('promotions');
            $q = $q->result();
        } else {
            $this->db->where('id', $id);
            $q = $this->db->get('promotions');
            $q = $q->row();
        }

        return $q;
    }

}