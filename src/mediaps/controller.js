import { mediaService } from "./services.js";

export default class MediaController {
  static async getMedias(req, res) {
    try {
      let data = await mediaService.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getMedia(req, res) {
    try {
      let data = await mediaService.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async crearMedia(req, res) {
    try {
      let id = await mediaService.create(req.body);
      res.status(201).json({ id });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async actualizarMedia(req, res) {
    try {
      await mediaService.update(req.params.id, req.body);
      res.json({ message: "Media actualizada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async eliminarMedia(req, res) {
    try {
      await mediaService.remove(req.params.id);
      res.json({ message: "Media eliminada" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}
