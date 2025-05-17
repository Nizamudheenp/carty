import React from 'react'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import Products from '../components/Products'
import Banner from '../components/Banner'
import SmallBanner from '../components/SmallBanner'
import SmallBanner2 from '../components/SmallBanner2'
import NewsLetter from '../components/NewsLetter'
import ProductCollection from '../components/ProductCollection'

function Home() {
  return (
    <div>
      <Hero />
      <Feature />
      <ProductCollection title="Featured Products" tag="Top Brand" limit={8} />
      <Banner />
      <ProductCollection title="Summer Sales" tag="interested in" limit={8} />
      <SmallBanner />
      <SmallBanner2 />
      <NewsLetter />
    </div>
  )
}

export default Home