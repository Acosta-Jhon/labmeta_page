const Persona = require("../models/personas");

const loginPatients = (req, res) => {
  const pers_cor_ele = req.body.pers_cor_ele;
  const pers_cla = req.body.pers_cla;

  Persona.findAll().then((resultado) => {
    resultado.forEach((element) => {
      if (
        element.pers_cor_ele === pers_cor_ele &&
        element.pers_cla == pers_cla &&
        element.pers_tip_id == 2
      ) {
        res.status(200).json({
          ok: true,
          mensaje: "found",
        });
      }
    });
    return res.status(500).json({
      ok: false,
      mensaje: "no-found",
    });
  });
};

const loginAdmins = (req, res) => {
  const pers_cor_ele = req.body.pers_cor_ele;
  const pers_cla = req.body.pers_cla;

  Persona.findAll().then((resultado) => {
    resultado.forEach((element) => {
      if (
        element.pers_cor_ele === pers_cor_ele &&
        element.pers_cla == pers_cla &&
        element.pers_tip_id == 1
      ) {
        res.status(200).json({
          ok: true,
          mensaje: "found",
        });
      }
    });
    return res.status(500).json({
      ok: false,
      mensaje: "no-found",
    });
  });
};

module.exports = {
  loginPatients,
  loginAdmins,
};
