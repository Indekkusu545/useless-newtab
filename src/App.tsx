import { useState, KeyboardEvent } from 'react';
import './App.css';

function App() {
  const [datetime, setDatetime] = useState(new Date());

  setInterval(() => {
    setDatetime(new Date());
  }, 1000);

  const days = ['天', '一', '二', '三', '四', '五', '六'];

  const searchBarPlaceHolder = '输入搜索内容';

  let tiles = [
    new TileInfo('设置', 'chrome://settings/'),
    new TileInfo('Bilibili', 'https://www.bilibili.com/'),
  ];

  let tilesHTML = tiles.map((tile) => {
    return (
      <div className="tile">
        <a href={tile.url}>
          <div className="logo">{tile.label}</div>
          <div className="label">{tile.label}</div>
        </a>
      </div>
    );
  });

  const searchBarKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      window.location.href =
        'https://www.google.com/search?q=' +
        event.target.value.replaceAll(' ', '+');
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div id="Time">{`${pad(datetime.getHours())}:${pad(
          datetime.getMinutes()
        )}:${pad(datetime.getSeconds())}`}</div>
        <div id="Date">{`${pad(datetime.getMonth() + 1)}月${pad(
          datetime.getDate()
        )}日 星期${days[datetime.getDay()]}`}</div>
        <label>
          <input
            type="text"
            id="SearchBar"
            placeholder={searchBarPlaceHolder}
            onKeyDown={searchBarKeyDownHandler}
          />
        </label>
        <div className="tiles">{tilesHTML}</div>
      </div>
    </div>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, '0');
}

class TileInfo {
  label: string;
  url: string;
  logo: string | null;

  constructor(label: string, url: string, logo: string | null = null) {
    this.label = label;
    this.url = url;
    this.logo = logo;
  }
}

export default App;
