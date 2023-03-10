import { bikeDetailsTemplate } from './contstants.js';

async function fetchBikes() {
  try {
    let response = await fetch('../bikes_response.json');
    let data = await response.json();



    let allData = data;
    //code to generate the view
    data.forEach(bike => {
      let view = document.getElementById("view");
      let div = document.createElement("div");
      div.classList.add("bike-card");
      div.innerHTML = bikeDetailsTemplate(bike)

      view.appendChild(div);
    });

   

    // Add event listener for the search button
    document.getElementById("search-button").addEventListener("click", function () {
      let searchValue = document.getElementById("make-search").value.trim().toLowerCase();
     
      //searchValue.trim();  
      let matchingBikes = data.filter(bike => 
        bike.Make.toLowerCase().includes(searchValue) ||
        bike.Model.toLowerCase().includes(searchValue) ||
        bike.Year.toString().includes(searchValue));

      /*let matchingBikes = data.filter(bike => 
        bike.Make.toLowerCase() === searchValue.toLowerCase() 
        );*/
        
      /*let matchingBikes = data.filter(bike => 
        bike.Model.toLowerCase() === searchValue.toLowerCase() ||
        bike.Year.toLowerCase() === searchValue.toLowerCase()  ||
        bike.Terrain.toLowerCase() === searchValue.toLowerCase());*/

        
      // clear the current view
      view.innerHTML = "";
      // generate the view for the matching bikes
      matchingBikes.forEach(bike => {
        let div = document.createElement("div");
        div.classList.add("bike-card");
        div.innerHTML = bikeDetailsTemplate(bike)
        view.appendChild(div);
      });
    });


    // Add event listener for the clear button
    document.getElementById("clear-button").addEventListener("click", function () {
      // clear the current view
      view.innerHTML = "";
      // generate the view for all the data
      allData.forEach(bike => {
        let div = document.createElement("div");
        div.classList.add("bike-card");
        div.innerHTML = bikeDetailsTemplate(bike)
        view.appendChild(div);
      });
    });



    // Function to sort the JSON data by a given property
    function sortBikes(property) {
      allData.sort(function (a, b) {
        let x = a[property];
        let y = b[property];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
    }


    // Add an event listener to the select element
    document.getElementById("sort-select").addEventListener("change", function () {
      let selectedOption = this.value;

      // Clear the current view
      let view = document.getElementById("view");
      while (view.firstChild) {
        view.removeChild(view.firstChild);
      }

      // Sort the JSON data by the selected property
      sortBikes(selectedOption);

      // Repopulate the view with the sorted JSON data
      allData.forEach(bike => {
        let div = document.createElement("div");
        div.classList.add("bike-card");
        div.innerHTML = bikeDetailsTemplate(bike)
        view.appendChild(div);
      });
    });

  } catch (error) {
    console.error(error);
  }
}
fetchBikes();





