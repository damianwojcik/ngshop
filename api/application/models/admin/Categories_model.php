<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Categories_model extends CI_Model {

    public function get( $id = false )
    {

        if ( $id == false )
        {
            $q = $this->db->get( 'categories' );
            $q = $q->result();
        }
        else
        {
            $this->db->where( 'id' , $id );
            $q = $this->db->get( 'categories' );
            $q = $q->row();
        }

        return $q;

    }

    public function create( $category )
    {
        $this->db->insert('categories', $category);
    }

    public function update( $category )
    {
        $this->db->where('id', $category['id']);
        $this->db->update('categories', $category);
    }

    public function delete( $category )
    {
        $this->db->where('id', $category['id']);
        $this->db->delete('categories');
        $this->db->where('category', $category['id']);
        $this->db->update('products', ['category' => '1']);
    }

}