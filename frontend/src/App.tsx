import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Chat from "./components/Chat/Chat";

const App = () => {
    return (
        <div className="h-screen w-screen">
            <Chat sessionId={uuidv4()} />
        </div>
    );
};

export default App;
