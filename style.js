var searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", function()
{
    var xmlhttp;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            var jsonFile = JSON.parse(xmlhttp.responseText),
                output = document.getElementById("searchOutput");
            output.innerHTML = "";

            for(var i=0; i<jsonFile.length; i++)
            {
                var name = jsonFile[i].name,
                    age = jsonFile[i].age,
                    gender = jsonFile[i].gender,
                    email = jsonFile[i].email,
                    phone = jsonFile[i].phone,
                    friends = jsonFile[i].friends,
                    registered = jsonFile[i].registered;

                if(name.indexOf(searchInput.value) !== -1 && searchInput.value !== "" ||
                    name.toLowerCase().indexOf(searchInput.value) !== -1 && searchInput.value !== "" ||
                    name.toUpperCase().indexOf(searchInput.value) !== -1 && searchInput.value !== "" )
                {
                    var searchObject = document.createElement("P");
                    var span = searchObject.appendChild(document.createElement("SPAN"));
                    span.appendChild(document.createTextNode(name));
                    searchObject.appendChild(document.createElement("BR"));
                    searchObject.appendChild(document.createTextNode("age: "));
                    searchObject.appendChild(document.createTextNode(age));
                    searchObject.appendChild(document.createElement("BR"));
                    searchObject.appendChild(document.createTextNode("gender: "));
                    searchObject.appendChild(document.createTextNode(gender));
                    searchObject.appendChild(document.createElement("BR"));
                    searchObject.appendChild(document.createTextNode("email: "));
                    searchObject.appendChild(document.createTextNode(email));
                    searchObject.appendChild(document.createElement("BR"));
                    searchObject.appendChild(document.createTextNode("phone: "));
                    searchObject.appendChild(document.createTextNode(phone));
                    searchObject.appendChild(document.createElement("BR"));
                    searchObject.appendChild(document.createTextNode("friends: "));
                    var ul = document.createElement("UL");
                    for(var j=0; j<friends.length; j++)
                    {
                        var li = document.createElement("LI"),
                            friendName = document.createTextNode(friends[j].name);
                        li.appendChild(friendName);
                        ul.appendChild(li);
                    }
                    searchObject.appendChild(ul);
                    searchObject.appendChild(document.createTextNode("registered at: "));

                    var registeredAt = new Date(registered.split(" ")[0]).toLocaleString();

                    searchObject.appendChild(document.createTextNode(registeredAt));
                    searchObject.appendChild(document.createElement("HR"));
                    output.appendChild(searchObject);
                }
            }
        }
    }
    xmlhttp.open("GET","http://codetuts.nl/json/list.php",true);
    xmlhttp.send();
});