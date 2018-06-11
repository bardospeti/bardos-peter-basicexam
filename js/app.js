function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  var data = userDatas[2].data;

  /*
  //teszt
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i].cost_in_credits) {
      count++;
      console.log(data[i].id, data[i].cost_in_credits);
    }
  }
  console.log(count);
  */

  //teszt kiíratások
  console.log(data);
  console.log(data[10].id);
  console.log(data[7].cost_in_credits);
  console.log(parseInt(data[7].cost_in_credits));




  //függvények
  //1.feladat
  //önmagában a null értékek miatt nem tökéletesen ment (sql szerint a Halálcsillag a legdrágább, mégsem azt hozta ki), ezért van szükség a következő fv-re, ahol meghívom ezt
  function sortByCostInCreditsAsc(dataArray) {
    var i = dataArray.length;
    var swap = false;

    do {
      swap = false;
      for (var j = 0; j < i - 1; j++) {
        if (parseInt(dataArray[j].cost_in_credits) > parseInt(dataArray[j + 1].cost_in_credits)) {
          [dataArray[j], dataArray[j + 1]] = [dataArray[j + 1], dataArray[j]];
          swap = true;
        }
      }
      i--;
    } while (i >= 0 && swap);
    return dataArray;
  }


  //1. feladat folytatása
  function temporarilySeparateWhereCostInCreditsIsNullThenSortAndConcat(dataArray) {
    var nullArray = [];
    var notNullArray = [];
    for (var i = 0; i < dataArray.length; i++) {
      if (!data[i].cost_in_credits) {
        nullArray.push(data[i]);
      } else {
        notNullArray.push(data[i]);
      }
    }
    console.log(`nullArray hossza: ${nullArray.length}`);
    console.log(`notNullArray hossza: ${notNullArray.length}`);

    var sortedNotNullArray = sortByCostInCreditsAsc(notNullArray);
    //console.log(notNullArray);

    return nullArray.concat(sortedNotNullArray);
  }


  //2. feladat
  function deleteSpaceshipWhereConsumablesInNull(dataArray) {
    //var count = 0;
    var consumablesIsNotNull = [];
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].consumables) {
        consumablesIsNotNull.push(dataArray[i]);
      }
      //count++;
    }
    dataArray = consumablesIsNotNull;
    delete dataArray;
    //console.log(count);
    //console.log(consumablesIsNotNull);
    return dataArray;
  }


  //3. feladat
  //nem megy!!!
  function everyNullValuesToUnknown(dataArray) {
    var count = 0;
    for (var i = 0; i < dataArray.length; i++) {
      for (var j = 0; j < Object.keys(dataArray[i]).length; j++) {
        if (dataArray[i].j == null) {
          dataArray[i].j = 'unknown';
          count++;
        }
      }
    }
    console.log(dataArray);
    console.log(count);
    return dataArray;
  }


  //4. feladat

  //egy űrhajó megjelenítése
  var objSpaceshipsContainer = document.querySelector('.shapceship-list');

  function drawOneSpaceship(oneSpaceship) {
    var objContainerForOneSpaceship = document.createElement('div');
    var objPicContainer = document.createElement('div');
    var objPic = document.createElement('img');
    var objDataContainer = document.createElement('div');

    objContainerForOneSpaceship.classList.add('containerForOneSpaceship');
    objPicContainer.classList.add('picContainer');
    objPic.classList.add('pic');
    objDataContainer.classList.add('dataContainer');
    objPic.setAttribute('src', `img/${oneSpaceship.image}`);
    objPic.setAttribute('alt', '');
    objDataContainer.innerText = '';
    for (var j in oneSpaceship) {
      objDataContainer.innerHTML += `${j}: ${oneSpaceship[j]}<br>`;
    }
    objContainerForOneSpaceship.appendChild(objPicContainer);
    objPicContainer.appendChild(objPic);
    objContainerForOneSpaceship.appendChild(objDataContainer);
    objSpaceshipsContainer.appendChild(objContainerForOneSpaceship);
  }


  function drawAllSpaceships(allSpaceships) {
    for (var i = 0; i < allSpaceships.length; i++) {
      drawOneSpaceship(allSpaceships[i]);
    }
  }


  //5. feladat
  function showStats(allSpaceships) {
    var objStatsContainer = document.createElement('div');
    var objStatsA = document.createElement('p')
    var objStatsB = document.createElement('p')
    var objStatsC = document.createElement('p')
    var objStatsD = document.createElement('p')

    objStatsContainer.classList.add('statsContainer');
    objStatsA.classList.add('statsA');
    objStatsA.classList.add('statsB');
    objStatsA.classList.add('statsC');
    objStatsA.classList.add('statsD');
  }

  function statsA(allSpaceships) {
    var crewOne = [];
    for (var i = 0; i < allSpaceships.length; i++) {
      if (parseInt(allSpaceships[i].crew) === 1) {
        crewOne.push(allSpaceships[i]);
      }
    }
    return crewOne.length;
  }

  function statsB(allSpaceships) {
    var maxCargo = allSpaceships[0];
    for (var i = 1; i < allSpaceships.length; i++) {
      if (parseInt(allSpaceships[i].cargo_capacity) > parseInt(maxCargo.cargo_capacity)) {
        maxCargo = allSpaceships[i];
      }
    }
    return maxCargo.model;
  }

  function statsC(allSpaceships) {
    var sumPassengers = 0;
    for (var i = 0; i < allSpaceships.length; i++) {
      if (allSpaceships[i].passengers) {
        sumPassengers += parseInt(allSpaceships[i].passengers);
      }
    }
    return sumPassengers;
  }

  function statsD(allSpaceships) {
    var longestSpaceship = allSpaceships[0];
    for (var i = 1; i < allSpaceships.length; i++) {
      if (allSpaceships[i].lengthiness) {
        if (parseInt(allSpaceships[0].lengthiness) > parseInt(longestSpaceship.lengthiness)) {
          longestSpaceship = allSpaceships[i];
        }
      }
    }
    return longestSpaceship.image;
  }









  //függvényhívások
  //sortByCostInCreditsAsc(data);
  //console.log(data);
  var dataSorted = temporarilySeparateWhereCostInCreditsIsNullThenSortAndConcat(data);
  console.log(dataSorted);

  var dataSortedFiltered = deleteSpaceshipWhereConsumablesInNull(dataSorted);
  console.log(dataSortedFiltered);
  /*
  console.log(data);
  console.log(dataSorted);
  console.log(dataSortedFiltered);*/

  var dataSortedFilteredUnknown = everyNullValuesToUnknown(dataSortedFiltered);
  /*console.log(dataSortedFilteredUnknown);
  console.log(dataSortedFiltered[0].cost_in_credits);
  console.log(dataSortedFilteredUnknown[0].cost_in_credits);
  console.log(dataSortedFilteredUnknown.length);
  console.log(Object.keys(dataSortedFiltered[0])[0]);
  console.log(dataSortedFiltered[0].id);
  */

  //drawOneSpaceship(dataSortedFiltered[46]);
  console.log(dataSortedFiltered[46]);
  console.log(dataSortedFiltered[46].id);
  console.log(Object.keys(dataSortedFiltered[46]));
  console.log(Object.keys(dataSortedFiltered[46]).length);
  console.log(Object.keys(dataSortedFiltered[46])[0]);

  drawAllSpaceships(dataSortedFilteredUnknown);


  console.log(statsA(dataSortedFilteredUnknown));
  console.log(statsB(dataSortedFilteredUnknown));
  console.log(statsC(dataSortedFilteredUnknown));
  console.log(statsD(dataSortedFilteredUnknown));





}
//successAjax függvény lezárása

getData('/json/spaceships.json', successAjax);