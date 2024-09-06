
<?php 
    include("conexion.php");


    $query = "SELECT * FROM tareas";
    $result = mysqli_query($conexion, $query);

    if(!$result){
        die("Hubo un error en la consulta". mysqli_error($conexion));
    }

    $json = array();

    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            "id"=> $row["id"],
            "name" => $row["name"],
            "description" => $row["description"]
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;

?>