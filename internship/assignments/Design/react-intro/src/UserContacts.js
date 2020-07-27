import React from 'react';

function UserContacts(props) {
  console.log(props)
  return (
    <div className="UserContacts">
      <p><a href={'mailto: ' + props.userDetails.email}>{props.userDetails.email}</a></p>
      <p><a href={'tel: ' + props.userDetails.phone}>{props.userDetails.phone}</a></p>
    </div>
  );
}

export default UserContacts;
