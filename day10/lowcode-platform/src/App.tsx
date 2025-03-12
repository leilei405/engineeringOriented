import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import IndicatorList from "./pages/indicators/IndicatorList";
import IndicatorCreate from "./pages/indicators/IndicatorCreate";
import TableList from "./pages/tables/TableList";
import TableCreate from "./pages/tables/TableCreate";
import ChartList from "./pages/charts/ChartList";
import ChartCreate from "./pages/charts/ChartCreate";
import DashboardList from "./pages/dashboard/DashboardList";
import DashboardCreate from "./pages/dashboard/DashboardCreate";
import TeamList from "./pages/teams/TeamList";
import TeamCreate from "./pages/teams/TeamCreate";
import MatrixList from "./pages/matrix/MatrixList";
import MatrixCreate from "./pages/matrix/MatrixCreate";
import TemplateList from "./pages/templates/TemplateList";
import TemplateCreate from "./pages/templates/TemplateCreate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="indicators">
          <Route index element={<IndicatorList />} />
          <Route path="new" element={<IndicatorCreate />} />
        </Route>
        <Route path="tables">
          <Route index element={<TableList />} />
          <Route path="new" element={<TableCreate />} />
        </Route>
        <Route path="charts">
          <Route index element={<ChartList />} />
          <Route path="new" element={<ChartCreate />} />
        </Route>
        <Route path="dashboards">
          <Route index element={<DashboardList />} />
          <Route path="new" element={<DashboardCreate />} />
        </Route>
        <Route path="teams">
          <Route index element={<TeamList />} />
          <Route path="new" element={<TeamCreate />} />
        </Route>
        <Route path="matrix">
          <Route index element={<MatrixList />} />
          <Route path="new" element={<MatrixCreate />} />
        </Route>
        <Route path="templates">
          <Route index element={<TemplateList />} />
          <Route path="new" element={<TemplateCreate />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
