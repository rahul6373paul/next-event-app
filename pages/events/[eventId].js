import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import { getAllEvents, getFeaturedEvents, getEventById } from "../../helpers/api-utils";

export default function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading... </p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  if(!event){
    return{
      notFound: true
    }
  }

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: true
  };
}
