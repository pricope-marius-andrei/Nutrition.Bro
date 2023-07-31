import Image from 'next/image'
import NavBar from '@/components/navbar'
import Hero from '@/components/hero'
import Description from '@/components/description'

export default function Home() {
  return (
    <div>
      <NavBar/>
      <Hero/>
      <Description text="Do you want to change your alimentation and you don’t know what choices to do? Here you can calculate your calories and compare food’s nutients, only with a click. NUTRITION.BRO is very usefull tool to manage your diat and calories. "/>
    </div>
  )
}
