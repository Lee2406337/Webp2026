var openUrl =
  "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

var loadBtn = document.getElementById("loadBtn");

loadBtn.addEventListener("click", loadData);

function loadData() {
  var xhr = new XMLHttpRequest();

  xhr.open("GET", openUrl, true);

  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var dataset = JSON.parse(this.responseText);
      var text = "";

      for (var i = 0; i < dataset.length; i++) {
        var name = dataset[i]["title"];
        var startDate = dataset[i]["startDate"];
        var endDate = dataset[i]["endDate"];

        var locationName = "";
        if (
          dataset[i]["showInfo"] &&
          dataset[i]["showInfo"].length > 0 &&
          dataset[i]["showInfo"][0]["locationName"]
        ) {
          locationName = dataset[i]["showInfo"][0]["locationName"];
        } else {
          locationName = "無資料";
        }

        text += "<tr>";
        text += "<td>" + name + "</td>";
        text += "<td>" + locationName + "</td>";
        text += "<td>" + startDate + "</td>";
        text += "<td>" + endDate + "</td>";
        text += "</tr>";
      }

      document.getElementById("demo").innerHTML = text;
    }
  };

  xhr.send();
}