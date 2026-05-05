import { useAuth } from "../context/AuthContext";

const Dasboard = () => {
    const { user } = useAuth();

    if (!user) {
        return <div>Not authenticated</div>;
    }

    return <div>Dasboard - {user.email}</div>;
};

export default Dasboard;
