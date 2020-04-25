const url = "http://localhost:8080/counter"; // NOTE NEW URL

async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}

function addNewsource() {
    (async () => {
    let userName = document.getElementById("uname").value;
	let sourceName = document.getElementById("sourcename").value;
	const data = { 'name' : sourceName };
	const newURL = url + "/users/" + userName + "/create";
	console.log("sourceAdding: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "101: <b>" + userName + sourcename + " added.</b>";
	} else {
	    document.getElementById("output").innerHTML = "100: " + userName + sourcename + " not found.</b>";
	}
    })();
}

/*function sourceRead() {
    (async () => {
	let sourceName = document.getElementById("sourcename").value;
	let userName = document.getElementById("username").value;
	const data = { 'name' : sourceName };
	const newURL = url + "/users/" + userName + "/read";
	console.log("counterRead: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "201: <b>"  + userName + ", " + sourceName + " value = " + j['value'] + "</b>";
	} else {
	    document.getElementById("output").innerHTML = "200: " +  userName + ", " + sourceName + " not found.</b>";
	}	    
    })();
}*/

function themeUpdate() {
    (async () => {
	let userName = document.getElementById("uname").value;
	let themeValue = document.getElementById("themeValue").value;
	const data = { 'name' : sourceName, 'value' :themeValue};
	const newURL = url + "/users/" + userName + "/update";
	console.log("counterUpdate: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "301: <b>" + userName + ", " + " value = " + j['value'] + "</b>";
	} else {
	    document.getElementById("output").innerHTML = "300: " + userName + ", " +  " not found.";
	}	    
    })();
}

function sourceDelete() {
    (async () => {
	let sourceName = document.getElementById("sourcename").value;
	let userName = document.getElementById("uname").value;
	const data = { 'name' : sourceName};
	const newURL = url + "/users/" + userName + "/delete";
	console.log("Deleting source: " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "401: <b>" + userName + ", " + sourceName + " deleted.</b>";
	} else {
	    document.getElementById("output").innerHTML = "400: " + userName + ", " + sourceName + " not found.</b>";
	}	    
    })();
}
