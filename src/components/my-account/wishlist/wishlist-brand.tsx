import WishlistBrandCard from '@components/my-account/wishlist/wishlist-brand-cart';
import type { FC } from 'react';
// import { useWishlistProductsQuery } from '@framework/product/get-wishlist-product';
import ProductCardLoader from '@components/ui/loaders/product-card-loader';
import Alert from '@components/ui/alert';
import cn from 'classnames';
interface ProductWishlistProps {
    element?: any;
    className?: string;
}
const BrandWishlistGrid: FC<ProductWishlistProps> = ({
                               element,
                               className = '',
                           }) => {

    // const { data, isLoading, error } = useWishlistProductsQuery();

    var data: any[] = [];
    const isLoading = false;
    return (
        <div className={cn(className)}>
                <div className="flex flex-col">
                    {isLoading
                        ? data.length === 0 && (
                        'No Data Found'
                    )
                         : data?.map((product: any) => (
                            <WishlistBrandCard
                                key={`product--key${product.id}`}
                                product={product}
                            />
                        ))}
                </div>
        </div>
    );
};
export default BrandWishlistGrid;
