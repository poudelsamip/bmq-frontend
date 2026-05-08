export default function DrawerSection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section>
            <h3 className="text-xs uppercase text-gray-500 font-semibold mb-3 tracking-wide">
                {title}
            </h3>
            {children}
        </section>
    );
}
