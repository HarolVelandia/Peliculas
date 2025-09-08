import express from "express";
import MediaController from "./controller.js";

const router = express.Router();

export const MediaAPI = (app) => {
  router
    .get("/", MediaController.getMedias)
    .get("/:id", MediaController.getMedia)
    .post("/", MediaController.crearMedia)
    .put("/:id", MediaController.actualizarMedia)
    .delete("/:id", MediaController.eliminarMedia);

  app.use("/api/media", router);
};
