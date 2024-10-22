import React from 'react';
import UseBanner from './UserBanner';
import ProductCollection from './ProductCollection';
import UserCategorySection from './UserCategorySection';
import UserTicker from './UserTicker';

export default function Home() {
    return (
        <div>
            <UseBanner />
            <UserTicker />
            <ProductCollection />
            <UserCategorySection />
        </div>
    );
}
