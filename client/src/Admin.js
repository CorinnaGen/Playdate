import React, {useState, useEffect} from 'react';
import AddForm from './AddForm';
import './App.css';
import SearchForm from './SearchForm';



function Admin() {

const [activities, setActivities] = useState([]);
const [error, setError] = useState("");
const [keyword, setKeyword] = useState("");
const [age, setAge] = useState("");

useEffect(() => {
    getActivities();
  }, []);

//render list of activities
const getActivities = async (keyword = '') =>{
  //declare base url
  //if keyword append that on the end of url
let url = '/activities'
if(keyword){
  url += `/${keyword}`
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

//FILTER SEARCH by keyword
const handleKeyword = (event) =>{
  event.preventDefault();   
  const keyword = event.target.value;
  setKeyword(keyword)
  
}




//FILTER SEARCH by age
const handleAge= (event) =>{
  event.preventDefault();
  const age = event.target.value;
  setAge(age)

  
}

const getActivitiesByAge = async () =>{
try{
  const response = await fetch(`/activities/${age}`);
  const data = await response.json();
  setActivities(data);

}
catch(err){
   setError(err.message);
}
  };


//FOR THE UPDATE ANOTHER COMPONENT?


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
  <div className="container">
    <div className="row mb-4">
      <div className ="col-6">
<AddForm onDone={newActivity => setActivities(newActivity)} /> 
    </div>
      </div>
</div>


  <SearchForm submitCb={(keyword)=>getActivities(keyword)} />

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
             <span className="mb-4">From children of: {activity.age_range} y.o</span>
             <span>This is an {activity.outdoor === 1 ? 'outdoor' : 'indoor'} activity</span>
             <p>{activity.description}</p>
             </div>
             
             <button className="btn btn-primary m-2">Update activity</button>
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
