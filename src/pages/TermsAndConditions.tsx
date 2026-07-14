import { Link } from "react-router-dom";

export default function TermsAndConditions() {
    return (
        <div className="w-full max-w-4xl mx-auto px-6 py-10">
            <div className="mb-6 flex items-center gap-2">
                <span
                    className="text-sm"
                    style={{
                        color: "var(--color-primary)",
                    }}
                >
                    {"<- "}
                </span>
                <Link
                    to={"/"}
                    className="text-sm"
                    style={{
                        color: "var(--color-primary)",
                        textDecoration: "underline",
                    }}
                >
                    {"Home Page"}
                </Link>
            </div>
            {/* Header */}
            <div className="mb-10">
                <h1
                    className="text-4xl font-bold mb-3"
                    style={{
                        color: "var(--color-on-surface)",
                        fontFamily: "Manrope, sans-serif",
                    }}
                >
                    Terms of Use
                </h1>
                <p
                    className="text-sm"
                    style={{ color: "var(--color-on-surface-variant)" }}
                >
                    <strong>Effective Date:</strong> To Be Added |{" "}
                    <strong>Last Updated:</strong> To Be Added
                </p>
            </div>

            {/* Content */}
            <div className="space-y-8">
                {/* Intro */}
                <section>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface)" }}
                    >
                        Welcome to Bull Console ("Bull ConsoleBull ConsoleBull
                        Console," "Bull ConsoleweBull Console," "Bull
                        ConsoleourBull Console," or "Bull ConsoleusBull
                        Console"). These Terms of Use ("Bull Console Terms")
                        govern your access to and use of the Bull Console
                        website, dashboard, APIs, and related services
                        (collectively, the "Bull ConsoleServiceBull Console").
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface)" }}
                    >
                        By creating an account, accessing, or using the Service,
                        you acknowledge that you have read, understood, and
                        agree to be bound by these Terms. If you do not agree,
                        you must not access or use the Service.
                    </p>
                </section>

                {/* Section 1 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        1. Eligibility
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        To use Bull Console, you must:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Be at least <strong>16 years of age</strong>.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Have the legal capacity to enter into a binding
                            agreement.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Comply with all applicable laws and regulations in
                            your jurisdiction.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        If you are using the Service on behalf of a company or
                        other legal entity, you represent and warrant that you
                        have the authority to bind that entity to these Terms.
                    </p>
                </section>

                {/* Section 2 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        2. Your Account
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console supports authentication through approved
                        third-party OAuth providers, currently{" "}
                        <strong>Google</strong> and <strong>GitHub</strong>. We
                        never collect or store a password for your Bull Console
                        account.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You are responsible for:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Maintaining the security of your third-party (Google
                            or GitHub) account.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Keeping your account information accurate and up to
                            date.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            All activity performed using your account.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You must notify us promptly at{" "}
                        <a
                            href="mailto:support@vortex.dev"
                            style={{
                                color: "var(--color-primary)",
                                textDecoration: "underline",
                            }}
                        >
                            support@vortex.dev
                        </a>{" "}
                        if you believe your account has been accessed without
                        authorization.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You may update your display name within the Service.
                        Profile images are pulled from your authentication
                        provider and cannot currently be uploaded directly
                        through Bull Console.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4 font-medium"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        <strong>Account sharing is prohibited.</strong> You may
                        not allow another person to access or use your Bull
                        Console account, and you're responsible for safeguarding
                        your credentials with your OAuth provider.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We reserve the right to suspend or terminate accounts
                        that violate these Terms or are used for fraudulent,
                        abusive, or unlawful activity.
                    </p>
                </section>

                {/* Section 3 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        3. Description of the Service
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console is a developer platform for monitoring and
                        managing BullMQ queues by connecting to Redis instances
                        that you provide.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console does <strong>not</strong>:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Host Redis servers.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Host or execute BullMQ workers or background jobs on
                            your behalf.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Act as a backup or disaster recovery service.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Own or operate your application infrastructure.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console connects to the Redis instance(s) you
                        provide to display queue information and, where you
                        request it, perform supported management actions such as
                        retrying or removing BullMQ jobs.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Management actions occur{" "}
                        <strong>
                            only when explicitly initiated by an authenticated
                            user
                        </strong>{" "}
                        — Bull Console never automatically retries, removes, or
                        otherwise modifies your jobs without your instruction.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You remain solely responsible for your Redis
                        infrastructure, BullMQ workers, applications, backups,
                        security, and the operation of your own systems. See
                        Section 9 for more detail.
                    </p>
                </section>

                {/* Section 4 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        4. Connected Infrastructure
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        To use Bull Console's core features, you connect one or
                        more Redis instances.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        By connecting a Redis instance, you represent and
                        warrant that:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            You own the Redis instance, or have the legal
                            authority and authorization to connect it.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The information you provide is accurate.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your use of Bull Console does not violate any
                            agreement you have with a third party.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            You are responsible for maintaining the security of
                            your Redis environment.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Redis connection credentials are used solely to provide
                        the Service and are encrypted at rest using{" "}
                        <strong>AES-256-GCM</strong>, a widely adopted,
                        industry-standard encryption algorithm. Details on how
                        we handle this data are set out in our Privacy Policy.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console cannot independently verify ownership of
                        connected infrastructure and relies on the
                        representations you make above. You accept full
                        responsibility for any infrastructure you connect.
                    </p>
                </section>

                {/* Section 5 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        5. Acceptable Use
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You agree to use Bull Console only for lawful purposes
                        and in accordance with these Terms. You must not:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Use the Service for any unlawful or fraudulent
                            activity.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Attempt to gain unauthorized access to Bull Console,
                            our systems, or another user's account.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Connect infrastructure that you do not own or are
                            not authorized to access.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Interfere with or disrupt the availability,
                            security, or integrity of the Service.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Reverse engineer, decompile, or attempt to discover
                            the source code of the Service, except where
                            permitted by applicable law.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Circumvent security measures, authentication
                            mechanisms, rate limits, or other protective
                            features.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Use automated tools to abuse, overload, or
                            intentionally disrupt the Service.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Introduce malware, viruses, or other malicious code
                            through the Service.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Use the Service in a manner that infringes the
                            rights of others or violates applicable law.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Violations may result in suspension or termination of
                        your account, with or without prior notice, depending on
                        severity.
                    </p>
                </section>

                {/* Section 6 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        6. Subscription Plans and Billing
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console offers both <strong>Free</strong> and{" "}
                        <strong>paid subscription plans</strong>. Features
                        available under each plan are described on our pricing
                        page and may change from time to time. By subscribing to
                        a paid plan, you agree to pay all applicable fees.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        6.1 Payment Processing
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Payments are processed securely by{" "}
                        <strong>Paddle</strong>, our Merchant of Record. By
                        purchasing a subscription, you also agree to Paddle's
                        applicable terms and policies. Bull Console does not
                        store your payment card details.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        6.2 Automatic Renewal
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Paid subscriptions renew automatically at the end of
                        each billing period unless cancelled before the renewal
                        date. By subscribing, you authorize Paddle to charge
                        your selected payment method for each renewal until you
                        cancel.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        6.3 Subscription Cancellation
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You may cancel at any time through your account settings
                        or the billing portal. Cancellation prevents future
                        renewals but does not immediately end your access to
                        paid features — you keep access until:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your current billing period expires; and
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            An additional <strong>24-hour grace period</strong>{" "}
                            has elapsed.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-3"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        After the grace period, your account automatically
                        transitions to the Free plan, if available.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        6.4 Pricing Changes
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We may modify our plans or pricing over time. Where
                        reasonably practicable, we'll provide at least{" "}
                        <strong>30 days' prior notice</strong> before pricing
                        changes take effect for existing subscribers. Continued
                        use of the Service after a pricing change takes effect
                        constitutes acceptance of the new pricing.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        6.5 Taxes
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Unless stated otherwise, subscription fees are exclusive
                        of any taxes, duties, or governmental charges that may
                        apply in your jurisdiction. Where required by law,
                        applicable taxes may be collected by Paddle at checkout.
                    </p>
                </section>

                {/* Section 7 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        7. Refund Policy
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Subscription purchases are generally{" "}
                        <strong>non-refundable</strong>. Refunds will only be
                        considered in exceptional circumstances — for example,
                        where a failure of the Bull Console Service itself
                        prevents you from receiving the subscription benefits
                        you paid for.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Refund requests arising from circumstances outside Bull
                        Console's control — including user error, incompatible
                        infrastructure, third-party outages, accidental
                        purchases, or failure to cancel before renewal — are
                        generally not eligible.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Any approved refund is processed through Paddle. Nothing
                        in this section limits any non-waivable consumer rights
                        that may apply under applicable law.
                    </p>
                </section>

                {/* Section 8 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        8. Account Suspension and Termination
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We may suspend, restrict, or terminate your access to
                        the Service if we reasonably believe you have:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Violated these Terms;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Used the Service for unlawful purposes;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Attempted unauthorized access to our systems or
                            another user's infrastructure;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Engaged in fraudulent or abusive activity;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Initiated fraudulent payment disputes or
                            chargebacks; or
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Used the Service in a manner that threatens its
                            security, stability, or availability.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Where appropriate, we'll try to give notice before
                        taking action, but we reserve the right to suspend
                        access immediately where necessary to protect the
                        Service, our users, or our legal interests.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You may stop using the Service at any time. If you
                        delete your account:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <strong>Free accounts</strong> are permanently
                            deleted immediately.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <strong>Paid accounts</strong> remain available
                            until the end of the active subscription period,
                            plus a <strong>24-hour grace period</strong>, after
                            which the account and all associated data are
                            permanently deleted.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Termination does not relieve you of any payment
                        obligations incurred before termination.
                    </p>
                </section>

                {/* Section 9 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        9. User Responsibilities
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You are solely responsible for:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The security of your OAuth account.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The security of any Redis instances you connect.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The operation of your BullMQ workers and
                            applications.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Maintaining backups of your own infrastructure and
                            data.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Ensuring you have authorization to connect any
                            infrastructure to Bull Console.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Reviewing the impact of any management action before
                            initiating it.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console performs management actions only upon your
                        request. You acknowledge that actions such as retrying,
                        removing, or otherwise managing jobs may affect your
                        applications and infrastructure. Bull Console is not
                        responsible for data loss, application errors, service
                        interruptions, or other consequences resulting from
                        management actions initiated by you or other authorized
                        users of your account.
                    </p>
                </section>

                {/* Section 10 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        10. Intellectual Property
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        All rights, title, and interest in Bull Console —
                        including its software, website, user interface, APIs,
                        documentation, branding, logos, trademarks, and designs
                        — are and remain the exclusive property of Bull Console
                        and its owner, except where otherwise stated.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        These Terms don't grant you ownership of the Service or
                        any related intellectual property. Subject to your
                        compliance with these Terms, we grant you a limited,
                        non-exclusive, non-transferable, and revocable license
                        to access and use the Service for its intended purpose.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You retain full ownership of your own infrastructure,
                        applications, and data. Connecting your Redis instance
                        or using Bull Console does not transfer ownership of
                        your systems or data to us.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Except as permitted by applicable law, you may not:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Copy, reproduce, distribute, or sell any part of the
                            Service.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Modify, adapt, or create derivative works based on
                            the Service.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Reverse engineer, decompile, or attempt to discover
                            the source code of the Service.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Remove or alter any copyright, trademark, or
                            proprietary notices.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Use the Bull Console name, logo, or branding without
                            our prior written permission.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console may include or rely on third-party and
                        open-source software components, which remain subject to
                        their own licenses — nothing in these Terms modifies
                        those licenses.
                    </p>
                </section>

                {/* Section 11 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        11. Service Availability
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We aim to provide a reliable and secure Service, but
                        Bull Console is provided on an <strong>"as is"</strong>{" "}
                        and <strong>"as available"</strong> basis. We don't
                        guarantee that:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The Service will be available at all times.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The Service will be uninterrupted or error-free.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            All defects or bugs will be corrected immediately.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The Service will meet every user's specific
                            requirements.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Information displayed from your connected
                            infrastructure will always be complete, accurate, or
                            fully up to date.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We may perform scheduled or emergency maintenance, apply
                        security updates, or modify the Service at any time.
                        Where reasonably practicable, we'll give advance notice
                        of planned maintenance likely to significantly affect
                        availability.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We reserve the right to modify, suspend, discontinue, or
                        remove any feature of the Service. Where a change
                        materially affects paid users, we'll generally provide
                        at least <strong>30 days' prior notice</strong>, unless
                        immediate action is required for security, legal
                        compliance, or operational reasons.
                    </p>
                </section>

                {/* Section 12 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        12. Disclaimers
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console is an observability and management platform
                        for BullMQ. It is <strong>not</strong> a Redis or BullMQ
                        hosting provider, a job execution platform, a backup or
                        disaster-recovery solution, a business-continuity
                        service, or a substitute for maintaining your own
                        infrastructure.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        As set out in Section 9, you are solely responsible for
                        your Redis servers, BullMQ workers, applications,
                        infrastructure security, data backups, and disaster
                        recovery procedures. Bull Console performs management
                        actions only when explicitly requested by an
                        authenticated user, and we are not responsible for the
                        consequences of actions initiated by you or any
                        authorized user of your account.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        While we take reasonable measures to secure the Service,
                        no internet-based service can guarantee absolute
                        security, and you acknowledge the inherent risks of
                        transmitting and storing information electronically.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Except to the extent prohibited by applicable law, Bull
                        Console disclaims all warranties, whether express,
                        implied, statutory, or otherwise, including implied
                        warranties of merchantability, fitness for a particular
                        purpose, title, non-infringement, and uninterrupted
                        availability.
                    </p>
                </section>

                {/* Section 13 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        13. Limitation of Liability
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        To the fullest extent permitted by applicable law, Bull
                        Console and its owner will not be liable for any
                        indirect, incidental, special, consequential, exemplary,
                        or punitive damages, including loss of profits, revenue,
                        business opportunities, data, or goodwill, business
                        interruption, downtime, or the cost of obtaining
                        substitute services — regardless of the legal theory
                        under which the claim arises (contract, tort,
                        negligence, strict liability, or otherwise).
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console is not responsible for loss or damage
                        resulting from:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Failures of your Redis infrastructure or BullMQ
                            workers.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Third-party service outages.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Internet connectivity issues.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Unauthorized access to your systems.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Actions performed by you or authorized users of your
                            account.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        To the maximum extent permitted by law, Bull Console's
                        total aggregate liability arising out of or relating to
                        the Service will not exceed the total amount you paid to
                        Bull Console during the{" "}
                        <strong>twelve (12) months</strong> immediately
                        preceding the event giving rise to the claim.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Nothing in these Terms excludes or limits liability that
                        cannot be excluded under applicable law.
                    </p>
                </section>

                {/* Section 14 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        14. Indemnification
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        You agree to defend, indemnify, and hold harmless Bull
                        Console and its owner from and against any claims,
                        liabilities, damages, losses, costs, and expenses
                        (including reasonable legal fees) arising out of or
                        relating to:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your use of the Service;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your violation of these Terms;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your violation of any applicable law or regulation;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your infringement of any third-party rights;
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your connection to or use of infrastructure you do
                            not own or are not authorized to access; or
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Any actions performed through your account.
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        This obligation survives termination of your account and
                        these Terms.
                    </p>
                </section>

                {/* Section 15 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        15. Privacy
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Your use of the Service is also governed by our Privacy
                        Policy, which explains how we collect, use, store, and
                        protect your information. By using the Service, you
                        acknowledge that you've read and understood it.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        If there's a conflict between these Terms and the
                        Privacy Policy regarding legal obligations, these Terms
                        prevail to the extent permitted by applicable law.
                    </p>
                </section>

                {/* Section 16 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        16. Changes to These Terms
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We may update these Terms from time to time to reflect
                        changes in the Service, applicable law, or our business
                        practices. When we make material changes, we'll provide
                        reasonable notice through the Service, by email, or by
                        other appropriate means.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Unless otherwise stated, updated Terms become effective
                        on the date specified in the revised version. Continued
                        use of the Service after that date constitutes
                        acceptance of the updated Terms. If you don't agree, you
                        must discontinue using the Service.
                    </p>
                </section>

                {/* Section 17 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        17. Dispute Resolution
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Before initiating any legal proceeding, you and Bull
                        Console agree to first attempt to resolve any dispute
                        through good-faith informal discussion.
                    </p>
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            The party raising the dispute provides written
                            notice describing the issue and desired resolution.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Both parties make reasonable efforts to resolve the
                            dispute within <strong>thirty (30) days</strong> of
                            that notice.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            If unresolved after 30 days, either party may pursue
                            available legal remedies.
                        </li>
                    </ol>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Nothing in this section prevents either party from
                        seeking urgent injunctive or equitable relief where
                        necessary to protect its legal rights.
                    </p>
                </section>

                {/* Section 18 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        18. Governing Law and Jurisdiction
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        These Terms are governed by and construed in accordance
                        with the laws of <strong>Nepal</strong>, without regard
                        to conflict-of-law principles. Subject to the dispute
                        resolution process in Section 17, the courts of Nepal
                        have exclusive jurisdiction over any dispute arising out
                        of or relating to these Terms or the Service.
                    </p>
                </section>

                {/* Section 19 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        19. Severability
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        If any provision of these Terms is found unlawful,
                        invalid, or unenforceable by a court of competent
                        jurisdiction, that provision will be enforced to the
                        maximum extent permitted by law, and the remaining
                        provisions will continue in full force and effect.
                    </p>
                </section>

                {/* Section 20 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        20. No Waiver
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Our failure to enforce any provision of these Terms does
                        not constitute a waiver of that provision or any other
                        right available to us. Any waiver must be in writing and
                        signed by an authorized representative of Bull Console.
                    </p>
                </section>

                {/* Section 21 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        21. Entire Agreement
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        These Terms, together with our Privacy Policy and any
                        additional policies expressly incorporated by reference,
                        constitute the entire agreement between you and Bull
                        Console regarding your use of the Service, and supersede
                        all prior or contemporaneous agreements, communications,
                        and understandings relating to it.
                    </p>
                </section>

                {/* Section 22 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        22. Electronic Communications
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        By using the Service, you consent to receive
                        communications from Bull Console electronically,
                        including notices regarding your account, billing,
                        service updates, and legal documents. You agree that
                        electronic communications satisfy any legal requirement
                        that such communications be in writing.
                    </p>
                </section>

                {/* Section 23 */}
                <section>
                    <h2
                        className="text-2xl font-bold mb-4"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        23. Contact Information
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        If you have questions about these Terms, contact us at:
                    </p>
                    <p
                        className="text-base font-medium mt-3"
                        style={{ color: "var(--color-on-surface)" }}
                    >
                        <strong>Email:</strong>{" "}
                        <a
                            href="mailto:support@vortex.dev"
                            style={{
                                color: "var(--color-primary)",
                                textDecoration: "underline",
                            }}
                        >
                            support@vortex.dev
                        </a>
                    </p>
                </section>
            </div>

            {/* Footer spacing */}
            <div className="mt-16"></div>
        </div>
    );
}
