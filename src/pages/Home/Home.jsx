import React, { useState } from "react";

import NotificationBanner from "../../components/NotificationBanner/NotificationBanner";
import TopBar from "../../components/TopBar/TopBar";
import Header from "../../components/Header/Header";
import LocationBar from "../../components/LocationBar/LocationBar";
import Hero from "../../components/Hero/Hero";
import PromoSlider from "../../components/PromoSlider/PromoSlider";
// import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
// import FloatingVideo from "../../components/VideoSection/FloatingVideo";
import InfoStrip from "../../components/InfoStrip/InfoStrip";
import Footer from "../../components/Footer/Footer";
import Floating3DBox from "../../components/Floating3DBox";

import "./Home.css";


// =====================================================
// AXIOS
// API READY HONE PAR UNCOMMENT KARNA
// =====================================================

// import axiosInstance from "../../api/axiosInstance";



/* =====================================================
   DEFAULT HOME DATA

   Abhi static data use hoga.
   Baad me ye data API se aa sakta hai.
===================================================== */

const defaultHomeData = {


  /* =====================================================
     GROCERY
  ===================================================== */

  grocery: {
    id: "grocery",
    title: "Grocery & Staples",

    description:
      "Category-wise promotional images can be added, removed or updated from the admin system.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
      },
    ],
  },


  /* =====================================================
     FRESH
  ===================================================== */

  fresh: {
    id: "fresh",
    title: "Fruits & Vegetables",

    description:
      "Fresh product images and promotional banners for your selected sahjoMart location.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://assets.clevelandclinic.org/transform/871f96ae-a852-4801-8675-683191ce372d/Benefits-Of-Cabbage-589153824-770x533-1_jpg",
      },
    ],
  },


  /* =====================================================
     BEVERAGES
  ===================================================== */

  beverages: {
    id: "beverages",
    title: "Beverages & Snacks",

    description:
      "Separate image slideshows can be created for every category.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&w=700&q=80",
      },

      {
        id: "snacks",

        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_qOfu9eRT5orel3T4jNIXldt0UMSKB4A-3Gu0PpJie1mw4BLg1iMULkw&s=10",
      },

      {
        image:
          "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR29h5rRIeJf06fUpuyQRhgU60m08rwpBTtXp9r3XMEIB0oOL9oxv_THe3v3-BD00G6lmmhofNC7wkyyTld_3ot_yuoAJqUKFd7JH7NCw&s=10",
      },
    ],
  },


  /* =====================================================
     HOUSEHOLD
  ===================================================== */

  household: {
    id: "household",
    title: "Household Essentials",

    description:
      "Images shown here are examples. You can replace them with actual sahjoMart promotional images.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=700&q=80",
      },

      {
        image:
          "https://www.wizvalue.com/cdn/shop/articles/GettyImages-self-care-at-home-1200.jpg?v=1627710151",
      },

      {
        image:
          "https://m.media-amazon.com/images/I/71OsuPfqy0L._AC_UY1100_.jpg",
      },
    ],
  },
};



/* =====================================================
   HOME COMPONENT
===================================================== */

function Home() {

  const [homeData,] = useState(defaultHomeData);


  // =====================================================
  // LOADING STATE
  // API START KARNE PAR UNCOMMENT KARNA
  // =====================================================

  // const [loading, setLoading] = useState(false);



  // =====================================================
  // AXIOS API CALL
  //
  // API READY HONE PAR:
  //
  // 1. React import me useEffect add karo
  //
  // import React, { useEffect, useState } from "react";
  //
  // 2. axiosInstance import uncomment karo
  //
  // 3. Neeche wala useEffect uncomment karo
  // =====================================================

  /*
  useEffect(() => {

    const getHomeData = async () => {

      try {

        setLoading(true);

        const response = await axiosInstance.get("/home");

        console.log(
          "Home API Response:",
          response.data
        );


        // Expected response:
        //
        // {
        //   success: true,
        //   data: {
        //      grocery: {...},
        //      fresh: {...},
        //      beverages: {...},
        //      household: {...}
        //   }
        // }


        if (response.data?.data) {

          setHomeData(response.data.data);

        }

      } catch (error) {

        console.error(
          "Home API Error:",
          error.response?.data || error.message
        );


        // API fail hone par static data
        setHomeData(defaultHomeData);

      } finally {

        setLoading(false);

      }

    };


    getHomeData();

  }, []);
  */



  // =====================================================
  // OPTIONAL LOADING
  // API START HONE PAR UNCOMMENT KARNA
  // =====================================================

  /*
  if (loading) {
    return (
      <div className="home-loading">
        Loading...
      </div>
    );
  }
  */



  return (
    <>

      <NotificationBanner />

      <TopBar />

      <Header />

      <LocationBar />


      <main id="home">

        <Hero />

        <PromoSlider />


        {/* <CategoryGrid /> */}



        {/* =================================================
            GROCERY
        ================================================= */}

        {homeData.grocery && (
          <CategorySlider
            id={homeData.grocery.id}
            title={homeData.grocery.title}
            description={homeData.grocery.description}
            items={homeData.grocery.items || []}
          />
        )}



        {/* =================================================
            FRESH
        ================================================= */}

        {homeData.fresh && (
          <CategorySlider
            id={homeData.fresh.id}
            title={homeData.fresh.title}
            description={homeData.fresh.description}
            items={homeData.fresh.items || []}
          />
        )}



        {/* =================================================
            BEVERAGES
        ================================================= */}

        {homeData.beverages && (
          <CategorySlider
            id={homeData.beverages.id}
            title={homeData.beverages.title}
            description={homeData.beverages.description}
            items={homeData.beverages.items || []}
          />
        )}



        {/* =================================================
            HOUSEHOLD
        ================================================= */}

        {homeData.household && (
          <CategorySlider
            id={homeData.household.id}
            title={homeData.household.title}
            description={homeData.household.description}
            items={homeData.household.items || []}
          />
        )}



        <InfoStrip />

        <Floating3DBox />

      </main>


      <Footer />


      {/* <FloatingVideo /> */}

    </>
  );
}

export default Home;