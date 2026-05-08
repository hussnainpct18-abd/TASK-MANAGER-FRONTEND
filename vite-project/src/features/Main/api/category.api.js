
export async function getFavTasks(){
    try{
        const token=localStorage.getItem('token');

        const response=await fetch('http://localhost:3000/api/category/getFavourite',{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }else{
            return await response.json();
        }
    }catch(e){
        throw e;
    }
}

export async function getWorkTasks(){
    try{
        const token=localStorage.getItem('token');
        const response=await fetch('http://localhost:3000/api/category/getWork',{
            method:"GET",
            headers:{  
                "Authorization":`Bearer ${token}`
            }

        })
        if(response.ok){
            return await response.json();
        }else{
            return await response.json();
        }

    }catch(e){
        throw e;
    }
}

export async function getPersonalTasks(){
    try{
        const token=localStorage.getItem('token');
        const response=await fetch('http://localhost:3000/api/category/getPersonal',{
            method:"GET",
            headers:{  
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }else{
            return await response.json();
        }
    }catch(e){
        throw e;
    }
}

export async function getLearningTasks(){
    try{
        const token=localStorage.getItem('token');
        const response=await fetch('http://localhost:3000/api/category/getLearning',{
            method:"GET",
            headers:{  
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.ok){
            return await response.json();
        }else{
            return await response.json();
        }
    }catch(e){
        throw e;
    }
}

export async function addFav(id) {
    try {
        const token = localStorage.getItem('token');

        const response = await fetch(
            `http://localhost:3000/api/category/addFav/${id}`, 
            {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        if (!response.ok) {
            const text = await response.text();
            console.error("Server Error:", text);
            throw new Error("Request failed");
        }

        return await response.json();

    } catch (e) {
        console.error(e);
        throw e;
    }
}
