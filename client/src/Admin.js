import React, {useState, useEffect} from 'react';
import AddForm from './AddForm';
import './App.css';
import SearchForm from './SearchForm';
import { Link } from "react-router-dom"; 


function Admin() {

const [activities, setActivities] = useState([]);
const [error, setError] = useState("");


useEffect(() => {
    getActivities();
  }, []);

//render list of activities
const getActivities = async (keyword = '', age) =>{
let url = '/activities'
if(keyword){
  url += `/${keyword}`
 }
if(age){
  url += `/${age}`
 }
try{
  const response = await fetch(url);
  const data = await response.json();
  setActivities(data);

}
catch(err){
   setError(err.message);
}
  };


//DELETE
  const deleteActivity = async (id) =>{
try{
  const response = await fetch(`/activities/${id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }});
  getActivities();
}
catch(err){
   setError(err);
}
  };


  return (
<div className="App">
  <button className="btn btn-outline-danger m-2"><Link to="/Activities">Back to Activities catalogue</Link></button>
  <div className="container">
    <div className="row mb-4">
      <div className ="col-6">
<AddForm onDone={newActivity => setActivities(newActivity)} /> 
    </div>
      </div>
</div>


  <SearchForm submitCb={({age, keyword}) => getActivities({age, keyword})} />

      {/* {CATALOGUE} */}
      <div className="container">
     <h1></h1>
     <div id="activities_catalogue">
       <h2>Activities</h2>
       { activities.map((activity) => (
         <div key={activity.id} className="card-body">
           <div >
             <li className="list-group-item">
               <div className="card-title">
             Title: {activity.name}
             </div>
             <div className="card-text">
             <span className="mb-4">From children of: {activity.age} y.o</span>
             <p>{activity.description}</p>
             </div> 
             <button className="btn btn-danger m-2" onClick={()=> deleteActivity(activity.id)}>Delete activity</button>
             </li>
           </div>
         </div>
       ))}
     </div>
     <div id="errorMsg">{error}</div>
     
     
     </div>
     
    </div>
  );
}

export default Admin;
