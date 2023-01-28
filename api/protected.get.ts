import { ProtectedController } from "../app/modules/protected/protected.controller";

export default defineEventHandler(async (event) => {
  const protectedController = new ProtectedController();

  return await protectedController.execute(event);
});
