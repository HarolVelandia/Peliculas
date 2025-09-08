import { Database } from "../database/index.js";
import { ObjectId } from "mongodb";

const COLLECTION = "media";

const getAll = async () => {
  const collection = await Database(COLLECTION);
  return await collection.find({}).toArray();
};

const getById = async (id) => {
  const collection = await Database(COLLECTION);
  return await collection.findOne({ _id: new ObjectId(id) });
};

const create = async (media) => {
  const collection = await Database(COLLECTION);

  // Campos automáticos
  media.fecha_creacion = new Date();
  media.fecha_actualizacion = new Date();

  // Validar referencias (género, director, productora, tipo)
  if (media.generoId) media.generoId = new ObjectId(media.generoId);
  if (media.directorId) media.directorId = new ObjectId(media.directorId);
  if (media.productoraId) media.productoraId = new ObjectId(media.productoraId);
  if (media.tipoId) media.tipoId = new ObjectId(media.tipoId);

  let result = await collection.insertOne(media);
  return result.insertedId;
};

const update = async (id, media) => {
  const collection = await Database(COLLECTION);

  media.fecha_actualizacion = new Date();

  if (media.generoId) media.generoId = new ObjectId(media.generoId);
  if (media.directorId) media.directorId = new ObjectId(media.directorId);
  if (media.productoraId) media.productoraId = new ObjectId(media.productoraId);
  if (media.tipoId) media.tipoId = new ObjectId(media.tipoId);

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: media });
  return true;
};

const remove = async (id) => {
  const collection = await Database(COLLECTION);
  await collection.deleteOne({ _id: new ObjectId(id) });
  return true;
};

export const mediaService = {
  getAll,
  getById,
  create,
  update,
  remove,
};
