Meteor.methods
  removeUsers: () ->
    console.log '---', "Cleanup users"
    Meteor.users.remove {}

  removeUser: (email) ->
    console.log '---', "Remove user"
    Meteor.users.remove {"emails.address": email}

  assureUser: (opts, extra) ->
    try
      id =  Accounts.createUser
        email: opts.email
        password: if opts.password then opts.password else 'aaa'
      console.log '---', "Created user #{id}", opts
      if extra
        err = Meteor.users.update _id: id, {$set: extra}
        console.log '---', "Added extra to user #{id}", extra, err
    catch err
      console.log '---', "Creation error", err unless err.error is 403

  assureStop: (title, loc) ->
    Stops.upsert({title: title}, {title: title, "loc" : loc or [  25.272159576416016,  54.69387649850695 ]})


  removeTrips: (email) ->
    user = Meteor.users.findOne "emails.address": email
    console.log '---', "Remove trips for", user
    Trips.remove owner: user._id
