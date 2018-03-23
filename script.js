var init = {
  apiKey: 'AIzaSyBzXsSM1JfNtfQO8Le7ZqNzAaQKEGp6jFM',
  authDomain: 'cftk-app.firebaseapp.com',
  databaseURL: 'https://cftk-app.firebaseio.com',
  projectId: 'cftk-app',
  storageBucket: 'cftk-app.appspot.com',
  messagingSenderId: '823039755315'
}

firebase.initializeApp(init)
const database = firebase.database().ref('users/').orderByChild('points')

database.once('value', function (snapshot) {
  var items = []
  snapshot.forEach(function (childSnapshot) {
    var result = childSnapshot.val()
    var item = {}

    item.name = result.name
    item.points = result.points

    var keysFound = []
    childSnapshot.forEach(function (keys) {
      if (keys.key !== 'name' && keys.key !== 'points') {
        keysFound.push(keys.key)
      }
    })
    item.keysFound = keysFound
    items.push(item)
  })

  displayItems(items.reverse())
})

function displayItems (items) {
  for (var i = 0; i < items.length; i++) {
    $('.participants tr:last').after('<tr><td>' + items[i].name + '</td><td>' + items[i].points + '</td><td>' + items[i].keysFound.sort().toString().replace(/,/g, '<br />') + '</td></tr>')
  }
}
