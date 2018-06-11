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
  //önmagában a null értékek miatt nem tökéletesen ment, ezért van szükség a következő fv-re
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


  function tempDelWhereCostInCreditsIsNull(dataArray) {
    var nullArray = [];
    var notNullArray = [];
    for (var i = 0; i < dataArray.length; i++) {
      if (!data[i].cost_in_credits) {
        nullArray.push(data[i]);
      } else {
        notNullArray.push(data[i]);
      }
    }
    console.log(nullArray.length);
    console.log(notNullArray.length);

    var sortedNotNullArray = sortByCostInCreditsAsc(notNullArray);
    console.log(notNullArray);

    dataArray = nullArray.concat(sortedNotNullArray);
    console.log(dataArray);
  }




  function deleteSpaceshipWhereConsumablesInNull(dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
      if (!dataArray[i].consumables) {
        dataArray.splice(i, 1);
      }
    }
  }


  //függvényhívások
  //sortByCostInCreditsAsc(data);
  console.log(data);
  console.log(data);
  tempDelWhereCostInCreditsIsNull(data);

  //deleteSpaceshipWhereConsumablesInNull(data);






}
//successAjax függvény lezárása

getData('/json/spaceships.json', successAjax);