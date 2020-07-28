// input fields
var task = document.getElementById('input');
// delete button
var btn = document.getElementById('button');
// list
var task_list = document.getElementById('tasksDiv');

btn.onclick=taskAppend;
 
function taskAppend() {
	// div
	var task_div = document.createElement('div');
	// evnt listener
	task_div.onclick = taskChange;
	
	// p
	var task_name = document.createElement('p');
	// content
	task_name.textContent = task.value;
	
	// checkbox
	var task_check = document.createElement('input');
	task_check.setAttribute('type','checkbox');
	// button
	var task_del_button = document.createElement('button');
	// name
	task_del_button.textContent = "Delete Task";
	
	// task div adding elements
	task_div.appendChild(task_check);
	task_div.appendChild(task_name);
	task_div.appendChild(task_del_button);
	// using geolocation adding tasks on map with name title 
	// Using GeoLocation Web API
	navigator.geolocation.getCurrentPosition((loc) => {
	
	// 
	new google.maps.Marker({
    position: {lat: loc.coords.latitude, lng: loc.coords.longitude},
    map,
    title: task.value
		});
	map.setCenter({lat: loc.coords.latitude, lng: loc.coords.longitude});
	});

	// adding to top
	task_list.prepend(task_div);
}	

function taskChange(e) {
	// check if the clicked was button or checkbox
	if(e.target.tagName == 'BUTTON')
	{
		// if btn then remove
		e.target.parentNode.parentNode.removeChild(e.target.parentNode);
	}
	else if (e.target.tagName == 'INPUT')
	{
		// if checkbox is checked then line though and adding to last
		if(e.target.checked) 
		{
			e.target.parentNode.querySelector('p').style.textDecoration = 'line-through';
			e.target.parentNode.parentNode.appendChild(e.target.parentNode);
		}
		// else remove line throug and add to top again
		else 
		{
			e.target.parentNode.querySelector('p').style.textDecoration = 'none';
			e.target.parentNode.parentNode.prepend(e.target.parentNode);
		}
	}
}
var map;
// initializing map at center of canada
function initMap() {
	// Using Google Map API 
	var canada = {lat: 56.1304, lng: -106.3468};
	map = new google.maps.Map(
    document.getElementById('map'), {zoom: 6, center: canada})
}