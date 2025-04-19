import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Cookies from "js-cookie";

export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        handleLogin(email, password);
    };

    function handleLogin(email: any, password: any) {
        fetch("/api/users")
            .then((response) => response.json())
            .then((users) => {
                const user = users.find(
                    (u: any) => u.email === email && u.password === password
                );
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    Cookies.set('userIdentity', JSON.stringify(userWithoutPassword), { expires: 7 })

                    if (Cookies.get('userIdentity') !== undefined) {
                        navigate('/');
                    }
                } else {
                    alert("Invalid credentials");
                }
            });
    }

    return (
        <div className='mcCard backgroundFadedBoxShadow spacing-md login'>
            <div className="standardCard">
                <form onSubmit={handleSubmit}>
                    <input type="email" width={'400'} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password" width={'400'} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );

    // return (
    //     <div className="h3">Login page</div>
    // )
}
