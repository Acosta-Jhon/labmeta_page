import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const API = "http://localhost:5000/labmeta/";

class UpdateService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      serv_nom: localStorage.getItem("serv_nom"),
      serv_des: localStorage.getItem("serv_des"),
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateData = (e) => {
    e.preventDefault();
    this.update = {
      datos: {
        id: this.state.id,
        serv_nom: this.state.serv_nom,
        serv_des: this.state.serv_des,
      },
    };

    if (
      this.update.datos.id === "" ||
      this.update.datos.serv_nom === "" ||
      this.update.datos.serv_des === ""
    ) {
      Swal.fire("", "Complete todos los datos para continuar...!");
    } else {
      axios
        .put(`${API}servicio?id=${this.state.id}`, this.update)
        .then((response) => {
          if (response.data.ok === true) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Actualizado correctamente",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              this.props.history.push("/admin/parameters/services");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    const { serv_nom, serv_des } = this.state;
    return (
      <div>
        <Sidebar />
        <Header />
        <div className="flex flex-col ml-48 p-4">
          <form className="py-16 px-64 flex items-center justify-between">
            <div className="flex flex-col">
              <div>
                <h1 className="uppercase text-xs font-bold py-2 px-2">
                  Nombre del servicio *
                </h1>
                <div className="px-1 flex-1">
                  <input
                    className="border border-gray-500 rounded py-2 px-4"
                    type="text"
                    name="serv_nom"
                    value={serv_nom}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div>
                <h1 className="uppercase text-xs font-bold py-2 px-2">
                  Descripción *
                </h1>
                <div className="px-1 flex-1">
                  <textarea
                    className="border border-gray-500 rounded py-2 px-4"
                    type="area"
                    name="serv_des"
                    value={serv_des}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
            </div>
            <button
              className="bg-gray-300 text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              onClick={this.updateData}
            >
              <i className="fas fa-save"></i>
              <span className="ml-2">Guardar</span>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(UpdateService);
