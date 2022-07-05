import { getAllEvents } from '../../helpers/api-utils';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';
import { Fragment } from 'react';
import { useRouter } from 'next/router';


export default function AllEventsPage(props) {

  const events = props.events;
  const router = useRouter();

  function findEventsHandler(year, month){

    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  }

  return( 
  <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
  </Fragment>
  );
}

export async function getStaticProps(context) {
  const events = await getAllEvents();

  if(!events){
    return{
      notFound: true
    }
  }

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}



