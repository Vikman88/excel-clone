import { $ } from '@core/dom.js';

export default function (event, resize) {
  const $target = $(event.target);
  const $parent = $target.closest('[data-type="resizable"]');
  const coords = $parent.getCoords();
  const idElement = $parent.data.col;
  const findedEl = this.$root.findAll(`[data-col="${idElement}"]`);

  const sideProp = resize === 'col' ? 'bottom' : 'right';

  $target.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  let value;

  document.onmousemove = (e) => {
    if (resize === 'col') {
      const delta = e.pageX - coords.right;
      value = coords.width + delta;
      $target.css({ right: -delta + 'px' });
    } else {
      const delta = e.pageY - coords.bottom;
      value = coords.height + delta;
      $target.css({ bottom: -delta + 'px' });
    }
  };

  document.onmouseup = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    if (resize === 'col') {
      $parent.css({ width: value + 'px' });
      findedEl.forEach((el) => $(el).css({ width: value + 'px' }));
    } else {
      $parent.css({ height: value + 'px' });
    }
    $target.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
