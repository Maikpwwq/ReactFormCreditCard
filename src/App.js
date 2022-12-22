import "./App.css";
import TableCards from "./TableCards/TableCards";
import FormCard from "./FormCard/FormCard";
import { Container } from "@mui/material";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Container className="App" maxWidth="md">
      <Provider store={store}>
        {/* <header className="App-header"> </header> */}
        <FormCard />
        <TableCards />
      </Provider>
    </Container>
  );
}

export default App;
