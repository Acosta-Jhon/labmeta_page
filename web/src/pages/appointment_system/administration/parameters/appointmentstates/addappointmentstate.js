import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

const API = "http://localhost:5000/labmeta/";

class Addappointmentstate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cita_est_des: "",
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  saveData = (e) => {
    e.preventDefault();
    this.post = {
      datos: {
        cita_est_des: this.state.cita_est_des,
      },
    };
    if (this.post.datos.cita_est_des === "") {
      Swal.fire("", "Complete todos los datos para continuar...!");
    } else {
      axios
        .post(API + "cita_estado", this.post)
        .then((response) => {
          if (response.data.ok === true) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Agregado exitosamente",
              showConfirmButton: false,
              timer: 1000,
            }).then(() =>
              this.props.history.push("/admin/parameters/appointmentstates")
            );
          }
        })
        .catch((error) => {
          alert("Datos Incorrectos");
        });
    }
  };

  render() {
    const { cita_est_des } = this.state;
    return (
      <div>
        <Sidebar />
        <Header />
        <div className="flex flex-col ml-48 p-4">
          <form className="py-16 px-64 flex items-center">
            <h1 className="uppercase text-xs font-bold py-2 px-2">Estado *</h1>
            <div className="px-1 flex-1">
              <input
                className="border border-gray-500 rounded py-2 px-4"
                type="text"
                name="cita_est_des"
                value={cita_est_des}
                onChange={this.changeHandler}
                autoComplete="off"
              />
            </div>
            <button
              className="bg-gray-300 text-gray-800 font-bold rounded border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              onClick={this.saveData}
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

export default withRouter(Addappointmentstate);
