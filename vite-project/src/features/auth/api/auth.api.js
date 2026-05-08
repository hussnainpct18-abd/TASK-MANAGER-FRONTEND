
export async function useAuth(data) {
    try {
        const formData = new FormData();

        formData.append("username", data.name);   // match backend
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("contact", data.contact);
        formData.append("file", data.file);

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            body: formData,
            // headers: {
            //     // Authorization:`Bearer `
            //     'ContentType': 'multipart/form-data'
            // }

        })
        // console.log(response)

        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            return result;
        } else {
            return await response.json();
        }

    } catch (e) {
        throw new Error("Failed to register user");
    }

}

export async function loginAuth(data) {

    try {
        let response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {

                'Content-Type': 'application/json'
            }
        }
        )
        if (response.ok) {
            const result = await response.json();
            localStorage.setItem('token', result.token);
            return result;
        } else {
            return await response.json();
        }

    } catch (e) {
        throw new Error("Failed to login user");
    }
}

export async function logOut() {

    try {
        const response = await fetch('http://localhost:3000/api/auth/logout', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        const result = await response.text();


        if (response.status === 200) {
            localStorage.removeItem('token');

            return result;
        } else {
            return result;
        }

    } catch (e) {
        throw new Error("Failed to logout user");
    }

}