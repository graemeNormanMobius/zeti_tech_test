import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Button } from "../components/button.tsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { CircularSpinningIcon, VisibilityIcon, VisibilityOffIcon, WarningTriangleIcon } from "../components/icons.tsx";

export function Login() {
    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState<any>({ password: false });
    const [showLoading, setLoading] = useState<boolean>(false);
    const togglePasswordVisibility = (element: string, visibility: boolean) => {
        setPasswordShown({ ...passwordShown, [element]: visibility });
    };

    const preloadedValues = {
        email: '',
        password: ''
    };
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<{ email: string; password: string; }>({
        defaultValues: preloadedValues
    });

    const onSubmit: SubmitHandler<{ email: string; password: string; }> = data => {
        setLoading(true);
        // handleLogin(data);

        fetch("/api/users")
            .then((response) => response.json())
            .then((users) => {
                const user = users.find(
                    (u: any) => u.email === data.email && u.password === data.password
                );
                if (user) {
                    const { password, ...userWithoutPassword } = user;
                    Cookies.set('userIdentity', JSON.stringify(userWithoutPassword), { expires: 7 })

                    if (Cookies.get('userIdentity') !== undefined) {
                        setTimeout(() => {
                            navigate('/');
                        }, 1500);
                    }
                } else {
                    alert("Invalid credentials");
                }
            });
    };

    // function handleLogin(data: { email: string; password: string }) {
    //     fetch("/api/users")
    //         .then((response) => response.json())
    //         .then((users) => {
    //             const user = users.find(
    //                 (u: any) => u.email === data.email && u.password === data.password
    //             );
    //             if (user) {
    //                 const { password, ...userWithoutPassword } = user;
    //                 Cookies.set('userIdentity', JSON.stringify(userWithoutPassword), { expires: 7 })
    //
    //                 if (Cookies.get('userIdentity') !== undefined) {
    //                     navigate('/');
    //                 }
    //             } else {
    //                 alert("Invalid credentials");
    //             }
    //         });
    // }

    return (
        <div className="gridContainer">
            <div className='mcCard backgroundFadedBoxShadow spacing-md login'>
                <div className="standardCard">

                    <form className="signInForm customForm" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <label className="form-label bodyXSmallEmp" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form-control bodySmall"
                                id="email"
                                {...register('email', {
                                    pattern: {
                                        value: /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Please enter a valid email address'
                                    }
                                })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="email"
                                render={({ message }) => (
                                    <div className="bodyXSmall formErrorContainer">
                                        <WarningTriangleIcon className="formErrorIcon" />
                                        <span>{message}</span>
                                    </div>
                                )}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label bodyXSmallEmp" htmlFor="password">
                                Password
                            </label>
                            <span className="inputToggle"
                                  onClick={() => togglePasswordVisibility('password', !passwordShown.password)}>
                              {passwordShown.password ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </span>
                            <input
                                type={passwordShown.password ? 'text' : 'password'}
                                className="form-control visibilityToggle bodySmall"
                                id="password"
                                {...register('password', { required: 'This is a required field' })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="password"
                                render={({ message }) => (
                                    <div className="bodyXSmall formErrorContainer">
                                        <WarningTriangleIcon className="formErrorIcon" /> {message}
                                    </div>
                                )}
                            />
                        </div>

                        <div className="modalFooter modal-buttonGroup">
                            {!showLoading && (
                                <Button
                                    hasIcon="noIcon"
                                    size="md"
                                    state="default"
                                    type="accent"
                                    value="Sign in "
                                    isSubmit={true}
                                />
                            )}

                            {showLoading && (
                                <Button
                                    hasIcon="leading"
                                    size="md"
                                    state="disabled"
                                    type="accent"
                                    value={
                                        <span className="buttonAfter">
                                            <CircularSpinningIcon className="loginLoader" />
                                        </span>
                                    }
                                    isSubmit={false}
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
