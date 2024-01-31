import { Img, Knot, Rect, Spline, Txt, makeScene2D } from "@motion-canvas/2d";
import {
  Reference,
  SignalValue,
  all,
  beginSlide,
  createRef,
  delay,
  waitFor,
} from "@motion-canvas/core";

// asset imports
import telekomLogo from "./assets/intro/telekomLogo.svg";
import tsystemsLogo from "./assets/intro/tsystemsLogo.svg";

import windmills from "./assets/intro/windmills.svg";
import tree1 from "./assets/intro/tree1.svg";
import tree2 from "./assets/intro/tree2.svg";

import CSR_image from "./assets/intro/CSR.svg";

import executiveBoardTogetherImage from "./assets/intro/ExecutiveBoard.png";
import superVisoryBoardLeftSideImage from "./assets/intro/SupervisoryBoardLeftSide.png";

import verdiLogo from "./assets/intro/verdiLogo.svg";

import greenHouseEmissionsImage from "./assets/intro/greenhouseEmissions.png";

import fieteProblemImage from "./assets/fiete/the_problem.png";
import fieteEcoShift from "./assets/fiete/eco_shift.png";
import fietePositiveEffects from "./assets/fiete/positive_effects.png";
import fieteTheIdea1 from "./assets/fiete/the_idea1.png";
import fieteTheIdea2 from "./assets/fiete/the_idea2.png";
import fieteTheIdea3 from "./assets/fiete/the_idea3.png";
import fieteTheIdea4 from "./assets/fiete/the_idea4.png";
import fieteRequirements from "./assets/fiete/requirements.svg";



export default makeScene2D(function* (view) {
  // Create your animations here
  const background = createRef<Rect>();

  view.add(<Rect ref={background} />);
  background().fill("#000");
  background().width(view.width());
  background().height(view.height());

  const hiderForTSystems = createRef<Rect>();
  const tsystemsLogoRef = createRef<Img>();

  view.add(
    <Img
      ref={tsystemsLogoRef}
      src={tsystemsLogo}
      opacity={1}
      scale={1.1}
      x={75}
    />
  );
  view.add(<Rect ref={hiderForTSystems} />);
  hiderForTSystems().fill("black");
  hiderForTSystems().width(600);
  hiderForTSystems().height(600);
  hiderForTSystems().rotation(-50);
  hiderForTSystems().shadowBlur(100);
  hiderForTSystems().shadowColor("black");

  const telekomLogoRef = createRef<Img>();
  view.add(
    <Img
      ref={telekomLogoRef}
      src={telekomLogo}
      opacity={0}
      scale={0.6}
      y={-10}
    />
  );

  yield* beginSlide("Show Telekom Logo");

  yield* all(telekomLogoRef().opacity(1, 1));

  yield* beginSlide("show T Systems");

  yield* telekomLogoRef().x(-320, 1);

  yield* all(hiderForTSystems().x(780, 1));

  hiderForTSystems().remove();


  const windmillRefs = createRef<Img>();
  const backgroundTree1 = createRef<Img>();
  const backgroundTree2 = createRef<Img>();
  const forgroundTree1 = createRef<Img>();
  const forgroundTree2 = createRef<Img>();
  const csrImage = createRef<Img>();

  view.add(
    <Img ref={csrImage} src={CSR_image} x={0} y={view.height()} width={600} />
  );

  view.add(
    <Img
      ref={windmillRefs}
      src={windmills}
      opacity={1}
      scale={1}
      x={0}
      y={view.height()}
    />
  );

  view.add(<Img ref={backgroundTree1} src={tree2} x={-800} y={1000} />);
  view.add(<Img ref={backgroundTree2} src={tree2} x={800} y={1000} />);

  view.add(<Img ref={forgroundTree1} src={tree1} x={-600} y={1000} />);
  view.add(<Img ref={forgroundTree2} src={tree1} x={600} y={1000} />);

  view.add(background);

  const makeShadow = (ref: Reference<Img>, strength: SignalValue<number>) => {
    ref().shadowBlur(strength);
    ref().shadowColor("black");
  };

  makeShadow(backgroundTree1, 50);
  makeShadow(backgroundTree2, 50);
  makeShadow(forgroundTree1, 50);
  makeShadow(forgroundTree2, 50);
  makeShadow(windmillRefs, 50);

  yield* beginSlide("Show Topic");

  yield* all(
    telekomLogoRef().scale(0.2, 1),
    telekomLogoRef().position({ x: -850, y: -450 }, 1),
    tsystemsLogoRef().scale(0.4, 1),
    tsystemsLogoRef().position({ x: -700, y: -445 }, 1)
  );


  yield* all(
    backgroundTree1().y(165, 1),
    backgroundTree2().y(165, 1),
    forgroundTree1().y(305, 1.5),
    forgroundTree2().y(305, 1.5),
    background().fill("#002C04", 1.5),
    delay(0.5, windmillRefs().y(130, 1))
  );

  makeShadow(csrImage, 50);
  yield* beginSlide("Show CSR Icon");

  yield* csrImage().y(0, 1);

  yield* beginSlide("Clean up Einleitung");

  yield* all(
    backgroundTree1().y(1000, 1),
    backgroundTree2().y(1000, 1),
    forgroundTree1().y(1000, 1),
    forgroundTree2().y(1000, 1),
    windmillRefs().y(view.height(), 1),
    csrImage().y(view.height(), 1),
    background().fill("#0A0A0A", 1)
  );

  backgroundTree1().remove();
  backgroundTree2().remove();
  forgroundTree1().remove();
  forgroundTree2().remove();
  windmillRefs().remove();
  csrImage().remove();

  yield* beginSlide("Show Executive Board");

  const heading = createRef<Txt>();
  const exceutiveBoardImages = createRef<Img>();

  view.add(
    <Txt
      ref={heading}
      text="Executive Board"
      x={0}
      y={-view.height() / 4 - 100}
      fontWeight={200}
      fontSize={80}
      fill={"#FF0090"}
      opacity={0}
      fontFamily={"TeleNeoWeb"}
    />
  );
  view.add(
    <Img
      ref={exceutiveBoardImages}
      src={executiveBoardTogetherImage}
      x={0}
      y={50}
      opacity={0}
      width={view.width() * 0.5}
      radius={5}
      smoothCorners={true}
    />
  );
  makeShadow(exceutiveBoardImages, 50);

  yield* all(
    heading().opacity(1, 1),
    delay(1, exceutiveBoardImages().opacity(1, 2))
  );

  yield* beginSlide("Cleanup Executive Board");

  yield* all(
    exceutiveBoardImages().opacity(0, 1),
    delay(1, heading().text("Supervisory Board", 1))
  );

  exceutiveBoardImages().remove();

  yield* beginSlide("Show Supervisory Board");

  const supervisoryBoardImage = createRef<Img>();
  view.add(
    <Img
      ref={supervisoryBoardImage}
      src={superVisoryBoardLeftSideImage}
      x={0}
      y={50}
      opacity={0}
      width={view.width() * 0.5}
      radius={20}
      smoothCorners={true}
    />
  );

  yield* all(supervisoryBoardImage().opacity(1, 1));


  const telekomLogoRef2 = createRef<Img>();
  view.add(
    <Img
      ref={telekomLogoRef2}
      src={telekomLogo}
      opacity={0}
      scale={0.4}
      y={-120}
      x={-500}
    />
  );

  yield* all(
    supervisoryBoardImage().x(-500, 1),
    supervisoryBoardImage().y(200, 1),
    supervisoryBoardImage().scale(0.6, 1),
    delay(0.7, telekomLogoRef2().opacity(1, 1))
  );

  const lineBetween = createRef<Spline>();

  view.add(
    <Spline
      ref={lineBetween}
      stroke={"white"}
      fill={"white"}
      closed
      lineWidth={5}
    >
      <Knot x={0} y={-250} />
      <Knot x={0} y={450} />
    </Spline>
  );
  lineBetween().start(0).end(0);

  yield* beginSlide("Show Verdi Icon");

  yield* all(
    lineBetween().start(0, 1),
    lineBetween().end(1, 1),
  );


  const verdiIcon = createRef<Img>();
  view.add(<Img ref={verdiIcon} src={verdiLogo}
    opacity={0}
    scale={1}
    y={-120}
    x={500} />)

  const tSystemsIcon = createRef<Img>();
  const telekomIcon = createRef<Img>();

  view.add(<Img ref={tSystemsIcon} src={tsystemsLogo}
    opacity={0}
    scale={1}
    y={220}
    x={550}
  />);
  view.add(<Img ref={telekomIcon} src={telekomLogo}
    opacity={0}
    scale={0.38}
    y={210}
    x={210} />);

  yield* all(
    verdiIcon().opacity(1, 1),
    tSystemsIcon().opacity(1, 1),
    telekomIcon().opacity(1, 1),
  )

  yield* beginSlide("Cleanup supervisory board");

  yield* all(
    supervisoryBoardImage().opacity(0, 1),
    telekomLogoRef2().opacity(0, 1),
    lineBetween().opacity(0, 1),
    verdiIcon().opacity(0, 1),
    tSystemsIcon().opacity(0, 1),
    telekomIcon().opacity(0, 1),
    heading().text("", 1),
  );

  supervisoryBoardImage().remove();
  telekomLogoRef2().remove();
  lineBetween().remove();
  verdiIcon().remove();
  tSystemsIcon().remove();
  telekomIcon().remove();

  yield* beginSlide("Show Greenhouse Emissions");

  const greenHouseEmissionsRef = createRef<Img>();

  view.add(<Img src={greenHouseEmissionsImage} width={1300} radius={50} ref={greenHouseEmissionsRef} scale={0} y={75} />);

  const highlightRect = createRef<Rect>();

  view.add(<Rect ref={highlightRect} fill={null} stroke={"red"} lineWidth={10} opacity={0} radius={10} width={260} height={550} y={85} x={-370} />);

  yield* greenHouseEmissionsRef().scale(1, 1);

  yield* beginSlide("Show Highlight Rect");

  yield* highlightRect().opacity(1, 1);

  yield* beginSlide("Move Box First Time");

  yield* all(
    highlightRect().x(0, 1),
    highlightRect().width(400, 1),
  );

  yield* beginSlide("Move Box Second Time");

  yield* all(
    highlightRect().x(350, 1),
    highlightRect().width(170, 1),
  );

  yield* beginSlide("Move Box Third Time");

  yield* all(
    highlightRect().x(465, 1),
    highlightRect().width(100, 1),
  );

  yield* beginSlide("Cleanup Greenhouse emissions");

  yield* all(
    highlightRect().opacity(0, 1),
    greenHouseEmissionsRef().opacity(0, 1),
  );
  greenHouseEmissionsRef().remove();
  highlightRect().remove();


  const theProblemImage = createRef<Img>();
  view.add(<Img ref={theProblemImage} src={fieteProblemImage} scale={0.5} y={-100} x={-1000} opacity={0} />);


  const imageTheProblem = createRef<Img>();
  view.add(<Img ref={imageTheProblem} src={fieteProblemImage} scale={0.6} y={100} opacity={0} radius={50} />);
  makeShadow(imageTheProblem, 50);
  yield* beginSlide("Fiete - The Problem");

  yield* heading().text("The Problem", 1);
  yield* all(
    imageTheProblem().opacity(1, 1),
    imageTheProblem().x(0, 1),
  );


  yield* beginSlide("Fiete - The Idea");
  yield* all(
    imageTheProblem().opacity(0, 1),
    heading().text("The Idea", 1),
  );

  const imageTheIdea1 = createRef<Img>();
  view.add(<Img ref={imageTheIdea1} src={fieteTheIdea1} scale={0.6} y={100} opacity={0} radius={50} />);
  makeShadow(imageTheIdea1, 50);

  yield* all(
    imageTheIdea1().opacity(1, 1),
    imageTheIdea1().x(0, 1),
  );


  const textTheIdea1 = createRef<Txt>();
  view.add(<Txt ref={textTheIdea1} text="Reduce Emissions" x={-500} y={-250} fontWeight={200} fontSize={60} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);
  yield* beginSlide("Fiete - The Idea 1 Show Text");

  yield* all(
    imageTheIdea1().scale(0.25, 1),
    imageTheIdea1().x(-500, 1),
    imageTheIdea1().y(-50, 1),
  );

  yield* textTheIdea1().opacity(1, 1);

  const imageTheIdea2 = createRef<Img>();
  view.add(<Img ref={imageTheIdea2} src={fieteTheIdea2} scale={0.6} y={100} opacity={0} radius={50} />);
  yield* beginSlide("Fiete - The Idea 2");
  makeShadow(imageTheIdea2, 50);

  yield* imageTheIdea2().opacity(1, 1);

  const textTheIdea2 = createRef<Txt>();
  view.add(<Txt ref={textTheIdea2} text="Create Employee Awareness" x={500} y={-250} fontWeight={200} fontSize={60} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);
  yield* beginSlide("Fiete - The Idea 2 Show Text");

  yield* all(
    imageTheIdea2().scale(0.24, 1),
    imageTheIdea2().x(500, 1),
    imageTheIdea2().y(-50, 1),
  );

  yield* textTheIdea2().opacity(1, 1);

  const imageTheIdea3 = createRef<Img>();
  view.add(<Img ref={imageTheIdea3} src={fieteTheIdea3} scale={0.7} y={100} opacity={0} radius={50} />);
  yield* beginSlide("Fiete - The Idea 3");
  makeShadow(imageTheIdea3, 50);

  yield* imageTheIdea3().opacity(1, 1);

  const textTheIdea3 = createRef<Txt>();
  view.add(<Txt ref={textTheIdea3} text="Reach Climate Goals" x={-500} y={160} fontWeight={200} fontSize={60} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);

  yield* beginSlide("Fiete - The Idea 3 Show Text");

  yield* all(
    imageTheIdea3().scale(0.25, 1),
    imageTheIdea3().x(-500, 1),
    imageTheIdea3().y(350, 1),
  );

  yield* textTheIdea3().opacity(1, 1);

  const imageTheIdea4 = createRef<Img>();
  view.add(<Img ref={imageTheIdea4} src={fieteTheIdea4} scale={0.6} y={100} opacity={0} radius={50} />);
  yield* beginSlide("Fiete - The Idea 4");
  makeShadow(imageTheIdea4, 50);

  yield* imageTheIdea4().opacity(1, 1);

  const textTheIdea4 = createRef<Txt>();
  view.add(<Txt ref={textTheIdea4} text="Develop a Mobile Platform" x={500} y={160} fontWeight={200} fontSize={60} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);

  yield* beginSlide("Fiete - The Idea 4 Show Text");

  yield* all(
    imageTheIdea4().scale(0.25, 1),
    imageTheIdea4().x(500, 1),
    imageTheIdea4().y(350, 1),
  );

  yield* textTheIdea4().opacity(1, 1);

  yield* beginSlide("Cleanup - fiete - The Idea");

  yield* all(
    imageTheIdea1().opacity(0, 1),
    imageTheIdea2().opacity(0, 1),
    imageTheIdea3().opacity(0, 1),
    imageTheIdea4().opacity(0, 1),
    textTheIdea1().opacity(0, 1),
    textTheIdea2().opacity(0, 1),
    textTheIdea3().opacity(0, 1),
    textTheIdea4().opacity(0, 1),
    heading().text("Requirements", 1),
  );


  imageTheIdea1().remove();
  imageTheIdea2().remove();
  imageTheIdea3().remove();
  imageTheIdea4().remove();
  textTheIdea1().remove();
  textTheIdea2().remove();
  textTheIdea3().remove();
  textTheIdea4().remove();

  const requirementsText1 = createRef<Txt>();
  const requirementsText2 = createRef<Txt>();
  const requirementsText3 = createRef<Txt>();
  view.add(<Txt ref={requirementsText1} text="Data Collection" x={-500} y={-50} fontWeight={200} fontSize={60} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);
  view.add(<Txt ref={requirementsText2} text="Overview" x={-500} y={100} fontWeight={200} fontSize={60} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);
  view.add(<Txt ref={requirementsText3} text="Evaluation" x={-500} y={250} fontWeight={200} fontSize={60} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);
  const requirementsKlammer = createRef<Txt>();
  view.add(<Txt ref={requirementsKlammer} text="}" x={-100} y={90} fontWeight={200} fontSize={600} fill={"white"} opacity={0} fontFamily={"TeleNeoWeb"} />);

  yield* beginSlide("Fiete - Requirements - Text 1");

  yield* requirementsText1().opacity(1, 1);
  
  yield* beginSlide("Fiete - Requirements - Text 2");

  yield* requirementsText2().opacity(1, 1);
  
  yield* beginSlide("Fiete - Requirements - Text 3");
  
  yield* requirementsText3().opacity(1, 1);
  

  const requirementsImage = createRef<Img>();
  view.add(<Img ref={requirementsImage} src={fieteRequirements} scale={1} y={100} x={300} opacity={0} radius={50} />);
  makeShadow(requirementsImage, 50);
  yield* beginSlide("Fiete - Requirements - Klammer");

  yield* all(
    requirementsKlammer().opacity(1, 1),
    requirementsImage().opacity(1, 1),
  );

  yield* beginSlide("Cleanup - fiete - Requirements");

  yield* all(
    requirementsText1().opacity(0, 1),
    requirementsText2().opacity(0, 1),
    requirementsText3().opacity(0, 1),
    requirementsKlammer().opacity(0, 1),
    requirementsImage().opacity(0, 1),
    heading().text("", 1),
  );

  yield* beginSlide("End");
});
