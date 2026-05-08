
export async function createTask(task){
    try {
        const token = localStorage.getItem('token');  
        const response = await fetch('http://localhost:3000/api/task/createTask', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',  
                'Authorization': `Bearer ${token}`
            }
        });

        if(response.ok){
        return true;
        }else{
            return false;
        }
    }catch(e){
        throw e;
    }
}

export async function getTasks(){
    try{
        const token=localStorage.getItem('token');

        const response=await fetch('http://localhost:3000/api/task/getAllTasks',{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }else{
            return false
        }

    }catch(e){
        throw e;
    }
}

export async function getTaskById(id){
    try{
        const token=localStorage.getItem('token');
        const response=await fetch(`http://localhost:3000/api/task/getTaskById/${id}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }else{
            return false
        }
    }catch(e){
        throw e;
    }
}

export async function updateTaskById(id,updatedTask){
    try{
        const token=localStorage.getItem('token');
        const response=fetch(`http://localhost:3000/api/task/updateTask/${id}`,{
            method:"PUT",
            body:JSON.stringify(updatedTask),
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }else{
            return false
        }   
    }catch(e){
        throw e;
    }
}

export async function deleteTaskById(id){
    try{
        const token=localStorage.getItem('token');
        const response=await fetch(`http://localhost:3000/api/task/deleteTask/${id}`,{
            method:"DELETE",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        console.log(response);
        if(response.ok){
            return await response.json();
        }else{
            return await response.json();
        }
    }catch(e){
        throw e;
    }
}
