declare namespace Eps {
	interface AppComplainEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AppFeedbackEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AppGoodsEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface AppVersionEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface CsMsgEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface GoodsCommentEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface GoodsInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface GoodsSearchKeywordEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface GoodsSpecEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface GoodsTypeEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface InfoBannerEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MarketCouponInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface MarketCouponUserEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface OrderInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface ShopInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserAddressEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserInfoEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface UserVipEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}

	interface TestEntity {
		/**
		 * 任意键值
		 */
		[key: string]: any;
	}
	interface AppComplain {
		/**
		 * submit
		 */
		submit(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: AppComplainEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<AppComplainEntity>;
		/**
		 * 权限标识
		 */
		permission: { submit: string; page: string; info: string };
		/**
		 * 权限状态
		 */
		_permission: { submit: boolean; page: boolean; info: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AppFeedback {
		/**
		 * submit
		 */
		submit(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: AppFeedbackEntity[];
			[key: string]: any;
		}>;
		/**
		 * info
		 */
		info(data?: any): Promise<AppFeedbackEntity>;
		/**
		 * 权限标识
		 */
		permission: { submit: string; page: string; info: string };
		/**
		 * 权限状态
		 */
		_permission: { submit: boolean; page: boolean; info: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AppGoods {
		/**
		 * list
		 */
		list(data?: any): Promise<AppGoodsEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface AppVersion {
		/**
		 * check
		 */
		check(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { check: string };
		/**
		 * 权限状态
		 */
		_permission: { check: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface BaseComm {
		/**
		 * uploadMode
		 */
		uploadMode(data?: any): Promise<any>;
		/**
		 * upload
		 */
		upload(data?: any): Promise<any>;
		/**
		 * param
		 */
		param(data?: any): Promise<any>;
		/**
		 * eps
		 */
		eps(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { uploadMode: string; upload: string; param: string; eps: string };
		/**
		 * 权限状态
		 */
		_permission: { uploadMode: boolean; upload: boolean; param: boolean; eps: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CsMsg {
		/**
		 * unreadCount
		 */
		unreadCount(data?: any): Promise<any>;
		/**
		 * read
		 */
		read(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: CsMsgEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: { unreadCount: string; read: string; page: string };
		/**
		 * 权限状态
		 */
		_permission: { unreadCount: boolean; read: boolean; page: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface CsSession {
		/**
		 * detail
		 */
		detail(data?: any): Promise<any>;
		/**
		 * create
		 */
		create(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { detail: string; create: string };
		/**
		 * 权限状态
		 */
		_permission: { detail: boolean; create: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface DictInfo {
		/**
		 * data
		 */
		data(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { data: string };
		/**
		 * 权限状态
		 */
		_permission: { data: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface GoodsComment {
		/**
		 * submit
		 */
		submit(data?: any): Promise<any>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: GoodsCommentEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: { submit: string; page: string };
		/**
		 * 权限状态
		 */
		_permission: { submit: boolean; page: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface GoodsInfo {
		/**
		 * list
		 */
		list(data?: any): Promise<GoodsInfoEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<GoodsInfoEntity>;
		/**
		 * 权限标识
		 */
		permission: { list: string; info: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean; info: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface GoodsSearchKeyword {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<GoodsSearchKeywordEntity>;
		/**
		 * list
		 */
		list(data?: any): Promise<GoodsSearchKeywordEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: GoodsSearchKeywordEntity[];
			[key: string]: any;
		}>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface GoodsSpec {
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<GoodsSpecEntity>;
		/**
		 * list
		 */
		list(data?: any): Promise<GoodsSpecEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: GoodsSpecEntity[];
			[key: string]: any;
		}>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface GoodsType {
		/**
		 * list
		 */
		list(data?: any): Promise<GoodsTypeEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface InfoBanner {
		/**
		 * list
		 */
		list(data?: any): Promise<InfoBannerEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface MarketCouponInfo {
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: MarketCouponInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: { page: string };
		/**
		 * 权限状态
		 */
		_permission: { page: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface MarketCouponUser {
		/**
		 * receive
		 */
		receive(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<MarketCouponUserEntity>;
		/**
		 * list
		 */
		list(data?: any): Promise<MarketCouponUserEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: MarketCouponUserEntity[];
			[key: string]: any;
		}>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * my
		 */
		my(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			receive: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
			my: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			receive: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
			my: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface OrderInfo {
		/**
		 * logistics
		 */
		logistics(data?: any): Promise<any>;
		/**
		 * userCount
		 */
		userCount(data?: any): Promise<any>;
		/**
		 * confirm
		 */
		confirm(data?: any): Promise<any>;
		/**
		 * create
		 */
		create(data?: any): Promise<any>;
		/**
		 * cancel
		 */
		cancel(data?: any): Promise<any>;
		/**
		 * refund
		 */
		refund(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<OrderInfoEntity>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: OrderInfoEntity[];
			[key: string]: any;
		}>;
		/**
		 * 权限标识
		 */
		permission: {
			logistics: string;
			userCount: string;
			confirm: string;
			create: string;
			cancel: string;
			refund: string;
			update: string;
			info: string;
			page: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			logistics: boolean;
			userCount: boolean;
			confirm: boolean;
			create: boolean;
			cancel: boolean;
			refund: boolean;
			update: boolean;
			info: boolean;
			page: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface OrderPay {
		/**
		 * wxMiniPay
		 */
		wxMiniPay(data?: any): Promise<any>;
		/**
		 * wxNotify
		 */
		wxNotify(data?: any): Promise<any>;
		/**
		 * wxAppPay
		 */
		wxAppPay(data?: any): Promise<any>;
		/**
		 * wxMpPay
		 */
		wxMpPay(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { wxMiniPay: string; wxNotify: string; wxAppPay: string; wxMpPay: string };
		/**
		 * 权限状态
		 */
		_permission: { wxMiniPay: boolean; wxNotify: boolean; wxAppPay: boolean; wxMpPay: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface ShopInfo {
		/**
		 * list
		 */
		list(data?: any): Promise<ShopInfoEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserAddress {
		/**
		 * default
		 */
		default(data?: any): Promise<any>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * info
		 */
		info(data?: any): Promise<UserAddressEntity>;
		/**
		 * list
		 */
		list(data?: any): Promise<UserAddressEntity[]>;
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: UserAddressEntity[];
			[key: string]: any;
		}>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			default: string;
			delete: string;
			update: string;
			info: string;
			list: string;
			page: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			default: boolean;
			delete: boolean;
			update: boolean;
			info: boolean;
			list: boolean;
			page: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserComm {
		/**
		 * wxMpConfig
		 */
		wxMpConfig(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: { wxMpConfig: string };
		/**
		 * 权限状态
		 */
		_permission: { wxMpConfig: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserInfo {
		/**
		 * updatePassword
		 */
		updatePassword(data?: any): Promise<any>;
		/**
		 * updatePerson
		 */
		updatePerson(data?: any): Promise<any>;
		/**
		 * getMiniPhone
		 */
		getMiniPhone(data?: any): Promise<any>;
		/**
		 * bindPhone
		 */
		bindPhone(data?: any): Promise<any>;
		/**
		 * miniPhone
		 */
		miniPhone(data?: any): Promise<any>;
		/**
		 * person
		 */
		person(data?: any): Promise<any>;
		/**
		 * logoff
		 */
		logoff(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			updatePassword: string;
			updatePerson: string;
			getMiniPhone: string;
			bindPhone: string;
			miniPhone: string;
			person: string;
			logoff: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			updatePassword: boolean;
			updatePerson: boolean;
			getMiniPhone: boolean;
			bindPhone: boolean;
			miniPhone: boolean;
			person: boolean;
			logoff: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserLogin {
		/**
		 * refreshToken
		 */
		refreshToken(data?: any): Promise<any>;
		/**
		 * password
		 */
		password(data?: any): Promise<any>;
		/**
		 * captcha
		 */
		captcha(data?: any): Promise<any>;
		/**
		 * smsCode
		 */
		smsCode(data?: any): Promise<any>;
		/**
		 * wxApp
		 */
		wxApp(data?: any): Promise<any>;
		/**
		 * phone
		 */
		phone(data?: any): Promise<any>;
		/**
		 * mini
		 */
		mini(data?: any): Promise<any>;
		/**
		 * mp
		 */
		mp(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			refreshToken: string;
			password: string;
			captcha: string;
			smsCode: string;
			wxApp: string;
			phone: string;
			mini: string;
			mp: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			refreshToken: boolean;
			password: boolean;
			captcha: boolean;
			smsCode: boolean;
			wxApp: boolean;
			phone: boolean;
			mini: boolean;
			mp: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface UserVip {
		/**
		 * list
		 */
		list(data?: any): Promise<UserVipEntity[]>;
		/**
		 * 权限标识
		 */
		permission: { list: string };
		/**
		 * 权限状态
		 */
		_permission: { list: boolean };
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	interface Test {
		/**
		 * page
		 */
		page(data?: any): Promise<{
			pagination: { size: number; page: number; total: number; [key: string]: any };
			list: TestEntity[];
			[key: string]: any;
		}>;
		/**
		 * list
		 */
		list(data?: any): Promise<TestEntity[]>;
		/**
		 * info
		 */
		info(data?: any): Promise<TestEntity>;
		/**
		 * delete
		 */
		delete(data?: any): Promise<any>;
		/**
		 * update
		 */
		update(data?: any): Promise<any>;
		/**
		 * add
		 */
		add(data?: any): Promise<any>;
		/**
		 * 权限标识
		 */
		permission: {
			page: string;
			list: string;
			info: string;
			delete: string;
			update: string;
			add: string;
		};
		/**
		 * 权限状态
		 */
		_permission: {
			page: boolean;
			list: boolean;
			info: boolean;
			delete: boolean;
			update: boolean;
			add: boolean;
		};
		/**
		 * 请求
		 */
		request: Service["request"];
	}

	type json = any;

	type Service = {
		request(options?: {
			url: string;
			method?: "POST" | "GET" | "PUT" | "DELETE" | "PATCH" | "HEAD" | "OPTIONS";
			data?: any;
			params?: any;
			headers?: {
				[key: string]: any;
			};
			timeout?: number;
			proxy?: boolean;
			[key: string]: any;
		}): Promise<any>;
		app: { complain: AppComplain; feedback: AppFeedback; goods: AppGoods; version: AppVersion };
		base: { comm: BaseComm };
		cs: { msg: CsMsg; session: CsSession };
		dict: { info: DictInfo };
		goods: {
			comment: GoodsComment;
			info: GoodsInfo;
			searchKeyword: GoodsSearchKeyword;
			spec: GoodsSpec;
			type: GoodsType;
		};
		info: { banner: InfoBanner };
		market: { coupon: { info: MarketCouponInfo; user: MarketCouponUser } };
		order: { info: OrderInfo; pay: OrderPay };
		shop: { info: ShopInfo };
		user: {
			address: UserAddress;
			comm: UserComm;
			info: UserInfo;
			login: UserLogin;
			vip: UserVip;
		};
		test: Test;
	};
}
