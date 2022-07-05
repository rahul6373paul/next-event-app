import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { getFeaturedEvents } from '../helpers/api-utils';
import EventList from '../components/events/event-list';


export default function Home(props) {

  return (
    <div className={styles.container}>
      <EventList items={props.events} />
    </div>
  )
}

export async function getStaticProps(){
  const featuredEvents = await getFeaturedEvents()
  
  return{
    props:{
      events: featuredEvents
    },
    revalidate: 1800
  }
}
