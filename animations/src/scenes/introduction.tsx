import {Img, Rect, makeScene2D} from '@motion-canvas/2d';
import {Reference, SignalValue, all, beginSlide, createRef, waitFor} from '@motion-canvas/core';

// asset imports
import telekomLogo from './assets/intro/telekomLogo.svg';
import tsystemsLogo from './assets/intro/tsystemsLogo.svg';

import windmills from './assets/intro/windmills.svg';
import tree1 from './assets/intro/tree1.svg';
import tree2 from './assets/intro/tree2.svg';

export default makeScene2D(function* (view) {
  // Create your animations here
  const background = createRef<Rect>();

  view.add(<Rect ref={background} />);
  background().fill('#000');
  background().width(view.width());
  background().height(view.height());

  const hiderForTSystems = createRef<Rect>();
  const tsystemsLogoRef = createRef<Img>();

  view.add(<Img ref={tsystemsLogoRef} src={tsystemsLogo} opacity={1} scale={1.1} x={75}/>);
  view.add(<Rect ref={hiderForTSystems} />);
  hiderForTSystems().fill('black');
  hiderForTSystems().width(600);
  hiderForTSystems().height(600);
  hiderForTSystems().rotation(-50);
  hiderForTSystems().shadowBlur(100);
  hiderForTSystems().shadowColor('black');
  
  const telekomLogoRef = createRef<Img>();
  view.add(<Img ref={telekomLogoRef} src={telekomLogo} opacity={0} scale={.6} y={-10}/>);

  yield* beginSlide('Show Telekom Logo');

  yield* all(
    telekomLogoRef().opacity(1, 1),
  );

  yield* beginSlide('show T Systems');

  yield* telekomLogoRef().x(-320, 1)

  yield* all(
    hiderForTSystems().x(780, 1),
  );

  hiderForTSystems().remove();

  yield* beginSlide('Show Topic');

  yield* all(
    telekomLogoRef().scale(.2, 1),
    telekomLogoRef().position({x: -850, y: -450}, 1),
    tsystemsLogoRef().scale(.4, 1),
    tsystemsLogoRef().position({x: -700, y: -445}, 1),
  );

  
  const windmillRefs = createRef<Img>();
  const backgroundTree1 = createRef<Img>();
  const backgroundTree2 = createRef<Img>();
  const forgroundTree1 = createRef<Img>();
  const forgroundTree2 = createRef<Img>();

  view.add(<Img ref={windmillRefs} src={windmills} opacity={1} scale={1} x={0} y={view.height()}/>);

  view.add(<Img ref={backgroundTree1} src={tree2} x={-800} y={1000}/>)
  view.add(<Img ref={backgroundTree2} src={tree2} x={800} y={1000}/>)

  view.add(<Img ref={forgroundTree1} src={tree1} x={-600} y={1000}/>)
  view.add(<Img ref={forgroundTree2} src={tree1} x={600} y={1000}/>)

  view.add(background)

  const makeShadow = (ref: Reference<Img>, strength: SignalValue<number>) => {
    ref().shadowBlur(strength);
    ref().shadowColor('black');
  }

  makeShadow(backgroundTree1, 50);
  makeShadow(backgroundTree2, 50);
  makeShadow(forgroundTree1, 50);
  makeShadow(forgroundTree2, 50);
  makeShadow(windmillRefs, 50);


  yield* all(
    backgroundTree1().y(165, 1),
    backgroundTree2().y(165, 1),
    forgroundTree1().y(305, 1.5),
    forgroundTree2().y(305, 1.5),
    background().fill('#002C04', 1.4),
  );
  
  yield* windmillRefs().y(130, 1);
    

  yield* all(
  );



  yield * beginSlide('End');
  
});
