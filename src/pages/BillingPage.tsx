import CurrentPlan from "../components/billings/CurrentPlan";
import PlansPricing from "../components/billings/PlansPricing";
import RecentTransactions from "../components/billings/RecentTransactions";

export default function BillingContent() {
    return (
        <main className="min-h-screen text-[#151c27]">
            <div className="max-w-275 space-y-4">
                {/* Current Plan */}
                <CurrentPlan />

                {/* Pricing */}
                <PlansPricing />

                {/* Transactions */}
                <RecentTransactions />
            </div>
        </main>
    );
}
