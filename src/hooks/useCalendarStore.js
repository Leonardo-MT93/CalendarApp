import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertsEventsToDateEvents } from "../helper";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const { events, activeEvent  } = useSelector( state => state.calendar)
    const { user  } = useSelector( state => state.auth)
    const dispatch = useDispatch();
    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent( calendarEvent ))
    }

    const startSavingEvent = async(calendarEvent) => {

      try {

          if(calendarEvent.id){
            //ACTUALIZANDO
            await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
    
            dispatch(onUpdateEvent({...calendarEvent, user}));
            return;
          } 
          //CREANDO
            const { data } = await calendarApi.post('/events', calendarEvent);
            dispatch( onAddNewEvent( {...calendarEvent,id: data.evento.id, user}))

        
      } catch (error) {
        console.log(error);
        Swal.fire('Error al guardar', error.response.data.msg, 'error')
      }
    }


    const startDeletingEvent = async() =>  {

      try {
        await calendarApi.delete(`/events/${activeEvent.id}`)
        dispatch(onDeleteEvent())
      } catch (error) {
        console.log(error);
        Swal.fire('Error al eliminar', error.response.data.msg, 'error');

      }
      
    }


    const startLoadingEvents = async() => {

      try {
         const {data} = await calendarApi.get('/events' );
         const events = convertsEventsToDateEvents( data.eventos);
         dispatch(onLoadEvents(events));
      } catch (error) {
        console.log(error)
      }
    }
  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}
