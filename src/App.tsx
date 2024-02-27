import './App.css';
// import Greet from './Component/greet';
// import TextEditor from './Component/text-editor';
import { Provider } from "react-redux"
import { store } from './state';
import CellList from './Component/cell-list';

function App() {
  return (
    <Provider store={store}>

      <div className="App">
        {/* <TextEditor /> */}
        <CellList />
        {/* <Greet /> */}
      </div>
    </Provider>
  );
}

export default App;
