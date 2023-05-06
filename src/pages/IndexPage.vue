<template>
	<q-page class="main-url-page">
		<MainHeader activePage="home" />
		<div class="main-url q-pa-lg">
			<div class="main-url-content">
				<div class="main-url-content__title">URL-shortener</div>
				<form class="main-url-form" @submit.prevent="submitAddLinkForm">
					<div class="main-url-form__input" :class="{ error: v$.link.$errors.length }">
						<input class="main-url-form__input_inp" type="text" placeholder="Enter link here"
							:class="{ 'input-error': v$.link.$errors.length > 0 }" v-model.trim="addLinkForm.link"
							@blur="v$.link.$touch()">
						<div class="input-errors" v-for="error of v$.link.$errors" :key="error.$uid">
							<div class="error-msg">
								{{
									error.$message === "Value is required" ?
									"Пожалуйста, введите ссылку" :
									error.$message === "The value is not a valid URL address" ?
										"Значение не является допустимым URL - адресом" : ""
								}}
							</div>
						</div>
					</div>
					<div class="main-url-form__btn">
						<button type="submit" :disabled="isButtonDisabled" @click.prevent="submitAddLinkForm">Shorten
							URL</button>
					</div>
				</form>
			</div>
		</div>
	</q-page>
</template>

<script lang="js">
import { defineComponent, ref } from 'vue'
import { useQuasar, copyToClipboard } from 'quasar'

import { required, url } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

import MainHeader from "../components/MainHeader.vue"

export default defineComponent({
	name: 'IndexPage',
	setup() {
		const $q = useQuasar()

		const notifyNeed = (needMessage, needType, needPosition, needTimeout) => {
			$q.notify({
				type: needType,
				message: needMessage,
				progress: true,
				position: needPosition,
				timeout: needTimeout
			})
		}

		const addLinkForm = ref({
			link: "",
		})
		const isButtonDisabled = ref(false)

		const rules = {
			link: {
				required,
				url,
			},
		}

		const v$ = useVuelidate(rules, addLinkForm)

		const copyLinkToClipboard = () => { // копирование ссылки в буфер
			copyToClipboard('some text')
				.then(() => {
					// success!
				})
				.catch(() => {
					// fail
				})
		}

		const submitAddLinkForm = async () => {
			v$.value.$touch()
			if (v$.value.$invalid) {
				notifyNeed("Не все поля заполнены", "warning", "top", 1000)
			} else {
				isButtonDisabled.value = true
				$q.loading.show()
				const formData = {
					link: addLinkForm.value.link
				}
				console.log("formData -->", formData)
				isButtonDisabled.value = false
				// $q.loading.hide()
			}
		}
		return {
			addLinkForm,
			v$,
			submitAddLinkForm,
			isButtonDisabled,
		}
	},
	components: {
		MainHeader
	}
})
</script>

<style lang="scss" scoped>
.main-url {
	width: 100%;
}

.main-url-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 50px;
}

.main-url-content__title {
	font-size: 46px;
	color: #2c96df;
}

.main-url-form {
	margin-top: 20px;
	padding: 0 5px;
	width: 510px;
}

.main-url-form__input_inp {
	width: 100%;
	height: 50px;
	background-color: #fff;
	color: #333333;
	font-size: 18px;
	padding: 12px 22px;
	border-radius: 3px;
	border: solid 1px #bcc2ce;
	outline: none;
	-webkit-box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.1);
	box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.1);
}

.main-url-form__input_inp:hover {
	background-color: #fff;
	border-color: #2c96df;
}

.input-error {
	border: 1px solid #ff0000;
}

.error-msg {
	color: #ff0000;
	font-size: 11px;
}

.main-url-form__btn {
	margin-top: 30px;
}

.main-url-form__btn>button {
	width: 100%;
	height: 50px;
	cursor: pointer;
	background-color: #2c96df;
	font-size: 20px;
	font-weight: 500;
	line-height: 28px;
	border-radius: 4px;
	border: none;
	color: #fff;
}

.main-url-form__btn>button:hover {
	background-color: #2c96dfc7;
}

@media (max-width: 1440px) {
	.main-url-content__title {
		font-size: 40px;
	}

	.main-url-form__input_inp {
		font-size: 16px;
	}

	.main-url-form__btn>button {
		font-size: 18px;
	}
}

@media (max-width: 1280px) {
	.main-url-content__title {
		font-size: 35px;
	}

	.main-url-form__input_inp {
		font-size: 15px;
	}

	.main-url-form__btn>button {
		font-size: 17px;
	}
}

@media (max-width: 1024px) {
	.main-url-content {
		margin-top: 30px;
	}

	.main-url-form {
		margin-top: 15px;
		width: 450px;
	}

	.main-url-content__title {
		font-size: 30px;
	}

	.main-url-form__input_inp {
		font-size: 14px;
	}

	.main-url-form__btn>button {
		font-size: 16px;
	}
}

@media (max-width: 768px) {
	.main-url-form {
		margin-top: 15px;
		width: 410px;
	}

	.main-url-content__title {
		font-size: 25px;
	}

	.main-url-form__input_inp {
		font-size: 14px;
	}

	.main-url-form__input_inp::placeholder {
		font-size: 15px;
	}

	.main-url-form__btn>button {
		font-size: 16px;
	}
}

@media (max-width: 568px) {
	.main-url-content {
		margin-top: 15px;
	}
}

@media (max-width: 428px) {
	.main-url-form {
		margin-top: 13px;
		width: 390px;
	}
}

@media (max-width: 390px) {
	.main-url-content__title {
		font-size: 22px;
	}

	.main-url-form {
		margin-top: 13px;
		width: 350px;
	}

	.main-url-form__btn {
		margin-top: 20px;
	}
}

@media (max-width: 360px) {
	.main-url-form {
		margin-top: 13px;
		width: 310px;
	}

	.main-url-form__input_inp {
		height: 45px;
		font-size: 13px;
	}

	.main-url-form__input_inp::placeholder {
		font-size: 13px;
	}

	.error-msg {
		font-size: 10px;
	}

	.main-url-form__btn>button {
		height: 45px;
		font-size: 14px;
	}
}

@media (max-width: 320px) {

	.main-url-content__title {
		font-size: 18px;
	}

	.main-url-form {
		width: 300px;
	}

	.main-url-form__input_inp {
		font-size: 12px;
	}

	.main-url-form__input_inp::placeholder {
		font-size: 12px;
	}

	.error-msg {
		font-size: 10px;
	}

	.main-url-form__btn>button {
		font-size: 13px;
	}
}
</style>
