/*eslint-disable no-magic-numbers*/
import React from "react";
import { storiesOf } from "@storybook/react";
import { VictoryChart } from "../packages/victory-chart/src/index";
import { VictoryAxis } from "../packages/victory-axis/src/index";
import { VictoryBar } from "../packages/victory-bar/src/index";
import { VictoryGroup } from "../packages/victory-group/src/index";
import { VictoryScatter } from "../packages/victory-scatter/src/index";
import { VictoryLine } from "../packages/victory-line/src/index";
import { VictoryBoxPlot } from "../packages/victory-box-plot/src/index";
import { VictoryPolarAxis } from "../packages/victory-polar-axis/src/index";
import { VictoryStack } from "../packages/victory-stack/src/index";
import { VictoryTheme } from "../packages/victory-core/src/index";
import { getData, getFourQuadrantData, getArrayData } from "./data";

const dependentAxisTheme = {
  ...VictoryTheme.material,
  ...{ dependentAxis: { orientation: "right" } }
};

storiesOf("VictoryChart", module).add("default rendering", () => <VictoryChart />);

storiesOf("VictoryChart.theme", module)
  .add("material theme", () => <VictoryChart theme={VictoryTheme.material} />)
  .add("four quadrant material theme", () => (
    <VictoryChart theme={VictoryTheme.material} domain={[-1, 1]} />
  ))
  .add("grayscale theme", () => <VictoryChart theme={VictoryTheme.grayscale} />)
  .add("four quadrant grayscale theme", () => (
    <VictoryChart theme={VictoryTheme.grayscale} domain={[-1, 1]} />
  ));

storiesOf("VictoryChart.axes", module)
  .add("with a single axis", () => (
    <VictoryChart>
      <VictoryAxis />
    </VictoryChart>
  ))
  .add("with a single dependent axis", () => (
    <VictoryChart>
      <VictoryAxis dependentAxis />
    </VictoryChart>
  ))
  .add("with orientation set by a theme", () => (
    <VictoryChart theme={dependentAxisTheme}>
      <VictoryAxis dependentAxis />
    </VictoryChart>
  ))
  .add("Paddings with different orientations", () => (
    <VictoryChart padding={{ left: 20, right: 30, top: 15, bottom: 40 }}>
      <VictoryAxis tickValues={[1, 2, 3, 4, 5]} />
      <VictoryAxis orientation="left" dependentAxis tickValues={[1, 2, 3, 4, 5, 6, 7, 8]} />
      <VictoryAxis orientation="right" dependentAxis tickValues={[1, 2, 3, 4, 5, 6, 7, 8, 9]} />
      <VictoryBar
        style={{ data: { fill: "#c43a31" } }}
        data={[{ x: 1, y: 1 }, { x: 2, y: 7 }, { x: 3, y: 4 }, { x: 4, y: 5 }, { x: 5, y: 2 }]}
      />
    </VictoryChart>
  ));

storiesOf("VictoryChart.domainPadding", module)
  .add("single value domainPadding", () => (
    <VictoryChart domainPadding={25}>
      <VictoryBar data={getData(5)} />
    </VictoryChart>
  ))
  .add("single value domainPadding (horizontal)", () => (
    <VictoryChart domainPadding={25}>
      <VictoryBar horizontal data={getData(5)} />
    </VictoryChart>
  ))
  .add("object domainPadding", () => (
    <VictoryChart domainPadding={{ x: [25, 0], y: 25 }}>
      <VictoryBar data={getData(5)} />
    </VictoryChart>
  ))
  .add("object domainPadding (horizontal)", () => (
    <VictoryChart domainPadding={{ x: [25, 0], y: 25 }}>
      <VictoryBar horizontal data={getData(5)} />
    </VictoryChart>
  ));

storiesOf("VictoryChart.domain", module)
  .add("array domain", () => (
    <VictoryChart domain={[0, 10]}>
      <VictoryBar data={getData(5)} />
    </VictoryChart>
  ))
  .add("array domain (horizontal)", () => (
    <VictoryChart domain={[0, 10]}>
      <VictoryBar horizontal data={getData(5)} />
    </VictoryChart>
  ))
  .add("object domain", () => (
    <VictoryChart domain={{ x: [0, 6], y: [0, 10] }}>
      <VictoryBar data={getData(5)} />
    </VictoryChart>
  ))
  .add("object domain (horizontal)", () => (
    <VictoryChart domain={{ x: [0, 6], y: [0, 10] }}>
      <VictoryBar horizontal data={getData(5)} />
    </VictoryChart>
  ));

storiesOf("VictoryChart.calculated domain", module)
  .add("from data", () => (
    <VictoryChart>
      <VictoryScatter size={5} symbol="plus" data={getData(10)} />
      <VictoryScatter size={5} symbol="triangleUp" data={getFourQuadrantData(10)} />
      <VictoryLine samples={100} y={(d) => 10 * Math.sin(13 * Math.PI * d.x)} />
    </VictoryChart>
  ))
  .add("from data and axes", () => (
    <VictoryChart>
      <VictoryAxis tickValues={[-10, -5, 5, 10]} />
      <VictoryAxis dependentAxis tickValues={[-5, 5]} />
      <VictoryScatter data={getData(10)} />
      <VictoryLine samples={150} y={(d) => Math.sin(Math.PI * d.x)} />
    </VictoryChart>
  ))
  .add("from data and axes (horizontal)", () => (
    <VictoryChart horizontal>
      <VictoryAxis tickValues={[-10, -5, 5, 10]} />
      <VictoryAxis dependentAxis tickValues={[-5, 5]} />
      <VictoryScatter data={getData(10)} />
      <VictoryLine samples={150} y={(d) => Math.sin(Math.PI * d.x)} />
    </VictoryChart>
  ))
  .add("from categorical data sources", () => (
    <VictoryChart domainPadding={25}>
      <VictoryScatter
        size={6}
        symbol="star"
        data={[{ x: "cat", y: 2 }, { x: "dog", y: 3 }, { x: "bird", y: 1 }, { x: "frog", y: 4 }]}
      />
      <VictoryScatter
        size={6}
        symbol="square"
        data={[
          { x: "cat", y: 3 },
          { x: "mouse", y: 3 },
          { x: "bird", y: 5 },
          { x: "frog", y: 7 },
          { x: "dog", y: 1 }
        ]}
      />
    </VictoryChart>
  ))
  .add("from categorical data sources (horizontal)", () => (
    <VictoryChart horizontal domainPadding={25}>
      <VictoryScatter
        size={6}
        symbol="star"
        data={[{ x: "cat", y: 2 }, { x: "dog", y: 3 }, { x: "bird", y: 1 }, { x: "frog", y: 4 }]}
      />
      <VictoryScatter
        size={6}
        symbol="square"
        data={[
          { x: "cat", y: 3 },
          { x: "mouse", y: 3 },
          { x: "bird", y: 5 },
          { x: "frog", y: 7 },
          { x: "dog", y: 1 }
        ]}
      />
    </VictoryChart>
  ))
  .add("from atypical data sources", () => (
    <VictoryChart>
      <VictoryBoxPlot data={getArrayData(5)} />
      <VictoryLine samples={100} y={(d) => 5 + 3 * Math.sin(Math.PI * d.x)} />
    </VictoryChart>
  ))
  .add("from atypical data sources (horizontal)", () => (
    <VictoryChart horizontal>
      <VictoryBoxPlot data={getArrayData(5)} />
      <VictoryLine samples={100} y={(d) => 5 + 3 * Math.sin(Math.PI * d.x)} />
    </VictoryChart>
  ));

storiesOf("VictoryChart.style", module)
  .add("with parent styles", () => (
    <VictoryChart
      style={{
        parent: { border: "2px solid #000", margin: 20, backgroundColor: "cyan" }
      }}
    />
  ))
  .add("with background style", () => (
    <VictoryChart
      style={{
        background: { fill: "pink" }
      }}
    />
  ))
  .add("with background and parent styles on circle component", () => (
    <VictoryChart
      polar
      style={{
        background: { fill: "pink" },
        parent: { border: "2px solid #000", margin: 20, backgroundColor: "cyan" }
      }}
    >
      <VictoryPolarAxis />
    </VictoryChart>
  ))
  .add("with background and parent styles on rect component", () => (
    <VictoryChart
      domain={[-1, 1]}
      style={{
        background: { fill: "pink" },
        parent: { border: "2px solid #000", margin: 20, backgroundColor: "cyan" }
      }}
    />
  ))
  .add("with background on group", () => (
    <VictoryChart style={{ background: { fill: "pink" } }}>
      <VictoryGroup labels={["a", "b", "c"]} horizontal offset={20} colorScale={"qualitative"}>
        <VictoryBar data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]} />
        <VictoryBar data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]} />
        <VictoryBar data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]} />
      </VictoryGroup>
    </VictoryChart>
  ))
  .add("with background on stacked chart", () => (
    <VictoryChart style={{ background: { fill: "pink" } }}>
      <VictoryStack colorScale={"qualitative"}>
        <VictoryBar data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]} />
        <VictoryBar data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]} />
        <VictoryBar data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]} />
      </VictoryStack>
    </VictoryChart>
  ))
  .add("with background on horizontal chart", () => (
    <VictoryChart horizontal style={{ background: { fill: "pink" } }}>
      <VictoryStack colorScale={"qualitative"}>
        <VictoryBar data={[{ x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 5 }]} />
        <VictoryBar data={[{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 7 }]} />
        <VictoryBar data={[{ x: 1, y: 3 }, { x: 2, y: 4 }, { x: 3, y: 9 }]} />
      </VictoryStack>
    </VictoryChart>
  ));
