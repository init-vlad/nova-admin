import { apiUrl } from "@env";
import Fetch from "@shared/lib/fetch/fetch";

const api = new Fetch(apiUrl);

export { api };
