import React, { useState } from "react";

import NotificationBanner from "../../components/NotificationBanner/NotificationBanner";
import TopBar from "../../components/TopBar/TopBar";
import Header from "../../components/Header/Header";
import LocationBar from "../../components/LocationBar/LocationBar";
import Hero from "../../components/Hero/Hero";
import PromoSlider from "../../components/PromoSlider/PromoSlider";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import VideoSection from "../../components/VideoSection/VideoSection";
import Footer from "../../components/Footer/Footer";
import Floating3DBox from "../../components/Floating3DBox";
import SocialMediaSection from "../../components/SocialMediaSection";
import "./Home.css";


const defaultHomeData = {

  /* =====================================================
     GROCERY
  ===================================================== */

  grocery: {
    id: "grocery",
    title: "Grocery & Staples",

    description:
      "Daily grocery and kitchen essentials for your home.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },


  /* =====================================================
     FRUITS & VEGETABLES
  ===================================================== */

  fresh: {
    id: "fresh",
    title: "Fruits & Vegetables",

    description:
      "Fresh fruits and vegetables for your everyday needs.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },


  /* =====================================================
     BEVERAGES & SNACKS
  ===================================================== */

  beverages: {
    id: "beverages",
    title: "Beverages & Snacks",

    description:
      "Refreshing drinks, tea, coffee and tasty snacks.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },


  /* =====================================================
     BAKERY & BREAKFAST
  ===================================================== */

  bakery: {
    id: "bakery",
    title: "Bakery & Breakfast",

    description:
      "Bread, bakery products and delicious breakfast essentials.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },


  /* =====================================================
     DAIRY & FROZEN
  ===================================================== */

  dairyFrozen: {
    id: "dairy-frozen",
    title: "Dairy & Frozen",

    description:
      "Milk, dairy products, ice cream and frozen food items.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1570197788417-0e82375c9371?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },


  /* =====================================================
     PERSONAL CARE
  ===================================================== */

  personalCare: {
    id: "personal-care",
    title: "Personal Care",

    description:
      "Daily personal care, beauty and grooming essentials.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80",
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
      "Cleaning and household products for your everyday home needs.",

    items: [
      {
        image:
          "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&w=900&q=80",
      },
      {
        image:
          "https://images.unsplash.com/photo-1567721913486-6585f069b332?auto=format&fit=crop&w=900&q=80",
      },
    ],
  },
};



function Home() {
  const [homeData] = useState(defaultHomeData);

  return (
    <>
      <NotificationBanner />

      <TopBar />

      <Header />

      <LocationBar />


      <main id="home">

        <Hero />

        <PromoSlider />


        {/* =================================================
            ALL CATEGORY SLIDERS

            Har category automatically CategorySlider
            component me render hogi.
        ================================================= */}

        {Object.values(homeData).map((category) => (
          <CategorySlider
            key={category.id}
            id={category.id}
            title={category.title}
            description={category.description}
            items={category.items || []}
          />
        ))}


        <Floating3DBox />

      </main>

      <VideoSection />
<SocialMediaSection />

      <Footer />

    </>
  );
}

export default Home;