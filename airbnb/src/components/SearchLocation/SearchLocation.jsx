import React, { useEffect } from "react";
import { Space, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getlocations } from "../../slices/locationSlice";
import Loading from "../Loading";

import styles from "./SearchLocation.module.scss";
import InputSearch from "./InputSearch/InputSearch";

const SearchLocation = () => {
  const dispatch = useDispatch();
  const { locations, loading } = useSelector((state) => state.locationSlice);

  useEffect(() => {
    dispatch(getlocations());
  }, []);

  const onChangeTabs = (key) => {
    console.log(key);
  };


  if (loading) {
    return <Loading />;
  }


  return (
    <div className={styles.wrapSearch}>
      <Space direction="vertical" size={"100%"}>
        <Tabs
          defaultActiveKey="1"
          onChange={onChangeTabs}
          items={[
            {
              label: `Chỗ ở`,
              key: "1",
              children: (
                <InputSearch locations={locations} />
              ),
            },
            {
              label: `Trải nghiệm`,
              key: "2",
              children: `Content of Tab Pane 2`,
            },
          ]}
        />
      </Space>
    </div>
  );
};

export default SearchLocation;
