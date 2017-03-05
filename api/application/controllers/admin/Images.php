<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Images extends CI_Controller {

    public function upload($id)
    {

        if ( !empty( $_FILES ) ) {

            $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];

            $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR;
            $basePath = $basePath . $id . DIRECTORY_SEPARATOR;
            mkdir($basePath, 0700);

            $uploadPath = $basePath . $_FILES[ 'file' ][ 'name' ];

            move_uploaded_file( $tempPath, $uploadPath );

            $answer = array( 'answer' => 'File transfer completed' );

            $json = json_encode( $answer );

            echo $json;

        } else {

            echo 'No files';

        }

    }

}
