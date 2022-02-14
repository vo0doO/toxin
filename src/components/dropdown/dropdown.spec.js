/* eslint-disable object-shorthand */
const { registerSuite } = intern.getPlugin('interface.object');
const { expect, should, assert } = intern.getPlugin('chai');
const $ = require('jquery');
const { sleep, domReady } = require('../../utils/js');

registerSuite('компонент/дропдаун', {
	beforeEach() {
		const dropdown = $('.dropdown__input');
		this.dd = dropdown;
		this.dd.br = this.dd.css('border-radius');
		this.dd.ae = this.dd.attr('aria-expanded');
		this.ab = this.dd.siblings('.dropdown__arrow-button');
		this.ab.c = this.ab.css('color');
		this.dl = this.dd.siblings('.dropdown__items');
		return this;
	},
	tests: {

		async 'Dropdown имеет ожидаемые классы: загруженный'() {
			const { dd } = await this.parent;
			await expect(dd.hasClass('dropdown__input_opened')).equal(false);
		},

		async 'Aria expanded имеет значение false: загруженный'() {
			const { dd } = await this.parent;
			await expect(dd.ae).equal('false');
		},

		async 'Border radius соответствует ожиданиям: загруженный'() {
			const { dd } = await this.parent;
			await expect(dd.br).equal('4px');
		},

		async 'Arrow button имеет ожидаемый цвет: загруженный'() {
			const { ab } = await this.parent;
			await expect(ab.c).equal('rgba(31, 32, 65, 0.5)');
		},

		async 'Border сolor имеет ожидаемый цвет: загруженный'() {
			const bc = $('.dropdown__input').css('border-color');
			await expect(bc).equal('rgba(31, 32, 65, 0.25)');
		},

		async 'Первый клик: Далее dropdown открыт'() {
			const { dd } = await this.parent;
			await dd.click();
			await sleep(1000);
		},

		async 'Dropdown имеет ожидаемые классы: открытый'() {
			const { dd } = await this.parent;
			await expect(dd.hasClass('dropdown__input_opened')).equal(true);
		},

		async 'Aria expanded имеет значение true: открытый'() {
			const { dd } = await this.parent;
			await expect(dd.ae).equal('true');
		},

		async 'Border radius соответствует ожиданиям: открытый'() {
			const { dd } = await this.parent;
			await expect(dd.br).equal('4px 4px 0px 0px');
		},

		async 'Arrow button имеет ожидаемый цвет: открытый'() {
			const { ab } = await this.parent;
			await expect(ab.c).equal('rgba(31, 32, 65, 0.75)');
		},

		async 'Border сolor имеет ожидаемый цвет: открытый'() {
			const bc = $('.dropdown__input.dropdown__input_opened').css('border-color');
			await expect(bc).equal('rgba(31, 32, 65, 0.5)');
		},

		async 'Второй клик: Dropdown далее закрыт'() {
			const { dd } = await this.parent;
			await dd.click();
			await sleep(1000);
		},

		async 'Dropdown имеет ожидаемые классы: закрытый'() {
			const { dd } = await this.parent;
			await expect(dd.hasClass('dropdown__input_opened')).equal(false);
		},

		async 'Aria expanded имеет значение false: закрытый'() {
			const { dd } = await this.parent;
			await expect(dd.ae).equal('false');
		},

		async 'Border radius соответствует ожиданиям: закрытый'() {
			const { dd } = await this.parent;
			await expect(dd.br).equal('4px');
		},

		async 'Arrow button имеет ожидаемый цвет: закрытый'() {
			const { ab } = await this.parent;
			await expect(ab.c).equal('rgba(31, 32, 65, 0.5)');
		},

		async 'Border сolor имеет ожидаемый цвет: закрытый'() {
			const bc = $('.dropdown__input').css('border-color');
			await expect(bc).equal('rgba(31, 32, 65, 0.25)');
		},
	}
});

domReady(
	intern.configure({ reporters: ['console'] }),
	intern.run()
);
