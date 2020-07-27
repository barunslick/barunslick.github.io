import React from 'react';
import UserAvatar from './UserAvatar';
import UserContacts from './UserContacts';
import './App.css';
import './css/reset.css';
import './css/style.css';

const user = {
  firstName: 'Barun',
  lastName: 'Pradhan',
  email: 'barunpradhan987@gmail.com',
  phone: '9845397689',
  userImage: 'author.jpg'
}

function App() {
  return (
    <div className="App">
      <div className="UserAvatar">
        <UserAvatar userImage={user.userImage} />
      </div>
      <div className="userDetails">
        <div className="userNameHolder">
          <div className="userName">
            <p>{user.firstName}</p>
            <p>{user.lastName}</p>
          </div>
        </div>
        <div className="userContactHolder">
          <UserContacts userDetails={user} />
        </div>
      </div>
    </div>
  );
}

export default App;
