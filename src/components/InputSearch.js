import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";

class InputSearch extends Component {
  constructor(props) {
    super(props);
    this._actualizarBusqueda = this._actualizarBusqueda.bind(this);
  }

  _actualizarBusqueda(e) {
    this.props.actualizarBusqueda(e);
  }
  render() {
    return (

        <TextField
            // error
            name="busqueda"
            label="Busquedar por nombre"
            value={this.props.busqueda}
            onChange={this._actualizarBusqueda}
          />

    );
  }
}
export default InputSearch;
