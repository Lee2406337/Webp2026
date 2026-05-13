import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./App.css";

const API_URL =
  "https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6";

function App() {
  const [rows, setRows] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        const newRows = data.map((item, index) => ({
          id: index + 1,
          title: item.title || "無資料",
          locationName:
            item.showInfo &&
            item.showInfo.length > 0 &&
            item.showInfo[0].locationName
              ? item.showInfo[0].locationName
              : "無資料",
          startDate: item.startDate || "無資料",
          endDate: item.endDate || "無資料",
        }));

        setRows(newRows);
      })
      .catch((error) => {
        console.log("API 載入失敗：", error);
      });
  }, []);

  const columns = [
    {
      field: "id",
      headerName: "編號",
      width: 90,
    },
    {
      field: "title",
      headerName: "名稱",
      flex: 1,
      minWidth: 280,
    },
    {
      field: "locationName",
      headerName: "地點",
      flex: 1,
      minWidth: 220,
    },
    {
      field: "startDate",
      headerName: "開始日期",
      width: 140,
    },
    {
      field: "endDate",
      headerName: "結束日期",
      width: 140,
    },
  ];

  const filteredRows = rows.filter((row) =>
    row.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <div className="page">
      <h1>景點觀光展覽資訊</h1>

      <div className="toolbar">
        <label>名稱搜尋：</label>
        <input
          type="text"
          placeholder="請輸入關鍵字"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
      </div>

      <div className="info">
        共 {filteredRows.length} 筆資料
      </div>

      <div className="gridBox">
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
                page: 0,
              },
            },
          }}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
}

export default App;