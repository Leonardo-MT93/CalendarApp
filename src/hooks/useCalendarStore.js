import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const { events, activeEvent,  } = useSelector( state => state.calendar)
    const dispatch = useDispatch();
    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent( calendarEvent ))
    }

    const startSavingEvent = async(calendarEvent) => {


      if(calendarEvent._id){
        //ACTUALIZANDO
        dispatch(onUpdateEvent({...calendarEvent}))
      } else{
        //CREANDO
        dispatch( onAddNewEvent( {...calendarEvent, _id: new Date().getTime()}))
      }
      
    }


    const startDeletingEvent = () =>  {
      dispatch(onDeleteEvent())
    }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent
  }
}
