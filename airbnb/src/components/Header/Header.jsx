import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchOutlined,
  AlignCenterOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
import styles from "./Header.module.scss";
import { logout } from "../../slices/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authSlice);

  const items = [
    {
      key: "1",
      label: user ? "" : <Link to="/login">Đăng nhập</Link>,
    },
    {
      key: "2",
      label: user ? "" : <Link to="/register">Đăng kí</Link>,
    },
    {
      key: "3",
      label: user ? <Link to={`/user/${user.user.id}`} >Thông tin tài khoản</Link> : ""
    },
    {
      key: "4",
      label: user ? (
        <div onClick={() => dispatch(logout())}>Thoát tài khoản</div>
      ) : (
        ""
      ),
    },
  ];
  return (
    <div className={styles.wrapHeader}>
      <div className="container">
        <div className={styles.header}>
          <div className={styles.logo}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/2560px-Airbnb_Logo_B%C3%A9lo.svg.png"
              alt="logo"
            />
          </div>

          <div className={styles.searchLocation}>
            <p>Chỗ ở</p>
            <span>|</span>
            <p>Trải nghiệm</p>
            <span>|</span>
            <p>Địa điểm</p>
            <div className={styles.iconSearch}>
              <SearchOutlined />
            </div>
          </div>

          <div className={styles.diff}>
            <div className={styles.forRent}>
              <p>Cho thuê chỗ ở qua Airbnb</p>
            </div>
            <div className={styles.auth}>
              <Dropdown
                menu={{
                  items,
                }}
                placement="bottomRight"
              >
                <div className={styles.menu}>
                  {user ? (
                    <div className={styles.account}>
                      <div className={styles.iconAccount}>
                        <UserOutlined />
                      </div>
                      <p>{user.user.name}</p>
                    </div>
                  ) : (
                    <div>
                      <AlignCenterOutlined />
                      <UserOutlined />
                    </div>
                  )}
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
