import Register from "@/pages/register"


const RegisterTab = () =>{
    return(
        <Register route={{ key: "registerphone", name: "Register", params: { telephone: "" } }}/>
    )
}

export default RegisterTab