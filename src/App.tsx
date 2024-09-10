import { AppBar, Toolbar } from "@mui/material";
import "./App.css";
import ContactList from "./features/contactList/ContactList";

const App: React.FC = () => {
  return (
    <>
      <ContactList />
      <AppBar
        position="fixed"
        color="primary"
        style={{ top: "auto", bottom: 0 }}
      >
        <Toolbar></Toolbar>
      </AppBar>
    </>
  );
};

export default App;
