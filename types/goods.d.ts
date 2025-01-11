declare interface GoodsInfo extends Eps.GoodsInfoEntity {
	specs?: {
		label: string;
		options: {
			label: string;
			price: number;
		}[];
	}[];
	num?: number;
	spec?: {
		[key: string]: string;
	};
}
