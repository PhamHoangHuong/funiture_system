import UserHeader from "../../components/user/UserHeader";
import UserBanner from "../../components/user/UserBanner";
import UserFooter from "../../components/user/UserFooter";
import UserTicker from "../../components/user/UserTicker";
import ProductCollection from "../../pages/user/product/ProductCollection";

interface Props {
    children: React.ReactNode;
}
export default function UserLayout({ children }: Props) {
    return (
        <>
            <UserHeader />
            <UserBanner />
            <UserTicker />
            <ProductCollection />
            {children}
            <UserFooter />
        </>
    );
}
