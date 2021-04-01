import Env from "@ioc:Adonis/Core/Env";

export default {
  apiKey: Env.get("ESMS_API_KEY", ""),
  secretKey: Env.get("ESMS_SECRET_KEY", ""),
};
