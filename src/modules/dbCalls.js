const API = {
  loginUser: function (username, password) {
    return fetch(
      `http://localhost:8088/users?username=${username}&password=${password}`
    ).then(response => response.json());
  },
  getAllUsers: function () {
    return fetch("http://localhost:8088/users").then(response =>
      response.json()
    );
  },
  getAllUsersExcluding: function (excludingUserId) {
    return fetch(`http://localhost:8088/users?id_ne=${excludingUserId}`).then(
      response => response.json()
    );
  },
  addUser: function (obj) {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  getUserNews: function (userId) {
    return fetch(
      `http://localhost:8088/news?userId=${userId}&_sort=dateAdded&_order=asc`
    ).then(response => response.json());
  },
  getUserTasks: function (userId) {
    return fetch(`http://localhost:8088/tasks?userId=${userId}`).then(
      response => response.json()
    );
  },
  getSingleUserTask: function (taskId) {
    return fetch(`http://localhost:8088/tasks/${taskId}`).then(response =>
      response.json()
    );
  },
  getUserEvents: function (userId) {
    return fetch(
      `http://localhost:8088/events?userId=${userId}&_sort=eventDate&_order=desc`
    ).then(response => response.json());
  },
  getSingleUserEvent: function (eventId) {
    return fetch(`http://localhost:8088/events/${eventId}`).then(response =>
      response.json()
    );
  },
  getSingleMessage: function (messageId) {
    return fetch(`http://localhost:8088/messages/${messageId}`).then(response =>
      response.json()
    );
  },
  getSingleUserNews: function (newsId) {
    return fetch(`http://localhost:8088/news/${newsId}`).then(response =>
      response.json()
    );
  },
  addNews: function (obj) {
    return fetch("http://localhost:8088/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  addEvent: function (obj) {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  editEvent: function (eventsId, obj) {
    return fetch(`http://localhost:8088/events/${eventsId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  addTask: function (obj) {
    return fetch("http://localhost:8088/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  addFriends: function (currentUserId, friendName) {
    return fetch(
      `http://localhost:8088/friends?srcUserId=${currentUserId}&_expand=user`
    )
      .then(response => response.json())
      .then(friends => {
        if (
          friends.find(freind => freind.user.username === friendName) ===
          undefined
        ) {
          return fetch(`http://localhost:8088/users?username=${friendName}`)
            .then(response => response.json())
            .then(reply => {
              let obj1 = {
                srcUserId: Number(currentUserId),
                userId: reply[0].id,
                initiate: true,
                accepted: false
              };
              let obj2 = {
                srcUserId: reply[0].id,
                userId: Number(currentUserId),
                initiate: false,
                accepted: false
              };
              return fetch("http://localhost:8088/friends", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(obj1)
              })
                .then(response => response.json())
                .then(response => {
                  return fetch("http://localhost:8088/friends", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj2)
                  }).then(response => response.json());
                });
            });
        }
      });
  },
  getFriendsNews: function (userId) {
    return fetch(
      `http://localhost:8088/friends?srcUserId=${userId}&accepted=true`
    )
      .then(response => response.json())
      .then(friendList => {
        const friendDetails = friendList.map(freindObj => {
          var friend = freindObj.userId;
          return fetch(
            `http://localhost:8088/users/${friend}?_embed=news`
          ).then(response => response.json());
        });
        return Promise.all(friendDetails);
      });
  },
  getFriendsEvents: function (userId) {
    return fetch(
      `http://localhost:8088/friends?srcUserId=${userId}&accepted=true`
    )
      .then(response => response.json())
      .then(friendList => {
        const friendDetails = friendList.map(freindObj => {
          var friend = freindObj.userId;
          return fetch(
            `http://localhost:8088/users/${friend}?_embed=events`
          ).then(response => response.json());
        });
        return Promise.all(friendDetails);
      });
  },
  editNews: function (newsId, obj) {
    return fetch(`http://localhost:8088/news/${newsId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  editTask: function (taskId, obj) {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  acceptFriends: function (userId, friendUserId) {
    console.log("hello from accept friends");
    return Promise.all([
      this.getFriendPair(userId, friendUserId),
      this.getFriendPair(friendUserId, userId)
    ]).then(replies => {
      console.log(replies);
      replies.forEach(reply => {
        console.log(reply);
        patchFriend(reply[0].id);
      });
    });
  },
  deleteFriend: function (userId, friendId) {
    console.log("User id", userId);
    console.log("Friend id", friendId);
    return fetch(
      `http://localhost:8088/friends?srcUserId=${userId}&userId=${friendId}`
    )
      .then(response => response.json())
      .then(friendTableId => {
        return fetch(`http://localhost:8088/friends/${friendTableId[0].id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => response.json());
      });
  },
  deleteNews: function (newsId) {
    return fetch(`http://localhost:8088/news/${newsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  },
  deleteEvents: function (eventsId) {
    return fetch(`http://localhost:8088/events/${eventsId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  },
  deleteTask: function (taskId) {
    return fetch(`http://localhost:8088/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  },
  getAllMessages: function () {
    return fetch(
      "http://localhost:8088/messages?_expand=user&_sort=sendDate&_order=desc"
    ).then(response => response.json());
  },
  getUserRelationships: function (sessionUser, messageUser) {
    return fetch(
      `http://localhost:8088/friends/?userId=${sessionUser}&srcUserId=${messageUser}`
    ).then(response => response.json());
  },
  addMessages: function (obj) {
    return fetch("http://localhost:8088/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  editMessages: function (messageId, obj) {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(response => response.json());
  },
  deleteMessages: function (messageId) {
    return fetch(`http://localhost:8088/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => response.json());
  },
  getFriendsList: function (userId, TorF, iTorF) {
    return fetch(
      `http://localhost:8088/friends?srcUserId=${userId}&accepted=${TorF}&initiate=${iTorF}&_expand=user`
    ).then(response => response.json());
  },
  getAcceptedFriendsList: function (userId) {
    return fetch(
      `http://localhost:8088/friends?srcUserId=${userId}&accepted=true&_expand=user`
    ).then(response => response.json());
  },
  getFriendPair: function (id1, id2) {
    return fetch(
      `http://localhost:8088/friends?srcUserId=${id1}&userId=${id2}`
    ).then(response => response.json());
  }
};

function patchFriend(pairId) {
  return fetch(`http://localhost:8088/friends/${pairId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ accepted: true, initiate: true })
  }).then(response => response.json());
}
export default API;

