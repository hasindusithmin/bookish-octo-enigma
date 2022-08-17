import { Container } from "@mui/system";

export default function Login() {

    const handler = async(e)=>{
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const res = await fetch('/api/login',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({email,password})
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
                <label htmlFor="email">email</label>
                <br />
                <input name="email" type="text" id="email" />
                <br />
                <label htmlFor="password">password</label>
                <br />
                <input name="password" type="password" id="password" />
                <br />
                <input name="submit" type="submit" value="save" />
            </form>
        </Container>
    )
}