import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../helpers/api-utils";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventsPage(props) {


  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          {" "}
          <p>Invalid Filter! Please adjust your values!</p>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </ErrorAlert>
      </Fragment>
    );
  }

  const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events found for the current date!</p>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </ErrorAlert>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context){
  
  const { params } = context;
  
  const filterData = params.slug;
  
  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]
  
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;
  
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
    ) {
      return {
        props: {
          hasError: true
        },
        // notFound: true
      };
    }
    
    const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth,
    });
    

  
  return{
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth
      }
    }
  }
}
