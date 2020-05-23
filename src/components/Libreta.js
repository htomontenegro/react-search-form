import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import Contacto from "./Contacto";
import InputSearch from "./InputSearch";

class Libreta extends Component {
  constructor(props) {
    super(props);
    this._actualizar = this._actualizar.bind(this);
    this._handleChange = this._handleChange.bind(this);
    this._eliminar = this._eliminar.bind(this);

    this.state = {
      contactos: props.data,
      busqueda: "",
      isLoading: true,
      contacto: {
        nombre: "",
        apellido: "",
        ciudad: "",
        imagen: "",
      },
      error: {
        nombre: "",
        apellido: "",
        ciudad: "",
      },
    };
  }

  _actualizar(e) {
    this.setState({
      busqueda: e.target.value,
    });
  }

  _agregarContacto(e) {
    e.preventDefault();

    let { nombre, apellido, ciudad } = this.state.contacto;

    if (!nombre || !apellido || !ciudad) {
      this.setState({
        error: {
          nombre: !nombre ? "Debe ingresar nombre" : "",
          apellido: !apellido ? "Debe ingresar apellido" : "",
          ciudad: !ciudad ? "Debe ingresar ciudad" : "",
        },
      });

      return false;
    }

    let contacto = {
      nombre,
      apellido,
      ciudad,
      imagen: "https://picsum.photos/300/150",
    };
    this.setState({
      contactos: [...this.state.contactos, contacto],
    });
    this.setState({
      contacto: {
        nombre: "",
        apellido: "",
        ciudad: "",
      },
      error: {
        nombre: "",
        apellido: "",
        ciudad: "",
      },
    });
  }

  _handleChange(event) {
    const { value, name } = event.target;

    this.setState({
      contacto: {
        ...this.state.contacto,
        [name]: value,
      },
      error: {
        ...this.state.error,
        [name]: value ? "" : `Debe ingresar ${name}`,
      },
    });
  }

  _eliminar(indice) {
    console.log("se eliminara " + indice);

    let filtroContactos = this.state.contactos.filter((contacto, i) => {
      return i !== indice;
    });
    this.setState({
      contactos: filtroContactos,
    });
  }
  async getSingleImage() {
    let url = "https://picsum.photos/300/150";
    const response = await fetch(url);

    return await Promise.all(response.url);
  }
  async getImage() {
    let url = "https://picsum.photos/300/150";
    const contactosConImagen = this.state.contactos.map(async (contacto) => {
      const response = await fetch(url);
      return { ...contacto, imagen: response.url };
    });
    return await Promise.all(contactosConImagen);
  }

  async componentDidMount() {
    let contactos = await this.getImage();
    if (contactos) {
      this.setState({
        contactos,
        isLoading: false,
      });
    }
  }
  render() {
    let { nombre, apellido, ciudad } = this.state.contacto;
    let { isLoading } = this.state;
    let filtroContactos = this.state.contactos.filter((contacto) => {
      return contacto.nombre.toLowerCase().indexOf(this.state.busqueda) !== -1;
    });

    // console.log(filtroContactos);
    return (
      <div>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Ingresar nuevo contacto
            </Typography>
            <form
              onSubmit={this._agregarContacto.bind(this)}
              autoComplete="off"
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item lg={4} xs={12} sm={4} md={4}>
                  <TextField
                    style={{ width: "100%" }}
                    // error
                    error={this.state.error.nombre ? true : false}
                    name="nombre"
                    label="Nombre"
                    value={nombre}
                    variant="outlined"
                    helperText={this.state.error.nombre}
                    onChange={this._handleChange}
                  />{" "}
                </Grid>
                <Grid item lg={4} xs={12} sm={4} md={4}>
                  <TextField
                    style={{ width: "100%" }}
                    error={this.state.error.apellido ? true : false}
                    name="apellido"
                    label="Apellido"
                    value={apellido}
                    variant="outlined"
                    helperText={this.state.error.apellido}
                    onChange={this._handleChange}
                  />{" "}
                </Grid>
                <Grid item lg={4} xs={12} sm={4} md={4}>
                  <TextField
                    style={{ width: "100%" }}
                    error={this.state.error.ciudad ? true : false}
                    name="ciudad"
                    label="Ciudad"
                    value={ciudad}
                    variant="outlined"
                    helperText={this.state.error.ciudad}
                    onChange={this._handleChange}
                  />{" "}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth={true}
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon>send</SaveIcon>}
                  >
                    Agregar contacto
                  </Button>{" "}
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} style={{ marginTop: 30, textAlign: "center" }}>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <div>
                <Typography variant="h6">Resultados</Typography>

                <InputSearch
                  busqueda={this.state.busqueda}
                  actualizarBusqueda={this._actualizar}
                />

                <Grid container spacing={4} style={{ paddingTop: 15 }}>
                  {filtroContactos.map((data, i) => (
                    <Grid item xs={12} sm={6} lg={4} xl={3} key={i}>
                      <Contacto
                        data={data}
                        indice={i}
                        eliminar={this._eliminar}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default Libreta;
