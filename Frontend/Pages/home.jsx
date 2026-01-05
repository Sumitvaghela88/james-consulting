import { useState } from 'react'
import Navbar from '../Components/Navrbar'
import Herosection from '../Components/Herosection'
import ConsultingForm from '../Components/ConsultingForm'
import AboutUs from '../Components/About'
import ServicesSection from '../Components/ServiceSection'
import Footer from '../Components/Footer'
import ChatWidget from '../Components/ChatWidget'
import '../src/App.css'



function Home() {


  return (
    <>
      <Navbar />
      <Herosection />
      <AboutUs />
      <ServicesSection />
      <ConsultingForm />
      <Footer />
      <ChatWidget />
    </>
  )
}

export default Home;
