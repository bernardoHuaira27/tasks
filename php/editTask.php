
<?php 

    include("conexion.php");

    if(isset($_POST)){

        $task_id = $_POST["id"];
        $task_name = $_POST["name"];
        $task_description = $_POST["description"];

        $query = "UPDATE tareas SET name = '$task_name', description = '$task_description' WHERE id = '$task_id'";

        $result = mysqli_query($conexion, $query);
    

        if(!$result){
            die('hubo un error en la consulta '. mysqli_error($conexion) );
        }

        echo "La tarea a sido actualizada";

    }else{
        die('hubo un error en la consulta '. mysqli_error($conexion) );
    }
    
?>