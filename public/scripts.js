function show_user_info() {
        var username = "not logged in :("
        var message = "Please log in to access the user hub!"

        var user_indicator = document.getElementById("username");
        var user_indicator1 = document.getElementById("user1");
        user_indicator1.style.visibility = "hidden";
        var user_message = document.getElementById("loggged-indicator");
        document.getElementById("hub-lead").style.visibility = "hidden";
        document.getElementById("login-table").style.visibility = "hidden";

        if(sessionStorage.getItem('user') != null){
            username = sessionStorage.getItem('user');
            message = "Welcome to the User Hub, "
            user_indicator1.style.visibility = "visible";
            document.getElementById("hub-lead").style.visibility = "visible";
            document.getElementById("login-table").style.visibility = "visible";
            login_data(username);
        }

        user_indicator.innerHTML = username;
        user_message.innerHTML = message;
        user_indicator1.innerHTML = username + "!";

      }
      function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
          var user_indicator = document.getElementById("username");
          user_indicator.innerHTML = "not logged in :(";
          location.reload();
        });

      }

      function login_data(username) {
        var request = new XMLHttpRequest();
        request.open('GET', "https://immense-spire-32496.herokuapp.com/logins.json?username=" + encodeURI(username),
                                                                         true);

        request.send();

        request.onreadystatechange = function() {
            if (request.readyState == XMLHttpRequest.DONE) {
                if (request.status != 200)
                    alert ("Error loading user data. Please refresh page.");
                else {
                    var logins = JSON.parse(request.responseText);
                    draw_table(logins);
                }
            }
        }
      }
      function draw_table (logindata) {
        var table = document.getElementById("login-table");
        tabBody=document.getElementsByTagName("tbody").item(0);
        var num_logins = logindata.length;
        for (var i = 0; i < num_logins; i++) {
            console.log(logindata[i]);
            row=document.createElement("tr");
             cell1 = document.createElement("td");
             cell2 = document.createElement("td");
             textnode1=document.createTextNode(logindata[i].username);
             textnode2=document.createTextNode(logindata[i].time);
             cell1.appendChild(textnode1);
             cell2.appendChild(textnode2);
             row.appendChild(cell1);
             row.appendChild(cell2);
             tabBody.appendChild(row);
        }
        var loginmsg = document.getElementById("login-count");
        var newmsg;
        if (num_logins > 10)
          newmsg = (num_logins + 1) + " times! We're glad you like GoJumboGo";
        else if (num_logins == 0)
          newmsg = "once. Welcome to GoJumboGo"
        else 
          newmsg = "only " + (num_logins + 1) + " times. Thanks for joining us";
        loginmsg.innerHTML = newmsg;
      }
