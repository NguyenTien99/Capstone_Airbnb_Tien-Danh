import React, { useEffect, useState } from "react";
import { DatePicker, Row, Col, Select, Popover } from "antd";
import moment from "moment";
import { PlusOutlined, MinusOutlined,SearchOutlined } from "@ant-design/icons";
import useCounter from "../../../hooks/useCouter";

import styles from "./InputSearch.module.scss";

const InputSearch = ({ locations }) => {
  //Date
  const [dates, setDates] = useState([]);
  console.log(dates);

  //DatePicker
  const { RangePicker } = DatePicker;

  // Guest
  const {
    count: countAdults,
    handleIncrease: handleIncreaseAdults,
    handleDecrease: handleDecreaseAdults,
  } = useCounter();

  const {
    count: countChildren,
    handleIncrease: handleIncreaseChildren,
    handleDecrease: handleDecreaseChildren,
  } = useCounter();

  const {
    count: countPets,
    handleIncrease: handleIncreasePets,
    handleDecrease: handleDecreasePets,
  } = useCounter();

  const [guest, setGuest] = useState(0);

  useEffect(() => {
    const total = countAdults + countChildren;
    setGuest(total);
  }, [countAdults, countChildren]);

  //Select
  const options = locations.map((item) => {
    return {
      value: item.id,
      label: item.tinhThanh,
    };
  });
  const SelectedLocation = (val) => {
    console.log(val);
  };

  const handleSearch = () => {
    console.log("Hi")
  }

  const content = (
    <div>
      {/* Adult */}
      <div>
        <div className="row">
          <div className="col-6">
            <h4>Người lớn</h4>
            <p>Từ 13 tuổi trở lên</p>
          </div>
          <div className="col-6">
            <div className={styles.count}>
              <div
                className={styles.iconDecrease}
                onClick={handleDecreaseAdults}
              >
                <MinusOutlined />
              </div>
              <p> {countAdults} </p>
              <div
                className={styles.iconIncrease}
                onClick={handleIncreaseAdults}
              >
                <PlusOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Children */}
      <div>
        <div className="row">
          <div className="col-6">
            <h4>Trẻ em</h4>
            <p>Từ 12 tuổi trở xuống</p>
          </div>
          <div className="col-6">
            <div className={styles.count}>
              <div
                className={styles.iconDecrease}
                onClick={handleDecreaseChildren}
              >
                <MinusOutlined />
              </div>
              <p> {countChildren} </p>
              <div
                className={styles.iconIncrease}
                onClick={handleIncreaseChildren}
              >
                <PlusOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pet */}
      <div>
      <div>
        <div className="row">
          <div className="col-6">
            <h4>Thú cưng</h4>
          </div>
          <div className="col-6">
            <div className={styles.count}>
              <div
                className={styles.iconDecrease}
                onClick={handleDecreasePets}
              >
                <MinusOutlined />
              </div>
              <p> {countPets} </p>
              <div
                className={styles.iconIncrease}
                onClick={handleIncreasePets}
              >
                <PlusOutlined />
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapInputSearch}>
      <div className="row">
        <div className="col-3">
          <Select
            defaultValue="Chọn địa điểm"
            style={{ width: "100%", minWidth: 200 }}
            onChange={SelectedLocation}
            options={options}
          />
        </div>
        <div className="col-3">
          <div className={styles.schedule}>
            <RangePicker
              onChange={(values) => {
                setDates(
                  values.map((item) => {
                    return moment(item).format("YYYY-MM-DD");
                  })
                );
              }}
            />
          </div>
        </div>
        <div className="col-3">
          <Popover
            content={content}
            title="Thêm khách"
            trigger="click"
            placement="bottomLeft"
          >
            <div className={styles.guest}>
                Khách
              <span>{guest ? ` ${guest} người ` : ""}</span>
              <span>{countPets ? `,${countPets} thú cưng` : ""}</span>
            </div>
          </Popover>
        </div>
        <div className="col-3">
            <div className={styles.searchInput} onClick={handleSearch}>
                <p>Tìm kiếm</p>
                <div className={styles.iconSearch}>
                <SearchOutlined />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default InputSearch;
