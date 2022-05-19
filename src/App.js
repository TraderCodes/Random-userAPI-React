import React, { useState, useEffect } from 'react';
import {
   FaEnvelopeOpen,
   FaUser,
   FaCalendarTimes,
   FaMap,
   FaPhone,
   FaLock,
} from 'react-icons/fa';
const url = 'https://randomuser.me/api/';
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';
function App() {
   // set loading
   const [loading, setLoading] = useState(true);
   const [person, setPerson] = useState(null);
   const [title, setTitle] = useState('name');
   const [value, setValue] = useState('random person');

   // fetch API getPerson = async
   const getPerson = async () => {
      const response = await fetch(url);
      const data = await response.json();

      // get first item from results useing results[0]
      const person = data.results[0];
      //  destructure person
      const { phone, email } = person;
      // image
      // rename large into image
      const { large: image } = person.picture;
      const {
         login: { password },
      } = person;
      // get first and last name
      const { first, last } = person.name;
      const { dob: age } = person;
      // inside the street we destructure number and name
      const {
         street: { number, name },
      } = person.location;

      // place in new list
      const newPerson = {
         image,
         phone,
         email,
         password,
         age,
         street: `${number}${name}`,
         name: `${first}${last}`,
      };
      // now we pass in newPerson into setPerson

      setPerson(newPerson);
      setLoading(false);
      // that part is  my "title" is
      setTitle('name');
      setValue(newPerson.name);
   };

   // useEffect everytime when we fetch a user
   useEffect(() => {
      getPerson();
   }, []);

   const handleValue = (e) => {
      console.log(e.target);
   };
   return (
      <main>
         <div className="block bcg-black"></div>
         <div className="block">
            <div className="container">
               <img
                  src={(person && person.image) || defaultImage}
                  alt="4"
                  className="user-img"
               />
               <p className="user-title">my {title} is</p>
               <p className="user-value">{value}</p>
               {/* icon */}
               <div className="values-list">
                  <button
                     className="icon"
                     data-label="name"
                     onMouseOver={handleValue}
                  >
                     <FaUser />
                  </button>
                  <button
                     className="icon"
                     data-label="emal"
                     onMouseOver={handleValue}
                  >
                     {' '}
                     <FaEnvelopeOpen />{' '}
                  </button>
                  <button
                     className="icon"
                     data-label="age"
                     onMouseOver={handleValue}
                  >
                     {' '}
                     <FaCalendarTimes />
                  </button>
                  <button
                     className="icon"
                     data-label="steet"
                     onMouseOver={handleValue}
                  >
                     <FaMap />
                  </button>
                  <button
                     className="icon"
                     data-label="phone"
                     onMouseOver={handleValue}
                  >
                     <FaPhone />
                  </button>
                  <button
                     className="icon"
                     data-label="password"
                     onMouseOver={handleValue}
                  >
                     <FaLock />
                  </button>
               </div>
               {/* button for generator and loading  */}
               <button className="btn" type="button">
                  {loading ? 'loading' : 'random user'}
               </button>
            </div>
         </div>
      </main>
   );
}

export default App;
