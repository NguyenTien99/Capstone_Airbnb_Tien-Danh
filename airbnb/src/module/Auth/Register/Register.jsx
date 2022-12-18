import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { UserAddOutlined } from "@ant-design/icons";
import { message } from "antd";
import authAPI from "../../../services/authAPi";
import { Navigate } from "react-router-dom";

import styles from "./Register.module.scss";

const Register = () => {
  const [successRegister, setSuccessResgister] = useState(false)
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
  });

  const { errors } = formState;

  const onSubmit = async (values) => {
    try {
      await authAPI.register(values);
      setSuccessResgister(true);
    } catch (error) {
      console.log(error)
    }
  };

  if(successRegister){
    return <Navigate to="/login" replace />
  }

  return (
    <div className={styles.wrapRegister}>
      <div className={styles.register}>
        {/* Title */}
        <div className={styles.title}>
          <div className={styles.iconRegister}>
            <UserAddOutlined />
          </div>
          <h1>Đăng kí</h1>
        </div>
        {/* Form */}
        <div className={styles.formRegister}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <div className={styles.inputRegister}>
              <label>Họ Tên</label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Tên không được để trống",
                  },
                })}
              />
              {errors.name && (
                <p className={styles.txtError}>{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div className={styles.inputRegister}>
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
          <div className={styles.inputRegister}>
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

          {/* phone */}
          <div className={styles.inputRegister}>
            <label>Điện thoại</label>
            <input
              {...register("phone", {
                required: {
                  value: true,
                  message: "Số điện thoại không được để trống !",
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Số điện thoại phải là số "
                }
              })}
            />
            {errors.phone && (
              <p className={styles.txtError}>{errors.phone.message}</p>
            )}
          </div>

          {/* birthday */}
          <div className={styles.inputRegister}>
            <label>Sinh nhật</label>
            <input 
              {...register("birthday", {
                required: {
                  value: true,
                  message: "Sinh nhật không được để trống !",
                },
                pattern: {
                  value: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
                  message: "Sinh nhật có định dạng DD/MM/YYYY"
                }
              })}
            />
            {errors.birthday && (
              <p className={styles.txtError}>{errors.birthday.message}</p>
            )}
          </div>
          <div className={styles.inputRegister}>
            <label>Giới tính</label>
              <select {...register("gender", {
                required: {
                  value: true,
                  message: "Giới tính không được để trống"
                }
              })}>
                <option value="">Chọn giới tính</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
              { errors.gender && (<p className={styles.txtError}>{errors.gender.message}</p>)}
          </div>
          <div className={styles.btn}>
            <button>Đăng kí</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
