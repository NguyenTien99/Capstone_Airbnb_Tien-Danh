import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import styles from "./Intro.module.scss";
import { getlocations } from "../../../slices/locationSlice";
import Loading from "../../../components/Loading";

const Intro = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { locations } = useSelector((state) => state.locationSlice);
  const [locationId, setlocationId] = useState(0);

  useEffect(() => {
    dispatch(getlocations());
  }, []);

  if (locations.length === 0) {
    return <Loading />;
  }

  return (
    <div
      className={styles.wrapIntro}
      style={{ backgroundImage: `url(${locations[locationId].hinhAnh})` }}
    >
      <div className={styles.contentIntro}>
        <div className={styles.wrapDetail}>
          <div className={styles.nameLocations}>
            <h1>{locations[locationId].tinhThanh}</h1>
            <h4>{locations[locationId].tenViTri}</h4>
            <button
              onClick={() => navigate(`/location/${locations[locationId].id}`)}
            >
              Khám phá
            </button>
          </div>
          <div className={styles.wrapSwiper}>
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              loop={true}
            //   autoplay={{
            //     delay: 2500,
            //     disableOnInteraction: false,
            //   }}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className={styles.mySwiper}
            >
              {locations.map((item, index) => (
                <SwiperSlide key={item.id} onClick={() => setlocationId(index)}>
                  <div
                    className={styles.imglocations}
                    width="500px"
                    height="500px"
                  >
                    <img
                      src={item.hinhAnh}
                      alt={item.tinhThanh}
                      width="100%"
                      height="100%"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
