import Navbar from "../../components/Navbar";
import { ContextProvider } from "../../context/AppContext";

const layout = ({ children }) => {
  return (
    <ContextProvider>
      <div className="h-full w-full flex flex-col">
        <Navbar />
        {children}
      </div>
    </ContextProvider>
  );
};

export default layout;
