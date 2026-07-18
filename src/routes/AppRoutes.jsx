import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/Home";
import About from "../pages/About";
import WhatsNew from "../pages/WhatsNew";
import Insights from "../pages/Insights";
import Roadmap from "../pages/Roadmap";
import PlansPricing from "../pages/PlansPricing";
import BrokerIntegrations from "../pages/BrokerIntegrations";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import TermsConditions from "../pages/TermsConditions";
import RefundPolicy from "../pages/RefundPolicy";
import Disclaimer from "../pages/Disclaimer";
import Documentation from "../pages/Documentation";
import Changelog from "../pages/Changelog";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";

import Dashboard from "../pages/Dashboard";
import BrokerConnect from "../pages/BrokerConnect";
import StrategyBuilder from "../pages/StrategyBuilder";
import Backtest from "../pages/Backtest";
import PaperTrading from "../pages/PaperTrading";
import LiveAlgo from "../pages/LiveAlgo";
import Orders from "../pages/Orders";
import RiskSettings from "../pages/RiskSettings";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";

import { ROUTES } from "../constants/routes";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.ABOUT} element={<About />} />
      <Route path={ROUTES.WHATS_NEW} element={<WhatsNew />} />
      <Route path={ROUTES.INSIGHTS} element={<Insights />} />
      <Route path={ROUTES.ROADMAP} element={<Roadmap />} />
      <Route path={ROUTES.PLANS_PRICING} element={<PlansPricing />} />
      <Route path={ROUTES.BROKER_INTEGRATIONS} element={<BrokerIntegrations />} />
      <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicy />} />
      <Route path={ROUTES.TERMS_CONDITIONS} element={<TermsConditions />} />
      <Route path={ROUTES.REFUND_POLICY} element={<RefundPolicy />} />
      <Route path={ROUTES.DISCLAIMER} element={<Disclaimer />} />
      <Route path={ROUTES.DOCUMENTATION} element={<Documentation />} />
      <Route path={ROUTES.CHANGELOG} element={<Changelog />} />

      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.BROKER_CONNECT} element={<BrokerConnect />} />
          <Route path={ROUTES.STRATEGY_BUILDER} element={<StrategyBuilder />} />
          <Route path={ROUTES.BACKTEST} element={<Backtest />} />
          <Route path={ROUTES.PAPER_TRADING} element={<PaperTrading />} />
          <Route path={ROUTES.LIVE_ALGO} element={<LiveAlgo />} />
          <Route path={ROUTES.ORDERS} element={<Orders />} />
          <Route path={ROUTES.RISK_SETTINGS} element={<RiskSettings />} />
          <Route path={ROUTES.REPORTS} element={<Reports />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
