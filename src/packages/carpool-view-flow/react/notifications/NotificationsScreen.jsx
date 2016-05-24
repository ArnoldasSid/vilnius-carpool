import React from 'react'
import { createContainer } from 'meteor/react-meteor-data';
import wrapScreen from '../layout/wrapScreen'
import NotificationCard from './NotificationCard'
import Loader from '../components/Loader'


// const notifications = [{
//   name: 'Agnė',
//   date: 'May 29, 17:40',
//   from: 'Akropolis',
//   to: 'Naugarduko g. 65',
//   notificationType: 'ride offer',
//   image: 'http://lorempixel.com/200/200/people/' + Math.round(Math.random() * 9),
// }]

export default class Notifications extends React.Component {
  render () {
    const { progress, notifications } = this.props;
    //console.log("NotificationScreen progress", progress.getProgress())
    if (100 != progress.getProgress()) {
      //console.log("Show loader");
      return (
        <section style={{height: "100%", marginTop: 25}}>
          <Loader />
        </section>
      );
    } else {
      //console.log("Show notifications");
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          {notifications.map((notification, i) => (
            <NotificationCard key={i} notification={notification} width={window.innerWidth} />
          ))}
        </div>
      )
    }
  }
}

Notifications.propTypes = {
  progress: React.PropTypes.object,
  notifications: React.PropTypes.array,
};

export default NotificationScreen = createContainer(({}) => {
  const progress = new Progress();

  var handle = Meteor.subscribe('Notifications');
  if(handle.ready()) {
    //console.log("NotificationScreen handle ready")
    progress.setProgress("notifications", 100);
    var query = {};
    var showHistory = false;
    //query = {recievedAt: {$exists: showHistory}};
    query = {}
    notifications = NotificationHistory.find(query, {sort:{addedAt:-1}}).fetch();
  } else {
    //console.log("NotificationScreen progress 0")
    progress.setProgress("notifications", 0);
  }

  return {
    progress,
    notifications
  };
}, Notifications);