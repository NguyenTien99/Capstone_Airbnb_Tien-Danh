import React from "react";
import { useForm } from "react-hook-form";
import { Navigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import styles from "./LogIn.module.scss";
import { logIn } from "../../../slices/authSlice";

const LogIn = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);
  const [searchParams, setSearchParams] = useSearchParams();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const { errors } = formState;

  const onSubmit = (value) => {
    try {
      dispatch(logIn(value))
    } catch (error) {
      console.log(error)
    }
  };

  if(user){
    const redirectUrl = searchParams.get("redirectUrl");
    return <Navigate to={redirectUrl || "/"} replace />
  }


  return (
    <div className={styles.wrapLogin}>
      <div className={styles.logIn}>
        <div className={styles.title}>
          <div className={styles.iconLogin}>
          <UserOutlined />
          </div>
          <h1>Đăng nhập</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className={styles.inputLogin}>
            <label>Email</label>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Email không được để trống !",
                },
                pattern: {
                  value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/,
                  message: "Email phải đúng định dạng !",
                },
              })}
            />
            {errors.email && (
              <p className={styles.txtError}>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className={styles.inputLogin}>
            <label>Password</label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống !",
                },
              })}
            />
            {errors.password && (
              <p className={styles.txtError}>{errors.password.message}</p>
            )}
          </div>

          <div className={styles.btn}>
            <button>Đăng nhập</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
