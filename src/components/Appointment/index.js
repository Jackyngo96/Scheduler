import React from "react";
import "components/Appointment/styles.scss";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import useVisualMode from "hooks/useVisualMode";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    
    if(name && interviewer) { 
      transition(SAVING);
      
      const interview = {
        student: name,
        interviewer
      };
    
      // const appointmentData = {
      //   id: props.id ,
      //   time: props.time,
      //   interview: {
      //     student: name,
      //     interviewer: interviewer,
      //   },
      // }
      
      props.bookInterview(props.id, interview)
      
      .then(() => transition(SHOW));
    }
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save} interviewers={props.interviewers} onCancel={back} />
      )}
      {mode === SAVING && <Status message="Saving" />}
    </article>
  );
}
