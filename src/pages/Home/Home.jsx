import React from "react";

import NotificationBanner from "../../components/NotificationBanner/NotificationBanner";
import TopBar from "../../components/TopBar/TopBar";
import Header from "../../components/Header/Header";
import LocationBar from "../../components/LocationBar/LocationBar";
import Hero from "../../components/Hero/Hero";
import PromoSlider from "../../components/PromoSlider/PromoSlider";
import CategoryGrid from "../../components/CategoryGrid/CategoryGrid";
import CategorySlider from "../../components/CategorySlider/CategorySlider";
import FloatingVideo from "../../components/VideoSection/FloatingVideo";

// import VideoSection from "../../components/VideoSection/VideoSection";
// import LoginPanel from "../../components/LoginPanel/LoginPanel";
import InfoStrip from "../../components/InfoStrip/InfoStrip";
import Footer from "../../components/Footer/Footer";

import "./Home.css";

const groceryItems = [
  {
    label: "Grocery",
    title: "Rice & Grains",
    description:
      "Browse available rice and grain products.",
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Grocery",
    title: "Flour & Atta",
    description:
      "Daily-use packaged flour and atta.",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Grocery",
    title: "Spices",
    description:
      "Explore Indian whole and powdered spices.",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Grocery",
    title: "Pulses & Dal",
    description:
      "Everyday pulses and lentils.",
    image:
      "https://images.unsplash.com/photo-1515543904379-3d757afe72e4?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Grocery",
    title: "Cooking Essentials",
    description:
      "Explore common everyday cooking products.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=700&q=80",
  },
];

const freshItems = [
  {
    label: "Fresh",
    title: "Fresh Fruits",
    description:
      "Seasonal fruits available at selected stores.",
    image:
      "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Fresh",
    title: "Green Vegetables",
    description:
      "Everyday fresh vegetables.",
    image:
      "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Fresh",
    title: "Tomatoes",
    description:
      "Fresh kitchen essentials.",
    image:
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Fresh",
    title: "Potatoes",
    description:
      "Daily-use vegetables from your nearby store.",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=700&q=80",
  },
];

const beverageItems = [
  {
    label: "Beverage",
    title: "Cold Drinks",
    description:
      "Cold beverages and refreshments.",
    image:
      "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Snacks",
    title: "Packaged Snacks",
    description:
      "Chips, namkeen and other snack items.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_qOfu9eRT5orel3T4jNIXldt0UMSKB4A-3Gu0PpJie1mw4BLg1iMULkw&s=10",
    id: "snacks",
  },
  {
    label: "Beverage",
    title: "Tea & Coffee",
    description:
      "Daily tea and coffee products.",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Food",
    title: "Packaged Food",
    description:
      "Everyday ready-to-use packaged products.",
    image:
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?auto=format&fit=crop&w=700&q=80",
  },
];

const householdItems = [
  {
    label: "Household",
    title: "Cleaning Products",
    description:
      "Everyday home cleaning products.",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Household",
    title: "Home Care",
    description:
      "Useful household supplies for daily use.",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Household",
    title: "Laundry Care",
    description:
      "Detergent and washing essentials.",
    image:
      "https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?auto=format&fit=crop&w=700&q=80",
  },
  {
    label: "Daily Use",
    title: "Personal Care",
    description:
      "Common daily personal care essentials.",
    image:"https://www.wizvalue.com/cdn/shop/articles/GettyImages-self-care-at-home-1200.jpg?v=1627710151"
  },
];

function Home() {
  return (
    <>
      <NotificationBanner />

      <TopBar />

      <Header />

      <LocationBar />

      <main id="home">
        <Hero />

        <PromoSlider />

        <CategoryGrid />

        <CategorySlider
          id="grocery"
          title="Grocery & Staples"
          description="Category-wise promotional images can be added, removed or updated from the admin system."
          items={groceryItems}
        />

        <CategorySlider
          id="fresh"
          title="Fruits & Vegetables"
          description="Fresh product images and promotional banners for your selected SahajoMart location."
          items={freshItems}
        />

        <CategorySlider
          id="beverages"
          title="Beverages & Snacks"
          description="Separate image slideshows can be created for every category."
          items={beverageItems}
        />

        <CategorySlider
          id="household"
          title="Household Essentials"
          description="Images shown here are examples. You can replace them with actual SahajoMart promotional images."
          items={householdItems}
        />

        {/* <VideoSection /> */}

        {/* <LoginPanel /> */}

        <InfoStrip />
      </main>

      <Footer />
            <FloatingVideo />

    </>
  );
}

export default Home;