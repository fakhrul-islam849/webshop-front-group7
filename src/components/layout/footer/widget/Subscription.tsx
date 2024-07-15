import Image from '@components/ui/image';
import WidgetSubscription from './widget-subscription';

function Subscription() {
    return(
            <div className="flex flex-row bg-cyan-600">
                <div className="basis-3/4">
                    <WidgetSubscription />
                </div>
                <div className="basis-1/4">
                    <Image
                        src="/assets/images/hp-nl-envelop.png"
                        alt="Subscribe"
                        width={250}
                        height={150}
                        className="lg:float-right"
                    />
                </div>
            </div>
        )
}

export default Subscription;