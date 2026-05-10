import CurrentPlan from "../components/billings/CurrentPlan";
import PlansPricing from "../components/billings/PlansPricing";
import RecentTransactions from "../components/billings/RecentTransactions";

export default function BillingPage() {
    return (
        <div
            className="flex flex-col"
            style={{ maxWidth: 1200, margin: "0 auto", gap: 16 }}
        >
            {/* Current Plan */}
            <CurrentPlan />

            {/* Pricing Plans Grid */}
            <PlansPricing />

            {/* Recent Transactions */}
            <RecentTransactions />
        </div>
    );
}
