import React from "react"; 
import DayListItem from "components/DayListItem"; 

export default function DayList(props) { 
//bring over days array 
const days = props.days
// Mapp each ListItem and give each item an key with thier individual ids
const mappedDays = days.map((day) => {
  return <DayListItem key={day.id} {...day} selected= {day.name === props.day} setDay= {props.setDay}/>
}); 
 

return(
<ul>
{mappedDays}
</ul>
);
};