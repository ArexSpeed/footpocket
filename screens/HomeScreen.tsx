import AuthContent from "../components/auth/AuthContent";
import Container from "../components/Container";
import UserCard from "../components/UserCard";
import { RootTabScreenProps } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../context/store";

export default function HomeScreen({ navigation }: RootTabScreenProps<"Home">) {
  const user = useSelector((state: RootState) => state.user);
  return (
    <Container>
      {user.userId ? <UserCard /> : <AuthContent isLogin={true} />}
    </Container>
  );
}
