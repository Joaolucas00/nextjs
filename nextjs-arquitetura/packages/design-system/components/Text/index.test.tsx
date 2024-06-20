import { Text } from "./index";
import { customRender } from "@alura/test-commons/react-testing-library";

const render = customRender()

describe("<Text/>", () => {
  test("Deve renderizar um h1", () => {
    const { container } = render(<Text tag="h1">Sniper Monkey</Text>);
    expect(container).toMatchSnapshot();
  });
});
