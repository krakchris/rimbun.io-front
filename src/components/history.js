import { createMemoryHistory, createBrowserHistory } from "history";

const history = true ? createBrowserHistory() : createMemoryHistory;

export default history;
