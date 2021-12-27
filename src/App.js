import React, { useState, useEffect } from "react";
import Grid from "./components/grid/grid";
import Header from "./components/header/header";
import Options from "./components/options/options";

const App = () => {
  const [gridValue, setGridValue] = useState(100);

  useEffect(() => {
    console.log(gridValue);
  }, [gridValue]);
  return (
    <div>
      <Header />
      <Options setGridValue={setGridValue} />
      <Grid gridValue={gridValue} />
    </div>
  );
};

export default App;
