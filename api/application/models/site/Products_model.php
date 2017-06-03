<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products_model extends CI_Model {

    public function get($id = false)
    {

        if ($id == false) {
            $q = $this->db->get('products');
            $q = $q->result();
        } else {
            $this->db->where('id', $id);
            $q = $this->db->get('products');
            $q = $q->row();
        }

        return $q;

    }

    public function getByCategoryId( $id = false )
    {

        if ( $id == false )
        {
            $q = $this->db->get( 'products' );
            $q = $q->result();
        }
        else
        {
            $this->db->where( 'category' , $id );
            $q = $this->db->get( 'products' );
            $q = $q->result_array();
        }

        return $q;

    }

    public function getCategoryName( $id )
    {

        $this->db->where( 'id' , $id );
        $q = $this->db->get( 'categories' );
        $q = $q->row();

        return $q->name;

    }

    public function getByCategorySlug( $slug )
    {

        $this->db->where( 'slug' , $slug );
        $category = $this->db->get( 'categories' );
        $category = $category->row();
        $categoryId = $category->id;
        $this->db->where( 'category' , $categoryId );
        $q = $this->db->get( 'products' );
        $q = $q->result_array();

        return $q;

    }

}