export default function LoginPanel(){
    async function submit(){
        let username = document.getElementById("usernameBox").value;
        let password = document.getElementById("passwordBox").value;
            let res = await fetch("http://localhost:8080/login", {
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
    }
    return (<>
        Username:
        <textarea id="usernameBox"></textarea>
        Password:
        <textarea id="passwordBox"></textarea>

        <button onClick={submit}>Submit</button>
    </>);
}