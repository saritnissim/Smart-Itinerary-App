import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid"; // For Time Grid View
import { useEffect, useState } from "react";
import interactionPlugin from "@fullcalendar/interaction"; // For drag-and-drop
import { ItineraryItem } from "@shared/itineraryItem.interface";
import { EventInput } from "@fullcalendar/core";
import * as smartitineraryApi from "../api/smartItineraryApi";

const getOneHourLater = (dateStr: string) => {
  const date = new Date(dateStr);
  date.setHours(date.getHours() + 1);
  return date.toISOString();
};

interface DayCalendarProps {
  itineraryId: string;
  startDate: string;
  endDate: string;
  handleDatesSet: (arg) => void;
}
export default function DayCalendar(props: DayCalendarProps) {
  const { itineraryId, startDate, endDate, handleDatesSet } = props;
  const [itineraryItems, setItineraryItems] = useState<EventInput[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const itineraryItems: ItineraryItem[] =
          await smartitineraryApi.getItineraryItems(itineraryId);

        // Transform the data into the format FullCalendar expects
        const formattedActivities: EventInput[] = itineraryItems.map((item) => {
          return {
            id: item.id,
            title: item.description,
            start: item.start_time,
            end: item.end_time,
          };
        });

        setItineraryItems(formattedActivities);
      } catch (error) {
        console.error("Error fetching itinerary items:", error);
      }
    };

    fetchActivities();
  }, [itineraryId, handleDatesSet]); // Re-fetch when itineraryId changes

  const handleEventDrop = async (info) => {
    const { event } = info;
    console.log("Event dropped:", info.event.id);
    const updatedActivities: EventInput[] = itineraryItems.map((item) =>
      item.id === event.id
        ? {
            ...item,
            start: event.startStr,
            end: event.endStr,
          }
        : item
    );
    setItineraryItems(updatedActivities); // Update events state after the drop

    const updatedEvent: ItineraryItem = {
      id: event.id,
      itinerary_id: itineraryId,
      description: event.title,
      activity_date: event.startStr.split("T")[0],
      start_time: event.startStr,
      end_time: event.endStr,
    };

    await smartitineraryApi.patchItineraryItem(updatedEvent);
  };

  const handleDateClick = (info) => {
    const newTitle = prompt("Enter a title for the activity");

    // If the user clicked "Cancel" (prompt returns null), do nothing
    if (!newTitle) {
      return; // Exit the function without adding the event
    }

    // Generate a unique ID based on the current timestamp
    const uniqueId = `event_${Date.now()}`;

    const newCalendarEvent: EventInput = {
      id: uniqueId,
      title: newTitle,
      start: info.dateStr,
      end: getOneHourLater(info.dateStr),
    };

    console.log("Created new event:", newCalendarEvent);

    setItineraryItems([...itineraryItems, newCalendarEvent]); // Add the new event to local state

    const saveEvent = async () => {
      const startDateUTC = newCalendarEvent.start as string;
      const endDateUTC = newCalendarEvent.end as string;

      try {
        const itemToSave: ItineraryItem = {
          id: newCalendarEvent.id,
          itinerary_id: itineraryId,
          description: newCalendarEvent.title,
          activity_date: startDateUTC.split("T")[0],
          start_time: startDateUTC,
          end_time: endDateUTC,
        };

        await smartitineraryApi.addItineraryItem(itemToSave);
      } catch (error) {
        console.error("Error saving event:", error);
      }
    };
    saveEvent();
  };

  const handleDeleteEvent = async (eventId: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirm) {
      const response = await smartitineraryApi.deleteItineraryItem(eventId);
      if (response && response.status === 200) {
        setItineraryItems((prevEvents) =>
          prevEvents.filter((event) => event.id !== eventId)
        );
        console.log("Event deleted:", eventId);
      } else {
        console.error("Error deleting event:", response.statusText);
      }
    }
  };

  const handleEventResize = async (info) => {
    console.log("Event resized:", info.event.id);
    const start = info.event.start;
    const end = info.event.end;
    const updatedEvent = {
      id: info.event.id,
      itinerary_id: itineraryId,
      description: info.event.title,
      activity_date: start.toISOString().split("T")[0],
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    };
    try {
      const response = smartitineraryApi.patchItineraryItem(updatedEvent);
      console.log("Event updated:", response);
    } catch (error) {
      console.error("Error resizing event:", error);
    }
  };

  // Update current date whenever the view is changed

  const editable = endDate >= new Date().toISOString() ? true : false;

  return (
    <FullCalendar
      height="auto"
      plugins={[timeGridPlugin, interactionPlugin]}
      initialView="timeGridDay"
      validRange={{
        start: startDate, // Start date: January 1, 2025
        end: endDate, // End date: January 31, 2025
      }}
      headerToolbar={{
        left: "title",
        center: "",
        right: "prev next", // Removes the "today", "prev", "next" buttons
      }}
      eventContent={(eventInfo) => (
        <>
          <b> {eventInfo.timeText} </b>
          <i> {eventInfo.event.title} </i>
          <button
            id="event-delete-button"
            onClick={() => handleDeleteEvent(eventInfo.event.id)}
          >
            x
          </button>
        </>
      )} // Custom event content
      events={itineraryItems} // Pass events here
      editable={editable} // Enable drag-and-drop
      droppable={editable} // Allow events to be dropped
      eventDrop={handleEventDrop} // Handle event drop to update the state
      dateClick={editable ? handleDateClick : null} // Handle date click only if editable is true
      timeZone="UTC" // Set the timezone to UTC
      allDayText="" // This will hide the All Day label at the top
      datesSet={handleDatesSet} // Call this function whenever the view changes
      eventResize={handleEventResize}
    />
  );
}
