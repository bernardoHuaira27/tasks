
<?php 

    include("conexion.php");

    if(isset($_POST)){
        $id = $_POST["id"];

        $query = "DELETE FROM tareas WHERE id = $id";
        $result = mysqli_query($conexion, $query);

        if(!$result){
            die("Hubo un error en la consulta". mysqli_error($conexion));
        }

        echo "La tarea ha sido eliminado!";
    }

?>
