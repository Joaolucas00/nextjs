import HomeScreen from "./HomeScreen";
import { customRender } from "@alura/test-commons/react-testing-library";

const render = customRender();

describe("HomeScreen", () => {
  test("Renderiza a página", () => {
    const { container } = render(<HomeScreen />);

    expect(container).toMatchSnapshot();
  });
});
