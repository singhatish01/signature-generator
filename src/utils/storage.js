import { get, set } from "idb-keyval";
const KEY = "signature-generator-data";
export const saveState = async (state) => { try { await set(KEY, state); } catch (e) { console.error(e); } };
export const loadState = async () => { try { const s = await get(KEY); return s || null; } catch (e) { console.error(e); return null; } };
