const path = require("path");
const { v4: uuidv4 } = require("uuid");

const subirArchivo = (
  files,
  carpeta = "",
  extensionesValidas = ["png", "jpg", "jpeg"]
  
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;
    const nombreCortado = file.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    // Validar extension

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extensión: ${extension}, no es una extensión permitida, pruebe con ${extensionesValidas}`
      );
    }

    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);

    file.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }

      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
