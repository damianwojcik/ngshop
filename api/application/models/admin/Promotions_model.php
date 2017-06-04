<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Promotions_model extends CI_Model {

    public function get( $id = false )
    {

        if ( $id == false )
        {
            $q = $this->db->get( 'products' );
            $q = $q->result();
        }
        else
        {
            $this->db->where( 'id' , $id );
            $q = $this->db->get( 'products' );
            $q = $q->row();
        }

        return $q;

    }

//    public function update( $product )
//    {
//        $this->db->where('id', $product['id']);
//        $this->db->update('products', $product);
//    }

    public function create( $promotion )
    {
        $this->db->insert('promotions', $promotion);
    }

    public function delete( $promotion )
    {
        $this->db->where('id', $promotion['id']);
        $this->db->delete('promotions');
    }
//
//    public function setThumbnail( $productId, $product )
//    {
//        $this->db->where('id', $productId);
//        $this->db->update('products', $product);
//    }

}