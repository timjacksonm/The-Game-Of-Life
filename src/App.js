import React, { useState, useEffect } from "react";
import Grid from "./components/grid/grid";
import Header from "./components/header/header";
import Options from "./components/options/options";

const App = () => {
  const [gridValue, setGridValue] = useState(4);
  const [start, setStart] = useState(false);

  return (
    <div>
      <Header />
      <Options
        start={start}
        setStart={setStart}
        gridValue={gridValue}
        setGridValue={setGridValue}
      />
      <Grid status={start} rows={gridValue} columns={gridValue} />
    </div>
  );
};

export default App;
