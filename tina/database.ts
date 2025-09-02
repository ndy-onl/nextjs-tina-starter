import { createLocalDatabase } from "@tinacms/datalayer";

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

export default createLocalDatabase();
