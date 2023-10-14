export default function SignUpPage(){
    async function submit(){
        let username = document.getElementById("usernameBox").value;
        let password = document.getElementById("passwordBox").value;
        let pass2 = document.getElementById("passwordBox2").value;
        if(password == pass2){
            let res = await fetch("http://localhost:8080/makeUser", {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            });

            let result = await res.text();

            if(result == "good"){
                localStorage.username = username;
            } else {
                localStorage.username = "";
                console.log(result);
            }
        } else {
            console.log("passwords don't match!");
        }
    }
    return (<>
        Username:
        <textarea id="usernameBox"></textarea>
        Password:
        <textarea id="passwordBox"></textarea>
        Confirm Password:
        <textarea id="passwordBox2"></textarea>

        <button onClick={submit}>Submit</button>
    </>);
}