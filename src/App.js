import { Fragment } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { Home, Search, History } from "./screens";
import { GLOBAL_CONST } from "./constants";
import { HistoryProvider } from "./hooks";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HistoryProvider>
        <Router>
          <div className="flex flex-1 w-full flex-col">
            <header className="w-full flex px-20 py-6 bg-white items-baseline border-b border-gray-200">
              <span />
              <h1 className=" font-bold text-2xl text-primary">Hacker News</h1>
              <div className="flex ml-8 gap-2.5 items-center">
                {GLOBAL_CONST.routes.map((item) => (
                  <Fragment key={item.id}>
                    <NavLink
                      style={({ isActive }) => ({
                        fontWeight: isActive && "700",
                      })}
                      to={item.route}
                    >
                      {item.title}
                    </NavLink>
                    <span className=" w-1.5 h-1.5 bg-primary rounded-full last:hidden" />
                  </Fragment>
                ))}
              </div>
            </header>
            <main className="flex flex-1 mx-20 my-8">
              <Routes>
                <Route path="/history" element={<History />} />
                <Route path="/search" element={<Search />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
          </div>
        </Router>
      </HistoryProvider>
    </QueryClientProvider>
  );
}

export default App;
