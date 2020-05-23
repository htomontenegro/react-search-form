import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const Navegacion = () => {
  return (
    <AppBar position="static" color="primary" style={{ marginBottom: 40 }}>
      <Toolbar>
        <Typography variant="h6">Search system / Búsqueda en listado con filter en el estado</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navegacion;
