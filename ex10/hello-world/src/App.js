import './App.css';

const styleArgument = {
  color: 'blue',
  fontSize: '60px',
  textAlign: 'center',
  marginTop: '100px',
  cursor: 'pointer'
};

const changeText = (event) => {
  event.target.innerText = event.target.innerText + '被點了';
};

function App() {
  return (
    <div className="App">
      <h1 style={styleArgument} onClick={changeText}>
        hello CGU!!
      </h1>
    </div>
  );
}

export default App;