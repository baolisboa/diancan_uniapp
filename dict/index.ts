export const OrderStatus = [
	{
		label: "待付款",
		desc: "等待用户付款",
		value: 0,
		color: "info",
	},
	{
		label: "制作中",
		desc: "等待商家制作中",
		value: 1,
		color: "#409EFF",
	},
	{
		label: "待取餐",
		desc: "等待用户取餐",
		value: 2,
		color: "success",
	},
	{
		label: "待评价",
		desc: "等待用户评价",
		value: 3,
		color: "success",
	},
	{
		label: "已完成",
		desc: "完成",
		value: 4,
		color: "success",
	},
	{
		label: "退款中",
		desc: "后台退款中",
		value: 5,
		color: "error",
	},
	{
		label: "已退款",
		desc: "订单已退款",
		value: 6,
		color: "warning",
	},
	{
		label: "已关闭",
		desc: "订单已关闭",
		value: 7,
		color: "info",
	},
];

export const PayType = [
	{
		label: "未支付",
		value: 0,
	},
	{
		label: "微信",
		value: 1,
		key: "wxpay",
		icon: "/static/icon/wxpay.png",
	},
	{
		label: "支付宝",
		value: 2,
		key: "alipay",
		icon: "/static/icon/alipay.png",
	},
];

export const OrderType = [
	{
		label: "自取",
		value: 0,
	},
	{
		label: "外卖",
		value: 1,
	},
];

export const RefundStatus = [
	{
		label: "申请中",
		value: 0,
		color: "warning",
	},
	{
		label: "已退款",
		value: 1,
		color: "success",
	},
	{
		label: "拒绝退款",
		value: 2,
		color: "error",
	},
];
