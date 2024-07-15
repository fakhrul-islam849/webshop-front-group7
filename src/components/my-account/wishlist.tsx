import Layout from '@components/layout/layout';

import BrandlistGrid from '@components/my-account/wishlist/wishlist-brand';

export default function Wishlist() {
  return (
    <div className="flex flex-col pt-8 2xl:pt-12">
      <BrandlistGrid />
    </div>
  );
}

Wishlist.Layout = Layout;
