/**
 * Animation #0, Veil
 * it will have two direction(u/d), which will be decided randomly
 * @param  {objct} Two
 * @param  {object} two instance of two
 * @param  {object} TWEEN the library for tweening
 * @param  {object} colors color pallete
 * @param  {array} animations It's the stack of animations
 * @param  {number} [opacity = 1]
 * @param  {number} [duration = 400]
 */
export default function veil(
  Two,
  two,
  TWEEN,
  colors,
  animations,
  opacity = 1,
  duration = 400,
  ) {
  const origin = { x: two.width * 0.5, y: two.height * 1.5 };
  const destIn = { y: two.height * 0.5 };
  const destOut = { y: two.height * -0.5 };

  /**
   * [setup description]
   * @return {[type]} [description]
   */
  function setup() {
    let playing = false;

    const shape = two.makeRectangle(
      origin.x,
      origin.y,
      two.width,
      two.height,
    );
    shape.opacity = 0;
    shape.noStroke();
    shape.fill = colors[1];

    const aniOut = new TWEEN.Tween(shape.translation)
      .to(destOut, duration)
      .easing(TWEEN.Easing.Exponential.In)
      .onComplete(() => {
        playing = false;
      });
    const aniIn = new TWEEN.Tween(shape.translation)
      .to(destIn, duration)
      .easing(TWEEN.Easing.Exponential.Out)
      .onComplete(() => {
        aniOut.start();
      });
    return {
      playing,
      shape,
      aniIn,
      aniOut,
    };
  }

  let { playing, shape, aniIn, aniOut } = setup();

  /**
   * [setDirection description]
   */
  function setDirection() {
    const direction = (Math.random() > 0.5);
    origin.x = two.width * 0.5;
    origin.y = two.height * (direction ? 1.5 : -0.5);
    destIn.y = two.height * 0.5;
    destOut.y = two.height * (direction ? -0.5 : 1.5);
  }

  // methods
  const resize = () => {
    setDirection();
    two.remove(shape);
    ({ playing, shape, aniIn, aniOut } = setup());
  };

  const reset = () => {
    playing = false;
    aniIn.stop();
    aniOut.stop();
    setDirection();
    shape.opacity = 0;
    shape.translation.set(
      origin.x,
      origin.y,
    );
  };

  const start = () => {
    console.log('play');
    reset();
    playing = true;
    shape.opacity = opacity;
    aniIn.start();
  };

  const EXPORT = {
    playing,
    start,
    reset,
    resize,
  };
  animations.push(EXPORT);
}
