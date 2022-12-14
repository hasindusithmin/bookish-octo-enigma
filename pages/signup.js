
import { Container } from "@mui/material"

export default function Signin(){
    // const {name,email,password,nic,post,contact} = req.body;
    const handler = async(e)=>{
        e.preventDefault()
        const form = document.getElementById('form')
        const formData = new FormData(form)
        let signup_data = {}
        for (let [key,value] of formData) signup_data[key] = value;
        const res = await fetch('/api/signup',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(signup_data)
        })
        if (res.status == 200) {
            const {user} = await res.json()
            localStorage.setItem('user_id',user)
            location.href = '/'
        }
        else {
            const {error} = await res.json()
            alert(error)
        }
    }
    return (
        <Container>
            <form method="post" onSubmit={handler} id="form">
                <label htmlFor="name">name</label>
                <br/>
                <input name="name" type="text" id="name" />
                <br/>
                <label htmlFor="email">email</label>
                <br/>
                <input name="email" type="text" id="email" />
                <br/>
                <label htmlFor="password">password</label>
                <br/>
                <input name="password" type="password" id="password" />
                <br/>
                <label htmlFor="nic">nic</label>
                <br/>
                <input name="nic" type="text" id="nic" />
                <br/>
                <label htmlFor="post">post</label>
                <br/>
                <input name="post" type="text" id="post" />
                <br/>
                <label htmlFor="contact">contact</label>
                <br/>
                <input name="contact" type="text" id="contact" />
                <br/>
                <input name="submit" type="submit" value="save" />
            </form>
        </Container>
    )
}