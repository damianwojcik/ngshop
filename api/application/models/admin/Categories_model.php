<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Categories_model extends CI_Model {

    public function create( $category )
    {
        $this->db->insert('categories', $category);
    }

    public function delete( $category )
    {
        $this->db->where('id', $category['id']);
        $this->db->delete('categories');
        $this->db->where('category', $category['id']);
        $this->db->update('products', ['category' => '1']);
    }

}