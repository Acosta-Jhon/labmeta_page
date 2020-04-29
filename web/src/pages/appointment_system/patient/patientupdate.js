import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

import Menu from "./components/Menu";

const API = "http://localhost:5000/labmeta/";

class PatientUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: localStorage.getItem("id"),
      pers_nom: localStorage.getItem("pers_nom"),
      pers_tip_ide_id: localStorage.getItem("pers_tip_ide_id"),
      pers_ide: localStorage.getItem("pers_ide"),
      pers_tel: localStorage.getItem("pers_tel"),
      pers_fec_nac: localStorage.getItem("pers_fec_nac"),
      pers_dir: localStorage.getItem("pers_dir"),
      pers_gen_id: localStorage.getItem("pers_gen_id"),
      pers_cor_ele: localStorage.getItem("pers_cor_ele"),
      pers_fot: "",
      persona_genero: [],
      persona_tipo_identificacione: [],
      persona_tipo: [],
      pers_data: [],
    };
  }

  componentDidMount() {
    axios
      .get(API + "persona_genero")
      .then((response) => {
        this.setState({ persona_genero: response.data.datos });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(API + "persona_tipo_identificacione")
      .then((response) => {
        this.setState({ persona_tipo_identificacione: response.data.datos });
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(API + "persona_tipo")
      .then((response) => {
        this.setState({ persona_tipo: response.data.datos });
      })
      .catch((error) => {
        console.log(error);
      });
      axios
      .get(API + `persona?pers_cor_ele=${localStorage.getItem("pers_cor_ele_login")}`)
      .then((response) => {
        this.setState({ pers_data: response.data.datos[0]});
      })
      .catch((error) => {
        console.log(error);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  updateData = (e) => {
    e.preventDefault();
    this.update = {
      datos: {
        id: this.state.id,
        pers_nom: this.state.pers_nom,
        pers_tip_ide_id: this.state.pers_tip_ide_id,
        pers_ide: this.state.pers_ide,
        pers_tel: this.state.pers_tel,
        pers_fec_nac: this.state.pers_fec_nac,
        pers_dir: this.state.pers_dir,
        pers_gen_id: this.state.pers_gen_id,
        pers_cor_ele: this.state.pers_cor_ele,
        pers_fot: this.state.pers_fot,
      },
    };

    if (
      this.update.datos.id === "" ||
      this.update.datos.pers_nom === "" ||
      this.update.datos.pers_tip_ide_id === "" ||
      this.update.datos.pers_ide === "" ||
      this.update.datos.pers_tel === "" ||
      this.update.datos.pers_fec_nac === "" ||
      this.update.datos.pers_dir === "" ||
      this.update.datos.pers_gen_id === "" ||
      this.update.datos.pers_cor_ele === ""
    ) {
      Swal.fire("", "Complete todos los datos para continuar...!");
    } else {
      axios
        .put(`${API}persona?id=${this.state.id}`, this.update)
        .then((response) => {
          if (response.data.ok === true) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Actualizado correctamente",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              //this.props.history.push("/patientupdate");
                window.location.assign("localhost:3000/patientupdate")
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  onFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ pers_fot: reader.result });
    };
    reader.readAsDataURL(file);
  };

  logout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sesión cerrada exitosamente!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          localStorage.clear();
          this.props.history.push("/");
        });
      }
    });
  };

  render() {
    const {
      pers_nom,
      pers_tip_ide_id,
      pers_ide,
      pers_tel,
      pers_fec_nac,
      pers_dir,
      pers_gen_id,
      pers_cor_ele,
      pers_fot,
      persona_genero,
      persona_tipo_identificacione,
    } = this.state;
    const { pers_data } = this.state; 
    const paciente_img = require("../../../assets/appointment_system/patient/paciente.jpg");
    return (
      <div>
        <Menu />
        <div className="bg-green-400 float-right h-screen w-5/6">
          <div className="bg-yellow-400 h- w-full flex justify-end border-b-2 border-green-500">
            <button
              className="lg:text-xl md:text-xl text-sm px-8"
            >
              <p>{pers_data.pers_nom}</p>
            </button>
            <div className="flex px-2 py-2">
              <img
                src={paciente_img}
                alt="logo"
                className="w-14 h-12 rounded-md"
              />
            </div>
            <div className="flex flex-wrap justify-center py-4 lg:justify-center md:justify-start">
              <div className="group relative">
                <button className="lg:text-xl w-full md:text-xl text-sm px-10 hover:text-white">
                  <i className="fas fa-angle-down px-1"></i>
                </button>
                <div className="hidden group-hover:block absolute w-full bg-yellow-400 z-10 border-green-500 border-2">
                  <button
                    className="block text-left py-3 lg:px-3 md:px-3 px-1 hover:bg-green-500 text-sm w-full"
                    onClick={() => this.props.history.push("/patientupdate")}
                  >
                    <p>
                      {" "}
                      <i className="fas fa-user px-1"></i> Mi perfil
              </p>
                  </button>
                  <button
                    className="block text-left py-3 lg:px-3 md:px-3 px-1 hover:bg-green-500 text-sm w-full"
                    onClick={() => this.logout()}
                  >
                    <i className="fas fa-door-closed px-1"></i>
              Cerrar Sesión
            </button>
                </div>
              </div>
            </div>
          </div>
          <p className ="text-xl px-10 pt-10">USUARIO | EDITAR PERFIL</p>
          <div className="flex">
          <div className="flex flex-col ml- p-4">
          <form className="py-4 px-16 w-full flex">
            <div className="">
              <div className="px-1 py-1 flex">
                <label className="uppercase text-xs font-bold py-2 px-2">
                  Apellidos y nombres *
                </label>
                <div className="px-1 flex-1">
                  <input
                    className="w-full border border-gray-500 rounded-lg py-2 px-4"
                    type="text"
                    name="pers_nom"
                    value={pers_nom}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="px-1 py-1 flex justify-between">
                <label className="uppercase text-xs font-bold py-2 px-2">
                  Identificación *
                </label>
                <div className="px-1">
                  <select
                    className="border border-gray-500 rounded-lg py-2 px-4"
                    name="pers_tip_ide_id"
                    value={pers_tip_ide_id}
                    onChange={this.changeHandler}
                  >
                    <option value="">Seleccione...</option>
                    {persona_tipo_identificacione.map((element) => (
                      <option key={element.id} value={element.id}>
                        {element.pers_tip_ide_des}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="px-1 flex-1">
                  <input
                    className="border border-gray-500 rounded-lg py-2 px-4"
                    type="text"
                    name="pers_ide"
                    value={pers_ide}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="px-1 py-1 flex">
                <label className="uppercase text-xs font-bold py-2 px-2">
                  Teléfono / Celular *
                </label>
                <div className="px-1 flex-1">
                  <input
                    className="w-full border border-gray-500 rounded-lg py-2 px-4"
                    type="tel"
                    name="pers_tel"
                    value={pers_tel}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="px-1 py-1 flex">
                <label className="uppercase text-xs font-bold py-2 px-2">
                  Fecha de Nacimiento *
                </label>
                <div className="px-1 flex-1">
                  <input
                    className="w-full border border-gray-500 rounded-lg py-2 px-4"
                    type="date"
                    name="pers_fec_nac"
                    value={pers_fec_nac}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="px-1 py-1 flex">
                <label className="uppercase text-xs font-bold py-2 px-2">
                  Dirección domicilio *
                </label>
                <div className="px-1 flex-1">
                  <input
                    className="w-full border border-gray-500 rounded-lg py-2 px-4"
                    type="text"
                    name="pers_dir"
                    value={pers_dir}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="px-1 py-1 flex">
                <label className="uppercase text-xs font-bold py-2 px-2">
                  Correo electrónico *
                </label>
                <div className="px-1 flex-1">
                  <input
                    className="w-full border border-gray-500 rounded-lg py-2 px-4"
                    type="email"
                    name="pers_cor_ele"
                    value={pers_cor_ele}
                    onChange={this.changeHandler}
                    autoComplete="off"
                  />
                </div>
              </div>
              <div className="px-1 py-1 flex justify-between">
                <div>
                  <label className="uppercase text-xs font-bold py-2 px-1">
                    Género *
                  </label>
                  <select
                    className="border border-gray-500 rounded-lg py-2 px-4"
                    name="pers_gen_id"
                    value={pers_gen_id}
                    onChange={this.changeHandler}
                  >
                    <option value="">Seleccione...</option>
                    {persona_genero.map((element) => (
                      <option key={element.id} value={element.id}>
                        {element.pers_gen_des}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="uppercase text-xs font-bold py-2 px-2">
                    Foto de Perfil *
                  </label>
                  <div className="px-1">
                    <input
                      className="w-full border border-gray-500 rounded-lg py-2 px-4"
                      type="file"
                      name="pers_fot"
                      defaultValue={pers_fot}
                      onChange={this.onFileChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center text-center items-center w-full">
              <div className="border border-black h-56 w-56">
                Profile pic preview
              </div>
            </div>
          </form>
          <div className="text-center">
            <button
              className="bg-yellow-400 text-gray-800 font-bold rounded-lg border-b-2 border-green-500 hover:border-green-600 hover:bg-green-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
              onClick={this.updateData}
            >
              <i className="fas fa-save"></i>
              <span className="mr-2">Guardar</span>
            </button>
          </div>
        </div>
      </div>
      </div>
      </div>
    );
  }
}
export default withRouter(PatientUpdate);