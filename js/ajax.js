

$(function() {
    $("#task-result").hide();
    $("#task-add").hide();
    fetchTasks()
    let edit = false;


    //function for search tasks
    $("#search").keyup(()=>{
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: "php/searchTask.php",
                data: { search },
                type: "POST",
                success: function(response){
                    if(!response.error){
                        let tasks = (JSON.parse(response));
                        let template = ``;
                        tasks.forEach(task => {
                            template += `<li><a href="#" class="task-item">${task.name}</a></li>`
                        });
                        $("#task-result").show();
                        $("#container").html(template)
                    }
                }
            })
        }
    })

    //function for add task 
    $("#task-form").submit(e => {
        e.preventDefault();

        const postData = {
            name: $("#name").val(),
            description: $("#description").val(),
            id: $("#taskId").val()
        }
        const url = edit ===  false ? "php/addTask.php": "php/editTask.php"
        $.ajax({
            url,
            data: postData,
            type: "POST",
            success: function(response){
                if(!response.error){
                    $("#task-add").show().text("Task add")
                    $("#task-form").trigger("reset")
                }
            }
        })
    })


    // function list tasks
    function fetchTasks() {
        $.ajax({
            url: "php/listTask.php",
            type: "GET",
            success: function(response){
                const tasks = JSON.parse(response);
                let template = ``;
                tasks.forEach(task => {
                    template += `
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>${task.name}</td>
                            <td>${task.description}</td>
                            <td>
                                <button class="btn btn-danger task-delete">Eliminar</button>
                            </td>
                            <td>
                                <button class="btn btn-success task-item">Editar</button>
                            </td>
                            
                        </tr>  
                    `;
                })
                $("#tasks").html(template)
            }
        })
    }

    $(document).on("click", ".task-delete", () =>{
        if(confirm("seguro que quieres eliminar esa tarea?")){
            const element = $(this)[0].activeElement.parentElement.parentElement;
            const id = $(element).attr("taskId");
            $.post("php/deleteTask.php",{ id }, ()=>{
                fetchTasks()
            })
        }
    })

    $(document).on("click", ".task-item", () => {
        const element = $(this)[0].activeElement.parentElement.parentElement;
        const id = $(element).attr("taskId");
      
        let url = "php/getTask.php";
        $.ajax({
            url,
            data: { id },
            type: "POST",
            success: function(response) {
                console.log(response)
                if (!response.error) {
                    const task = JSON.parse(response);
                    $("#name").val(task.name);
                    $("#description").val(task.description);
                    $("#taskId").val(task.id);
                    edit = true;
                }else{
                    console.log("a courrido un error")
                }
            }
        });
    });
    
    

})


