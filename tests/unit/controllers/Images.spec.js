import { shallowMount } from '@vue/test-utils';
import VueFlux from '@/components/VueFlux';
import ImagesController from '@/controllers/Images';

describe('ImagesController', () => {
	let ctrl, vf;

	beforeEach(() => {
		vf = shallowMount(VueFlux, {
			propsData: {
				transitions: [
					'fade',
				],
			}
		}).vm;

		ctrl = new ImagesController(vf);
	});

	test('get previous image when current image is last', () => {
		ctrl.imgs = [{
			index: 0,
		}, {
			index: 1,
		}, {
			index: 2,
		}];

		ctrl.current = ctrl.imgs[2];

		expect(ctrl.prev).toBe(ctrl.imgs[1]);
	});

	test('get previous image when current image is first', () => {
		ctrl.imgs = [{
			index: 0,
		}, {
			index: 1,
		}, {
			index: 2,
		}];

		ctrl.current = ctrl.imgs[0];

		expect(ctrl.prev).toBe(ctrl.imgs[2]);
	});

	test('updates last when current updated', () => {
		ctrl.imgs = [{
			index: 0,
		}, {
			index: 1,
		}, {
			index: 2,
		}];

		ctrl.current = ctrl.imgs[0];
		ctrl.current = ctrl.imgs[1];

		expect(ctrl.last).toBe(ctrl.imgs[0]);
	});

	test('get next image when current image is first', () => {
		ctrl.imgs = [{
			index: 0,
		}, {
			index: 1,
		}, {
			index: 2,
		}];

		ctrl.current = ctrl.imgs[0];

		expect(ctrl.next).toBe(ctrl.imgs[1]);
	});

	test('get next image when current image is last', () => {
		ctrl.imgs = [{
			index: 0,
		}, {
			index: 1,
		}, {
			index: 2,
		}];

		ctrl.current = ctrl.imgs[2];

		expect(ctrl.next).toBe(ctrl.imgs[0]);
	});

	test('reset initializes images', () => {
		ctrl.srcs = ['src1', 'src2'];
		ctrl.imgs = ['img1', 'img2'];
		ctrl.loading = ['src1', 'src2'];
		ctrl.loaded.current = 2;
		ctrl.loaded.success = 2;
		ctrl.loaded.error = 2;
		ctrl.loaded.total = 2;
		ctrl.progress = 2;
		ctrl.toPreload = 2;
		ctrl.toLazyload = 2;
		ctrl.preloading = true;
		ctrl.lazyloading = true;
		ctrl.current = 'src1';

		ctrl.reset();

		expect(ctrl.srcs.length).toBe(0);
		expect(ctrl.imgs.length).toBe(0);
		expect(ctrl.loading.length).toBe(0);
		expect(ctrl.loaded.current).toBe(0);
		expect(ctrl.loaded.success).toBe(0);
		expect(ctrl.loaded.error).toBe(0);
		expect(ctrl.loaded.total).toBe(0);
		expect(ctrl.progress).toBe(0);
		expect(ctrl.toPreload).toBe(0);
		expect(ctrl.toLazyload).toBe(0);
		expect(ctrl.preloading).toBe(false);
		expect(ctrl.lazyloading).toBe(false);
		expect(ctrl.current).toBe(undefined);
	});

	test('hard reset also initializes last', () => {
		ctrl.last = 'src1';

		ctrl.reset(true);

		expect(ctrl.last).toBe(undefined);
	});

	test('update images resets controller', () => {
		ctrl.reset = jest.fn()

		ctrl.update([]);

		expect(ctrl.reset).toHaveBeenCalled();
	});

});
