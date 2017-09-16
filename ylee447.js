var homePage = document.getElementById('home-page');
var bookPage = document.getElementById('book-page');
var blurayPage = document.getElementById('bluray-page');
var registerPage = document.getElementById('register-page');
var commentPage = document.getElementById('comment-page');

var homeLink = document.getElementById('home-link');
var bookLink = document.getElementById('book-link');
var blurayLink = document.getElementById('bluray-link');
var registerLink = document.getElementById('register-link');
var commentLink = document.getElementById('comment-link');

homeLink.onclick = showHomePage;
bookLink.onclick = showBookPage;
blurayLink.onclick = showBluRayPage;
registerLink.onclick = showRegisterPage;
commentLink.onclick = showCommentPage;

function showHomePage() {
    homePage.style.display = 'block';
    bookPage.style.display = 'none';
    blurayPage.style.display = 'none';
    registerPage.style.display = 'none';
    commentPage.style.display = 'none';
}
function showBookPage() {
    homePage.style.display = 'none';
    bookPage.style.display = 'block';
    blurayPage.style.display = 'none';
    registerPage.style.display = 'none';
    commentPage.style.display = 'none';
    getBookList();
}

function showBluRayPage() {
    homePage.style.display = 'none';
    bookPage.style.display = 'none';
    blurayPage.style.display = 'block';
    registerPage.style.display = 'none';
    commentPage.style.display = 'none';
    getBlueRayList();
}

function showRegisterPage() {
    homePage.style.display = 'none';
    bookPage.style.display = 'none';
    blurayPage.style.display = 'none';
    registerPage.style.display = 'block';
    commentPage.style.display = 'none';
}

function showCommentPage() {
    homePage.style.display = 'none';
    bookPage.style.display = 'none';
    blurayPage.style.display = 'none';
    registerPage.style.display = 'none';
    commentPage.style.display = 'block';
    showComments();
}

function getBookList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booklist", true);
    xhr.setRequestHeader('Accept', 'application/json, text/javascript');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                var bookArray = JSON.parse(xhr.responseText);

                var tableContent = "<tr class = 'bookListTable'><th></th><th>Author</th><th>Book Id</th><th>Title</th><th></th></tr>\n";
                var i;
                for (i = 0; i < bookArray.length; i++)
                {
                    var book = bookArray[i];
                    var author = book.AuthorInitials + " " + book.AuthorSurname; 
                    var imageUrl = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + book.Id;
                    tableContent += "<tr><td><img id='bookImage' src='" + imageUrl + "'></img></td>";
                    tableContent += "<td>" + author + "</td>";
                    tableContent += "<td>" + book.Id + "</td>";
                    tableContent += "<td>" + book.Title + "</td>";
                    tableContent += "<td><button id='buyButton' onclick = \"buyBook('" + book.Id + "')\"><i class='material-icons' style='font-size:50px; color:pink' ;>shopping_cart</i>Buy now</button ></td></tr>";
                }

                var bookContent = document.getElementById("showBookList");
                bookContent.innerHTML = tableContent;
                console.log(book);

            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);

}

function getBlueRayList() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brlist", true);
    xhr.setRequestHeader('Accept', 'application/json, text/javascript');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {                
                var blueArray = JSON.parse(xhr.responseText);
                var tableContent = "<tr class = 'blueRayTable'><th></th><th>Id</th><th>Title</th><th></th></tr>\n";
                var i;
                for (i = 0; i < blueArray.length; i++) {
                    var blueRay = blueArray[i];
                    var imageUrl = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + blueRay.Id;
                    tableContent += "<tr><td><img id='blurayImage' src='" + imageUrl + "'></img></td>";
                    tableContent += "<td>" + blueRay.Id + "</td>";
                    tableContent += "<td>" + blueRay.Title + "</td>";
                    tableContent += "<td><button id='buyButton' onclick = \"buyBluRay('" + blueRay.Id + "')\"><i class='material-icons' style='font-size:50px; color:pink' ;>shopping_cart</i>Buy now</button ></td></tr>";
                }

                var blueRayContent = document.getElementById("showBlueRayList");
                blueRayContent.innerHTML = tableContent;
                console.log(blueRay);

            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);

}

function postComment() {
    var name = document.getElementById("nameInput").value;
    var comment = document.getElementById("commentInput").value;
    var http = new XMLHttpRequest();
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/comment?name=" + name;

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            alert("Comment has been posted!");
            showComments();
        }
    };

    http.send(JSON.stringify(comment));

}

function registerUser() {
    var address = document.getElementById("address").value;
    var userName = document.getElementById("userName").value;
    var password = document.getElementById("password").value;

    var userDetails = { "Address": address, "Name": userName, "Password": password };
    var jsonUserDetails = JSON.stringify(userDetails);

    var http = new XMLHttpRequest();
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/register";

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json");

    http.onload = function () {
        if (http.readyState === 4 && http.status === 200) {
            alert("Registered!");
            document.getElementById("address").value = "";
            document.getElementById("userName").value = "";
            document.getElementById("password").value = "";
        }
    };
    if (address === "" || userName === "" || password === "") {
        alert("All fields must be filled in!");
    }
    else {
        http.send(jsonUserDetails);
    }
   

}

function searchBookList() {
    var term = document.getElementById("term").value;
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/booksearch?term=" + term;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Accept', 'application/json, text/javascript');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

                var bookArray = JSON.parse(xhr.responseText);

                var tableContent = "<tr class = 'bookResultTable'><th></th><th>Author</th><th>Book Id</th><th>Title</th><th></th></tr>\n";
                var i;
                for (i = 0; i < bookArray.length; i++)
                {
                    var book = bookArray[i];
                    var author = book.AuthorInitials + " " + book.AuthorSurname; 
                    var imageUrl = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/bookimg?id=" + book.Id;
                    tableContent += "<tr><td><img src='" + imageUrl + "'></img></td>";
                    tableContent += "<td>" + author + "</td>";
                    tableContent += "<td>" + book.Id + "</td>";
                    tableContent += "<td>" + book.Title + "</td>";
                    tableContent += "<td><button id='buyButton' onclick = \"buyBook('" + book.Id + "')\"><i class='material-icons' style='font-size:50px; color:pink' ;>shopping_cart</i>Buy now</button ></td></tr>";
                }

                var bookContent = document.getElementById("showBookList");
                bookContent.innerHTML = tableContent;
                console.log(book);

            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);

}

function searchBlueRayList() {
    var blurayterm = document.getElementById("blurayterm").value;
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brsearch?term=" + blurayterm;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader('Accept', 'application/json, text/javascript');
    xhr.onreadystatechange = function (e) {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {                
                var blueArray = JSON.parse(xhr.responseText);
                var tableContent = "<tr class = 'blueRayTable'><th></th><th>Id</th><th>Title</th><th></th></tr>\n";
                var i;
                for (i = 0; i < blueArray.length; i++) {
                    var blueRay = blueArray[i];
                    var imageUrl = "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/brimg?id=" + blueRay.Id;
                    tableContent += "<tr><td><img src='" + imageUrl + "'></img></td>";
                    tableContent += "<td>" + blueRay.Id + "</td>";
                    tableContent += "<td>" + blueRay.Title + "</td>";
                    tableContent += "<td><button id='buyButton' onclick = \"buyBluRay('" + blueRay.Id + "')\"><i class='material-icons' style='font-size:50px; color:pink' ;>shopping_cart</i>Buy now</button ></td></tr>";

                }

                var blueRayContent = document.getElementById("showBlueRayList");
                blueRayContent.innerHTML = tableContent;
                console.log(blueRay);

            } else {
                console.error(xhr.statusText);
            }
        }
    };
    xhr.onerror = function (e) {
        console.error(xhr.statusText);
    };
    xhr.send(null);

}

function buyBook(bookId) {
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/bookbuy?id=" + bookId;
    document.location.href = url;
}

function buyBluRay(blueRayId) {
    var url = "http://redsox.uoa.auckland.ac.nz/BC/Closed/Service.svc/brbuy?id=" + blueRayId;
    document.location.href = url;
}


function showComments() {
    var name = document.getElementById("nameInput").value;
    var comment = document.getElementById("commentInput").value;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://redsox.uoa.auckland.ac.nz/BC/Open/Service.svc/htmlcomments", true);
    xhr.setRequestHeader('Accept', 'application/json, text/javascript');
    xhr.onload = function () {
        document.getElementById("showComments").innerHTML = xhr.responseText;
    }

    xhr.send(null);
}