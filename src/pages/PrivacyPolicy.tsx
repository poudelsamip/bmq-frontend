import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
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
                    Privacy Policy
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
                        Welcome to Bull Console ("Bull Console," "we," "our," or
                        "us"). Your privacy matters to us, and this Policy
                        explains what information we collect, how we use it, how
                        we protect it, and the choices you have when using the
                        Bull Console website, dashboard, APIs, and related
                        services (the "Service"). Bull Console is an
                        individual-owned business based in Nepal.
                    </p>
                    <p
                        className="text-base leading-relaxed mt-4 font-medium"
                        style={{ color: "var(--color-on-surface)" }}
                    >
                        We do not sell your personal information, and we do not
                        use it for advertising or marketing profiling.
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
                        1. Information We Collect
                    </h2>
                    <p
                        className="text-base leading-relaxed mb-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We collect only what's necessary to provide and maintain
                        the Service.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        1.1 Information You Provide
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        When you sign in through a supported OAuth provider
                        (Google or GitHub), we collect:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your name
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your email address
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your profile image URL, if provided by your OAuth
                            provider
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Your OAuth provider and provider user ID
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Account creation date and most recent login date
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-3"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We never collect or store a password — authentication is
                        handled entirely by your OAuth provider.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        1.2 Infrastructure Information
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        To connect Bull Console to your infrastructure, you
                        provide connection information for one or more Redis
                        instances, including your Redis connection string. This
                        is stored{" "}
                        <strong>encrypted at rest using AES-256-GCM</strong>, a
                        widely used, industry-standard encryption algorithm, and
                        is used solely to provide the Service's functionality.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        1.3 Information We Do Not Collect
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Unless explicitly stated otherwise, we do not collect or
                        retain:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Job payloads, job results, or queue contents
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Application logs
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Analytics, marketing data, or advertising
                            identifiers
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Device fingerprints or browser information
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            IP addresses for analytics or marketing purposes
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-3"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Information displayed in the Service is retrieved
                        directly from your connected Redis instance in real time
                        and is not permanently stored by Bull Console.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        1.4 Cookies
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We use cookies only to maintain authenticated sessions
                        and keep you securely signed in. We do not use cookies
                        for advertising, marketing, behavioral profiling, or
                        cross-site tracking.
                    </p>

                    <h3
                        className="text-lg font-semibold mb-2 mt-5"
                        style={{
                            color: "var(--color-on-surface)",
                            fontFamily: "Manrope, sans-serif",
                        }}
                    >
                        1.5 Payment Information
                    </h3>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Paid subscriptions are processed by{" "}
                        <strong>Paddle</strong>, our Merchant of Record. Bull
                        Console does not collect or store your payment card or
                        banking details — that information is handled directly
                        by Paddle under its own privacy and security practices.
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
                        2. How We Use Your Information
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We use your information to:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Create, manage, and authenticate your account
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Connect to your Redis instances using the
                            credentials you provide
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Display queue information and perform management
                            actions you explicitly initiate
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Maintain your subscription and access to paid
                            features
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Communicate with you about your account, billing,
                            service updates, security notices, and support
                            requests
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Detect, investigate, and prevent fraud, abuse, or
                            unauthorized access
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Comply with legal obligations and enforce our Terms
                            of Use
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4 font-medium"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We do <strong>not</strong> use your information to sell
                        it, display targeted advertising, build marketing
                        profiles, or share it with third parties for their own
                        marketing purposes.
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
                        3. How We Access Your Redis Data
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        When you provide a Redis connection string, Bull Console
                        connects to your instance to retrieve queue information
                        and, when you request it, perform supported BullMQ
                        management actions.{" "}
                        <strong>
                            These actions occur only when explicitly initiated
                            by an authenticated user.
                        </strong>
                    </p>
                    <p
                        className="text-base leading-relaxed mt-3"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Data retrieved from your Redis instance is processed in
                        real time to fulfill your request and is{" "}
                        <strong>not permanently stored</strong>, except as
                        otherwise described in this Policy. You remain solely
                        responsible for your Redis infrastructure, BullMQ
                        workers, connected applications, and the data within
                        them — Bull Console does not claim any ownership over
                        it.
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
                        4. Third-Party Services
                    </h2>
                    <p
                        className="text-base leading-relaxed mb-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console relies on a small set of trusted providers,
                        each processing only what's necessary to do their job:
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr
                                    style={{
                                        borderBottom:
                                            "1px solid var(--color-outline-variant)",
                                    }}
                                >
                                    <th
                                        className="text-left py-3 px-4 font-semibold"
                                        style={{
                                            color: "var(--color-on-surface)",
                                        }}
                                    >
                                        Service
                                    </th>
                                    <th
                                        className="text-left py-3 px-4 font-semibold"
                                        style={{
                                            color: "var(--color-on-surface)",
                                        }}
                                    >
                                        Purpose
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        service: "Google, GitHub",
                                        purpose: "Authentication",
                                    },
                                    {
                                        service: "Paddle",
                                        purpose:
                                            "Payment processing (Merchant of Record)",
                                    },
                                    {
                                        service: "Vercel, Render",
                                        purpose: "Application hosting",
                                    },
                                    {
                                        service: "Supabase",
                                        purpose: "Database",
                                    },
                                ].map((row, i) => (
                                    <tr
                                        key={i}
                                        style={
                                            i < 3
                                                ? {
                                                      borderBottom:
                                                          "1px solid var(--color-outline-variant)",
                                                  }
                                                : {}
                                        }
                                    >
                                        <td
                                            className="py-3 px-4"
                                            style={{
                                                color: "var(--color-on-surface)",
                                            }}
                                        >
                                            {row.service}
                                        </td>
                                        <td
                                            className="py-3 px-4"
                                            style={{
                                                color: "var(--color-on-surface-variant)",
                                            }}
                                        >
                                            {row.purpose}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Your use of these providers is also subject to their own
                        terms and privacy policies.
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
                        5. Data Security
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We take reasonable technical and organizational measures
                        to protect your information, including:
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Redis connection credentials encrypted at rest using
                            AES-256-GCM
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            All traffic secured over HTTPS
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Authentication handled through trusted OAuth
                            providers
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            Access controls limiting internal access to
                            authorized personnel only
                        </li>
                    </ul>
                    <p
                        className="text-base leading-relaxed mt-4"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        No method of electronic storage or transmission is
                        completely secure, so while we work hard to protect your
                        information, we can't guarantee absolute security.
                        You're responsible for the security of your own OAuth
                        account, Redis instances, and any credentials under your
                        control.
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
                        6. Data Retention
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We retain information only as long as necessary to
                        provide the Service, meet legal obligations, and resolve
                        disputes.
                    </p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <strong>Account information:</strong> kept while
                            your account is active. Free accounts are deleted
                            immediately upon request; paid accounts are deleted
                            at the end of the current billing period plus a
                            24-hour grace period.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <strong>Redis connection credentials:</strong>{" "}
                            retained only while your account is active or until
                            you remove the connected instance, then permanently
                            deleted.
                        </li>
                        <li
                            style={{ color: "var(--color-on-surface-variant)" }}
                        >
                            <strong>Job data:</strong> not permanently stored —
                            see Section 1.3.
                        </li>
                    </ul>
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
                        7. Your Rights and Choices
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Depending on your location, you may have the right to
                        access, correct, delete, or restrict the use of your
                        personal information, or withdraw consent where
                        processing relies on it. You can exercise these rights
                        by contacting{" "}
                        <Link
                            to="mailto:support@bullconsole.dev"
                            style={{
                                color: "var(--color-primary)",
                                textDecoration: "underline",
                            }}
                        >
                            support@bullconsole.dev
                        </Link>
                        ; we may ask for reasonable verification of your
                        identity first.
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
                        8. International Data Transfers
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Bull Console is operated from Nepal, but our third-party
                        providers (Section 4) may process or store information
                        in other countries. By using the Service, you
                        acknowledge your information may be transferred to and
                        processed in jurisdictions with data protection laws
                        different from those of your home country. We take
                        reasonable steps to keep such transfers appropriately
                        protected.
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
                        9. Children's Privacy
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        The Service is not intended for anyone under{" "}
                        <strong>16</strong>. We do not knowingly collect
                        personal information from children under 16, and if we
                        learn we have, we'll take reasonable steps to delete it
                        promptly. Contact{" "}
                        <Link
                            to="mailto:support@bullconsole.dev"
                            style={{
                                color: "var(--color-primary)",
                                textDecoration: "underline",
                            }}
                        >
                            support@bullconsole.dev
                        </Link>{" "}
                        if you believe a child has provided us with personal
                        information.
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
                        10. Changes to This Privacy Policy
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        We may update this Policy to reflect changes in our
                        practices, legal requirements, or the Service itself.
                        Material changes will be announced through the Service,
                        by email, or other reasonable means, and the "Last
                        Updated" date above will reflect the latest revision.
                        Continued use of the Service after changes take effect
                        constitutes acceptance of the updated Policy.
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
                        11. Contact Us
                    </h2>
                    <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                    >
                        Questions, concerns, or requests about this Privacy
                        Policy can be sent to:
                    </p>
                    <p
                        className="text-base font-medium mt-3"
                        style={{ color: "var(--color-on-surface)" }}
                    >
                        <strong>Email:</strong>{" "}
                        <Link
                            to="mailto:support@bullconsole.dev"
                            style={{
                                color: "var(--color-primary)",
                                textDecoration: "underline",
                            }}
                        >
                            support@bullconsole.dev
                        </Link>
                    </p>
                </section>
            </div>

            {/* Footer spacing */}
            <div className="mt-16"></div>
        </div>
    );
}
