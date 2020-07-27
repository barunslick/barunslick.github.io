import React from 'react';

function UserAvatar(props) {
  return (
    <img src={require('./images/' + props.userImage)} alt="Author" />
  );
}

export default UserAvatar;
