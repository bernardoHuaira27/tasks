<?php 
    include("conexion.php");

    if(isset(($_POST["id"]))) {

        $id = $_POST["id"];

        $query = "SELECT * FROM tareas WHERE id = {$id}";
        $result = mysqli_query($conexion, $query);

        if(!$result) {
            die('hubo un error en la consulta '. mysqli_error($conexion) );
        }

        $json = array();

        while($row = mysqli_fetch_array($result)){
            $json[] = array(
                "id"=> $row["id"],
                "name" => $row["name"],
                "description" => $row["description"]
            );
        }

        $jsonString = json_encode($json[0]);
        echo $jsonString;
    }
?>