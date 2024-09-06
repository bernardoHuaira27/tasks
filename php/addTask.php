
<?php 

include("conexion.php");

if(isset($_POST["name"])){
    $task_name = $_POST["name"];
    $task_description = $_POST["description"];

    $query = "INSERT INTO tareas (name, description) VALUES ('$task_name', '$task_description')";

    $result = mysqli_query($conexion, $query);

    if(!$result){
        die("Hubo un error en la consulta". mysqli_error($conexion));
    }

    echo" task added";
}
?>