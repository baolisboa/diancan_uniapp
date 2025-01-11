<template>
	<cl-page>
		<view class="page">
			<cl-form :ref="setRefs('form')" v-model="form" label-position="top">
				<view class="card">
					<cl-form-item
						label="联系人"
						prop="contact"
						:rules="{
							required: true,
							message: '联系人不能为空',
						}"
					>
						<cl-input v-model="form.contact" placeholder="请填写联系人" />
					</cl-form-item>

					<cl-form-item
						label="手机号码"
						prop="phone"
						:rules="{
							required: true,
							message: '手机号码不能为空',
						}"
					>
						<cl-row type="flex">
							<view class="flex1">
								<cl-input
									v-model="form.phone"
									:maxlength="11"
									placeholder="请填写手机号码"
								/>
							</view>

							<!-- #ifdef MP-WEIXIN -->
							<cl-button
								type="primary"
								plain
								:margin="[0, 0, 0, 20]"
								open-type="getPhoneNumber"
								@getphonenumber="getPhone"
								>自动填写</cl-button
							>
							<!-- #endif -->
						</cl-row>
					</cl-form-item>

					<cl-form-item
						label="选择地址"
						prop="address"
						required
						:rules="{
							required: true,
							message: '地址不能为空',
						}"
					>
						<cl-select-inner
							:text="form.address"
							arrow-icon="cl-icon-arrow-right"
							@tap="chooseLocation"
						/>
					</cl-form-item>

					<cl-form-item
						label="门牌号"
						prop="detail"
						:rules="{
							required: true,
							message: '门牌号不能为空',
						}"
					>
						<cl-input
							v-model="form.detail"
							placeholder="例：5号楼201室"
							:maxlength="100"
						/>
					</cl-form-item>
				</view>

				<!-- <view class="card">
					<cl-row type="flex" justify="space-between" :padding="[10, 0, 10, 0]">
						<cl-row>
							<cl-text :size="28" block :margin="[0, 0, 6, 0]">设置默认地址</cl-text>
							<cl-text :size="22" color="info">提醒：下单会优先使用该地址</cl-text>
						</cl-row>

						<cl-switch v-model="form.isDefault" />
					</cl-row>
				</view> -->
			</cl-form>
		</view>

		<cl-footer>
			<cl-button custom type="primary" @tap="save">保存</cl-button>
		</cl-footer>
	</cl-page>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useCool, useWx } from "/@/cool";
import { onReady } from "@dcloudio/uni-app";
import { useUi } from "/$/cool-ui";

const { service, router, refs, setRefs } = useCool();
const ui = useUi();
const wx = useWx();

// 省市区
const pca = ref<string[]>([]);

// 表单
const form = ref<Eps.UserAddressEntity>({});

// 获取地址详情
async function refresh() {
	ui.showLoading();

	await service.user.address
		.info({
			id: router.query.id,
		})
		.then((res) => {
			form.value = res;
			pca.value = [res.province!, res.city!, res.district!];
		})
		.catch((err) => {
			ui.showToast(err.message);
		});

	ui.hideLoading();
}

// 选择地址
function chooseLocation() {
	uni.chooseLocation({
		success(res) {
			form.value.address = res.name;
			form.value.lng = res.longitude;
			form.value.lat = res.latitude;
		},
		fail(err) {
			console.error(err);
		},
	});
}

// 保存
function save() {
	refs.form.validate((valid: boolean) => {
		if (valid) {
			service.user.address[form.value.id ? "update" : "add"](form.value)
				.then(() => {
					ui.showTips("地址保存成功", () => {
						router.back();
					});
				})
				.catch((err) => {
					ui.showToast(err.message);
				});
		}
	});
}

// 获取手机号
function getPhone(e: any) {
	service.user.info
		.getMiniPhone({
			...e.detail,
			code: wx.code.value,
		})
		.then((res) => {
			form.value.phone = res;
		})
		.catch((err) => {
			ui.showTips(err.message);
			wx.getCode();
		});
}

onReady(() => {
	const { id } = router.query;

	if (id) {
		refresh();
	}

	uni.setNavigationBarTitle({
		title: id ? "编辑地址" : "添加地址",
	});
});
</script>

<style lang="scss" scoped>
.page {
	padding: 24rpx;
}
</style>
