import { Label } from "../src/components/Label";

const style = {
  fontFamily: 'Arial',
  fontSize: 24,
  fill: 0x000000,
}

const bg = {
  colour: 0xffffff,
  borderWidth: 2,
  borderColour: 0x000000,
  padding: 10
}

const position = {
  x: 20,
  y: 20
}

test('label contains the right text', () => {
  const label = new Label(style, bg, position);
  expect(label.createText("Testing label").text).toBe("Testing label");
})