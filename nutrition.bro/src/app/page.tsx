import NavBar from '../components/navbar'
import Hero from '../components/hero'
import Description from '../components/description'
import Footer from '../components/footer'
import Guide from '../components/guide'

export default function Home() {
  return (
    <div>
      <Hero/>
      <Description text="Do you want to change your alimentation and you don’t know what choices to do? Here you can calculate your calories and compare food’s nutients, only with a click. NUTRITION.BRO is very usefull tool to manage your diat and calories. "/>
      <Guide/>
    </div>
  )
}
