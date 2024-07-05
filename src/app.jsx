const { Router } = require("express")

const App = () => {
    return (
        <Router>
            <switch>
                <Route path="/pay">
                <Pay/>
                </Route>
                <Route path="/success">
                <Succes />
                </Route>
            </switch>
        </Router>
    );
};

export default App;