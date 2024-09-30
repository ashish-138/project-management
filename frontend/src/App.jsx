import Home from "./Home";
import UserContextProvider from './context/UserContextProvider';


function App() {

return (
   <>
   <UserContextProvider>
   <Home/>
   </UserContextProvider>
   </>
  
  );
}

export default App;
