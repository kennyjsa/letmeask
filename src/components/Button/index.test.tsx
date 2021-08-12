import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import userEvent from "@testing-library/user-event";

import { Button } from ".";

describe("Button Component", ()=>{
  test("Should render children prop when load", async () => {
    const content = "Clique aqui"
    
    render(
      <Button>{content}</Button>
    );

    expect(screen.getByText(content)).toBeInTheDocument();
  });
  

  test("Should execute click event", async () => {
    const onClick = jest.fn();
    
    render(
      <Button onClick={onClick}></Button>
    );
    const button = screen.getByRole("button");
    userEvent.click(button)

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  
  test("Should render className outlined when prop isOutlined is true", async () => {
    const content = "Clique aqui"
    
    render(
      <Button isOutlined>{content}</Button>
    );

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("outlined");
  });
})