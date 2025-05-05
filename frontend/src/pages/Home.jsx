import React from 'react'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Products from '../components/Products'
import Banner from '../components/Banner'
import SmallBanner from '../components/SmallBanner'
import SmallBanner2 from '../components/SmallBanner2'
import NewsLetter from '../components/NewsLetter'

function Home() {
  return (
    <div>
    <Hero />
    <Feature />
    <Products />
    <Banner />
    <Products />
    <SmallBanner />
    <SmallBanner2 />
    <NewsLetter />
  </div>
  )
}

export default Home